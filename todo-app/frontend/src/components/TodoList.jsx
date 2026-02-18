import TodoItem from './TodoItem';

/**
 * TodoList — renders the list of todos or an empty state message.
 */
export default function TodoList({ todos, onToggle, onEdit, onDelete, loading }) {
  if (loading) {
    return <p style={styles.center}>Loading todos…</p>;
  }

  if (todos.length === 0) {
    return (
      <div style={styles.empty}>
        <p style={{ fontSize: 32 }}>✅</p>
        <p style={{ color: '#6b7280' }}>No todos here. Add one above!</p>
      </div>
    );
  }

  return (
    <ul style={styles.list}>
      {todos.map((todo) => (
        <li key={todo.id} style={{ listStyle: 'none' }}>
          <TodoItem
            todo={todo}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  );
}

const styles = {
  list: { margin: 0, padding: 0 },
  center: { textAlign: 'center', color: '#9ca3af', margin: '32px 0' },
  empty: { textAlign: 'center', padding: '40px 0', color: '#374151' },
};
