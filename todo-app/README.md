# 📝 Todo App — Spring Boot + React

A full-stack Todo application built for a screening exercise.

---

## Project Structure

```
todo-app/
├── backend/                  ← Spring Boot (Maven)
│   └── src/main/java/com/example/todo/
│       ├── controller/       TodoController.java
│       ├── service/          TodoService.java
│       ├── repository/       TodoRepository.java
│       ├── model/            Todo.java
│       ├── dto/              CreateTodoRequest / UpdateTodoRequest / TodoResponse
│       ├── exception/        GlobalExceptionHandler / TodoNotFoundException
│       └── config/           CorsConfig.java
│
└── frontend/                 ← React (CRA)
    └── src/
        ├── components/       AddTodoForm / TodoList / TodoItem / TodoFilter
        ├── hooks/            useTodos.js
        └── services/         todoService.js
```

---

## Prerequisites

| Tool | Version |
|------|---------|
| Java | 17+ |
| Maven | 3.8+ |
| Node.js | 18+ |
| npm | 9+ |

---

## Running the Backend

```bash
cd todo-app/backend
./mvnw spring-boot:run
```

> **Windows:** use `mvnw.cmd spring-boot:run`

The API starts on **http://localhost:8080**.

H2 Console is available at **http://localhost:8080/h2-console**  
(JDBC URL: `jdbc:h2:mem:tododb`, Username: `sa`, Password: *(empty)*)

---

## Running the Frontend

```bash
cd todo-app/frontend
npm install
npm start
```

The UI opens at **http://localhost:3000**.

---

## REST API Reference

### Base URL: `http://localhost:8080/api/todos`

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/` | Create a todo |
| `GET` | `/` | Get all todos |
| `GET` | `/?completed=true` | Filter by status |
| `GET` | `/{id}` | Get single todo |
| `PUT` | `/{id}` | Update a todo |
| `DELETE` | `/{id}` | Delete a todo |

### Example Requests

**Create a Todo**
```bash
curl -X POST http://localhost:8080/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "description": "Milk, eggs, bread"}'
```

**Get All Todos**
```bash
curl http://localhost:8080/api/todos
```

**Filter Completed**
```bash
curl "http://localhost:8080/api/todos?completed=false"
```

**Update a Todo**
```bash
curl -X PUT http://localhost:8080/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated title", "completed": true}'
```

**Delete a Todo**
```bash
curl -X DELETE http://localhost:8080/api/todos/1
```

### Response Shape

```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "createdAt": "2025-01-15T10:30:00"
}
```

### Validation Error Shape (400)

```json
{
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "title": "Title is mandatory"
  },
  "timestamp": "2025-01-15T10:30:00"
}
```

---

## Frontend Features

| Feature | Implementation |
|---------|---------------|
| View todos | `TodoList` + `TodoItem` |
| Add todo | `AddTodoForm` with validation |
| Toggle complete | Checkbox in `TodoItem` |
| Inline edit | Click ✏️ → edit in place → ✓ / ✕ |
| Delete | 🗑 button with immediate removal |
| Filter | All / Active / Completed buttons |

---

## Running Tests

```bash
# Backend unit tests
cd backend
./mvnw test
```

---

## Tech Stack

**Backend**
- Spring Boot 3.2
- Spring Data JPA
- H2 in-memory database
- Lombok
- Bean Validation (jakarta.validation)

**Frontend**
- React 18
- Axios
- Functional components + hooks (useState, useEffect, useCallback)
- Inline styles (no external CSS framework needed)
