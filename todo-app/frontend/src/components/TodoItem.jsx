import { useState } from 'react';

/**
 * TodoItem — renders a single todo row.
 * Supports:
 *   • checkbox to toggle completed
 *   • inline edit (click ✏️)
 *   • delete (click 🗑)
 */
export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const [editing, setEditing]         = useState(false);
  const [title, setTitle]             = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');
  const [saving, setSaving]           = useState(false);

  const handleSave = async () => {
    if (!title.trim()) return;
    setSaving(true);
    const success = await onEdit(todo.id, {
      title: title.trim(),
      description: description.trim(),
    });
    setSaving(false);
    if (success) setEditing(false);
  };

  const handleCancel = () => {
    setTitle(todo.title);
    setDescription(todo.description || '');
    setEditing(false);
  };

  const formattedDate = todo.createdAt
    ? new Date(todo.createdAt).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
      })
    : '';

  return (
    <div style={{ ...styles.card, opacity: todo.completed ? 0.7 : 1 }}>
      {/* Left: checkbox */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo)}
        style={styles.checkbox}
        title={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      />

      {/* Center: content */}
      <div style={styles.content}>
        {editing ? (
          <>
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.editInput}
              placeholder="Title"
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ ...styles.editInput, fontSize: 13, marginTop: 4 }}
              placeholder="Description"
            />
          </>
        ) : (
          <>
            <span
              style={{
                ...styles.title,
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#999' : '#1a1a1a',
              }}
            >
              {todo.title}
            </span>
            {todo.description && (
              <span style={styles.desc}>{todo.description}</span>
            )}
            <span style={styles.date}>Created: {formattedDate}</span>
          </>
        )}
      </div>

      {/* Right: action buttons */}
      <div style={styles.actions}>
        {editing ? (
          <>
            <button
              onClick={handleSave}
              disabled={saving}
              style={{ ...styles.actionBtn, background: '#16a34a', color: '#fff' }}
            >
              {saving ? '…' : '✓'}
            </button>
            <button onClick={handleCancel} style={{ ...styles.actionBtn, background: '#e5e7eb' }}>
              ✕
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              style={{ ...styles.actionBtn, background: '#f3f4f6' }}
              title="Edit"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              style={{ ...styles.actionBtn, background: '#fee2e2' }}
              title="Delete"
            >
              🗑
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    background: '#fff',
    padding: '14px 16px',
    borderRadius: 8,
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    marginBottom: 10,
    transition: 'opacity 0.2s',
  },
  checkbox: { width: 18, height: 18, cursor: 'pointer', marginTop: 3, flexShrink: 0 },
  content: { flex: 1, display: 'flex', flexDirection: 'column', gap: 2 },
  title: { fontSize: 16, fontWeight: 500 },
  desc: { fontSize: 13, color: '#6b7280' },
  date: { fontSize: 11, color: '#9ca3af', marginTop: 2 },
  editInput: {
    padding: '6px 8px',
    border: '1px solid #d1d5db',
    borderRadius: 4,
    fontSize: 15,
    width: '100%',
  },
  actions: { display: 'flex', gap: 6, flexShrink: 0 },
  actionBtn: {
    border: 'none',
    borderRadius: 6,
    padding: '6px 10px',
    cursor: 'pointer',
    fontSize: 14,
    lineHeight: 1,
  },
};
