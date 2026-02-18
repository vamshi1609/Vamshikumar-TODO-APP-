package com.example.todo.service;

import com.example.todo.dto.CreateTodoRequest;
import com.example.todo.dto.TodoResponse;
import com.example.todo.dto.UpdateTodoRequest;
import com.example.todo.exception.TodoNotFoundException;
import com.example.todo.model.Todo;
import com.example.todo.repository.TodoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TodoService {

    private static final Logger log = LoggerFactory.getLogger(TodoService.class);

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public TodoResponse createTodo(CreateTodoRequest request) {
        log.debug("Creating todo with title: {}", request.getTitle());

        Todo todo = Todo.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .completed(false)
                .build();

        Todo saved = todoRepository.save(todo);
        log.debug("Created todo with id: {}", saved.getId());
        return TodoResponse.fromEntity(saved);
    }

    @Transactional(readOnly = true)
    public List<TodoResponse> getAllTodos(Boolean completed) {
        log.debug("Fetching todos, filter by completed: {}", completed);

        List<Todo> todos;
        if (completed != null) {
            todos = todoRepository.findByCompleted(completed);
        } else {
            todos = todoRepository.findAll();
        }

        return todos.stream()
                .map(TodoResponse::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public TodoResponse getTodoById(Long id) {
        log.debug("Fetching todo with id: {}", id);
        Todo todo = findTodoOrThrow(id);
        return TodoResponse.fromEntity(todo);
    }

    public TodoResponse updateTodo(Long id, UpdateTodoRequest request) {
        log.debug("Updating todo with id: {}", id);

        Todo todo = findTodoOrThrow(id);

        if (request.getTitle() != null && !request.getTitle().isBlank()) {
            todo.setTitle(request.getTitle());
        }
        if (request.getDescription() != null) {
            todo.setDescription(request.getDescription());
        }
        if (request.getCompleted() != null) {
            todo.setCompleted(request.getCompleted());
        }

        Todo updated = todoRepository.save(todo);
        log.debug("Updated todo with id: {}", updated.getId());
        return TodoResponse.fromEntity(updated);
    }

    public void deleteTodo(Long id) {
        log.debug("Deleting todo with id: {}", id);
        Todo todo = findTodoOrThrow(id);
        todoRepository.delete(todo);
        log.debug("Deleted todo with id: {}", id);
    }

    private Todo findTodoOrThrow(Long id) {
        return todoRepository.findById(id)
                .orElseThrow(() -> new TodoNotFoundException(id));
    }
}
