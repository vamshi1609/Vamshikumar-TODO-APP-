import { useState } from 'react';

/**
 * AddTodoForm — controlled form to create a new todo.
 * Calls onAdd(title, description) and resets on success.
 */
export default function AddTodoForm({ onAdd }) {
  const [title, setTitle]             = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting]   = useState(false);
  const [localError, setLocalError]   = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setLocalError('Title is required');
      return;
    }
    setLocalError('');
    setSubmitting(true);
    const success = await onAdd({ title: title.trim(), description: description.trim() });
    setSubmitting(false);
    if (success) {
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>Add New Todo</h2>

      {localError && <p style={styles.error}>{localError}</p>}

      <input
        type="text"
        placeholder="Title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={styles.input}
        disabled={submitting}
      />

      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={styles.input}
        disabled={submitting}
      />

      <button type="submit" disabled={submitting} style={styles.btn}>
        {submitting ? 'Adding…' : '+ Add Todo'}
      </button>
    </form>
  );
}

const styles = {
  form: {
    background: '#fff',
    padding: '20px 24px',
    borderRadius: 10,
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    marginBottom: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  heading: { margin: '0 0 6px', fontSize: 18, color: '#333' },
  input: {
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: 6,
    fontSize: 15,
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  btn: {
    padding: '10px 16px',
    background: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    fontSize: 15,
    cursor: 'pointer',
    fontWeight: 600,
    alignSelf: 'flex-start',
  },
  error: { color: '#dc2626', margin: 0, fontSize: 14 },
};
