import { useState, useEffect, useCallback } from 'react';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../services/todoService';

/**
 * useTodos — centralizes all todo state & API interactions.
 * Components only need to call the returned handlers.
 */
export function useTodos() {
  const [todos, setTodos]           = useState([]);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState(null);
  const [filter, setFilter]         = useState(null); // null | true | false

  // ── Load todos ─────────────────────────────────────────────────────────────
  const loadTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTodos(filter);
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  // ── Add todo ───────────────────────────────────────────────────────────────
  const addTodo = async ({ title, description }) => {
    setError(null);
    try {
      const newTodo = await createTodo({ title, description });
      setTodos((prev) => [newTodo, ...prev]);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // ── Toggle completed ───────────────────────────────────────────────────────
  const toggleTodo = async (todo) => {
    setError(null);
    try {
      const updated = await updateTodo(todo.id, { completed: !todo.completed });
      setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  // ── Edit todo ──────────────────────────────────────────────────────────────
  const editTodo = async (id, data) => {
    setError(null);
    try {
      const updated = await updateTodo(id, data);
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  // ── Remove todo ────────────────────────────────────────────────────────────
  const removeTodo = async (id) => {
    setError(null);
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    todos,
    loading,
    error,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    editTodo,
    removeTodo,
    refresh: loadTodos,
  };
}
