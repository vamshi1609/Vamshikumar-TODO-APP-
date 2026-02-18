import { useTodos } from './hooks/useTodos';
import AddTodoForm from './components/AddTodoForm';
import TodoFilter from './components/TodoFilter';
import TodoList from './components/TodoList';

export default function App() {
  const {
    todos,
    loading,
    error,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    editTodo,
    removeTodo,
  } = useTodos();

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* ── Header ──────────────────────────────────────── */}
        <header style={styles.header}>
          <h1 style={styles.title}>📝 Todo App</h1>
          <p style={styles.subtitle}>Spring Boot + React</p>
        </header>

        {/* ── Global Error Banner ─────────────────────────── */}
        {error && (
          <div style={styles.errorBanner}>
            ⚠️ {error}
          </div>
        )}

        {/* ── Add Form ────────────────────────────────────── */}
        <AddTodoForm onAdd={addTodo} />

        {/* ── Filter Bar ──────────────────────────────────── */}
        <TodoFilter
          filter={filter}
          onFilterChange={setFilter}
          total={todos.length}
          completed={completedCount}
        />

        {/* ── Todo List ───────────────────────────────────── */}
        <TodoList
          todos={todos}
          loading={loading}
          onToggle={toggleTodo}
          onEdit={editTodo}
          onDelete={removeTodo}
        />
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f1f5f9',
    padding: '32px 16px',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  container: {
    maxWidth: 660,
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: 28,
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    color: '#1e1b4b',
    margin: 0,
  },
  subtitle: {
    color: '#6b7280',
    margin: '4px 0 0',
    fontSize: 14,
  },
  errorBanner: {
    background: '#fef2f2',
    border: '1px solid #fecaca',
    color: '#dc2626',
    padding: '10px 14px',
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 14,
  },
};
