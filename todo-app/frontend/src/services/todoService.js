import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/todos';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Interceptors for global error handling ────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.errors ||
      'Something went wrong';
    return Promise.reject(new Error(typeof message === 'object' ? JSON.stringify(message) : message));
  }
);

// ── Todo API calls ─────────────────────────────────────────────────────────────

/** GET /api/todos or /api/todos?completed=true|false */
export const fetchTodos = async (completed = null) => {
  const params = completed !== null ? { completed } : {};
  const res = await api.get('', { params });
  return res.data;
};

/** POST /api/todos */
export const createTodo = async (data) => {
  const res = await api.post('', data);
  return res.data;
};

/** PUT /api/todos/:id */
export const updateTodo = async (id, data) => {
  const res = await api.put(`/${id}`, data);
  return res.data;
};

/** DELETE /api/todos/:id */
export const deleteTodo = async (id) => {
  await api.delete(`/${id}`);
};
