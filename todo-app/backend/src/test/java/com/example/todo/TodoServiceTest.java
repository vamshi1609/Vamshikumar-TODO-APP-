package com.example.todo;

import com.example.todo.dto.CreateTodoRequest;
import com.example.todo.dto.TodoResponse;
import com.example.todo.dto.UpdateTodoRequest;
import com.example.todo.exception.TodoNotFoundException;
import com.example.todo.model.Todo;
import com.example.todo.repository.TodoRepository;
import com.example.todo.service.TodoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TodoServiceTest {

    @Mock
    private TodoRepository todoRepository;

    @InjectMocks
    private TodoService todoService;

    private Todo sampleTodo;

    @BeforeEach
    void setUp() {
        sampleTodo = Todo.builder()
                .id(1L)
                .title("Test Todo")
                .description("Test description")
                .completed(false)
                .build();
    }

    @Test
    void createTodo_shouldReturnCreatedTodo() {
        CreateTodoRequest request = new CreateTodoRequest();
        request.setTitle("Test Todo");
        request.setDescription("Test description");

        when(todoRepository.save(any(Todo.class))).thenReturn(sampleTodo);

        TodoResponse response = todoService.createTodo(request);

        assertThat(response).isNotNull();
        assertThat(response.getTitle()).isEqualTo("Test Todo");
        assertThat(response.isCompleted()).isFalse();
        verify(todoRepository, times(1)).save(any(Todo.class));
    }

    @Test
    void getAllTodos_withNoFilter_shouldReturnAll() {
        when(todoRepository.findAll()).thenReturn(List.of(sampleTodo));

        List<TodoResponse> todos = todoService.getAllTodos(null);

        assertThat(todos).hasSize(1);
        verify(todoRepository).findAll();
        verify(todoRepository, never()).findByCompleted(anyBoolean());
    }

    @Test
    void getAllTodos_withCompletedFilter_shouldFilterResults() {
        when(todoRepository.findByCompleted(false)).thenReturn(List.of(sampleTodo));

        List<TodoResponse> todos = todoService.getAllTodos(false);

        assertThat(todos).hasSize(1);
        verify(todoRepository).findByCompleted(false);
    }

    @Test
    void getTodoById_whenExists_shouldReturnTodo() {
        when(todoRepository.findById(1L)).thenReturn(Optional.of(sampleTodo));

        TodoResponse response = todoService.getTodoById(1L);

        assertThat(response.getId()).isEqualTo(1L);
    }

    @Test
    void getTodoById_whenNotFound_shouldThrow() {
        when(todoRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> todoService.getTodoById(99L))
                .isInstanceOf(TodoNotFoundException.class)
                .hasMessageContaining("99");
    }

    @Test
    void updateTodo_shouldUpdateFields() {
        UpdateTodoRequest request = new UpdateTodoRequest();
        request.setTitle("Updated Title");
        request.setCompleted(true);

        Todo updatedTodo = Todo.builder()
                .id(1L)
                .title("Updated Title")
                .completed(true)
                .build();

        when(todoRepository.findById(1L)).thenReturn(Optional.of(sampleTodo));
        when(todoRepository.save(any(Todo.class))).thenReturn(updatedTodo);

        TodoResponse response = todoService.updateTodo(1L, request);

        assertThat(response.getTitle()).isEqualTo("Updated Title");
        assertThat(response.isCompleted()).isTrue();
    }

    @Test
    void deleteTodo_whenExists_shouldDelete() {
        when(todoRepository.findById(1L)).thenReturn(Optional.of(sampleTodo));

        todoService.deleteTodo(1L);

        verify(todoRepository).delete(sampleTodo);
    }

    @Test
    void deleteTodo_whenNotFound_shouldThrow() {
        when(todoRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> todoService.deleteTodo(99L))
                .isInstanceOf(TodoNotFoundException.class);
    }
}
