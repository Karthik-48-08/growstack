import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Single shared axios instance. Reads token from localStorage on every request,
// so refreshing the page keeps you signed in.

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('gs_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global error normaliser — surface backend message when available
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;
    const message =
      err.response?.data?.message ||
      err.response?.data?.error ||
      err.message ||
      'Network error';

    // Auto-logout on 401 so the user lands on the login page
    if (status === 401) {
      const hadToken = !!localStorage.getItem('gs_token');
      localStorage.removeItem('gs_token');
      localStorage.removeItem('gs_user');
      // Avoid redirect-loop on the login page itself
      if (hadToken && !window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(new Error(message));
  }
);

// ─── Auth ──────────────────────────────────────────────────────────────────
export const authApi = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (payload) => api.post('/auth/register', payload),
  me: () => api.get('/auth/profile'),
};

// ─── Programs & Lessons ────────────────────────────────────────────────────
export const programApi = {
  list: () => api.get('/programs'),
  get: (id) => api.get(`/programs/${id}`),
  course: (id) => api.get(`/programs/${id}/course`),
  enrollment: (programId) => api.get(`/programs/${programId}/enrollment`),
  myEnrollments: () => api.get('/programs/my-enrollments'),
  day: (dayId) => api.get(`/programs/day/${dayId}`),
  dayByNumber: (courseId, dayNumber) =>
    api.get(`/programs/course/${courseId}/days/${dayNumber}`),
};

// ─── Progress ──────────────────────────────────────────────────────────────
export const progressApi = {
  completeLesson: (dayModuleId) =>
    api.post('/progress/lesson-complete', { dayModuleId }),
  submitQuiz: (dayModuleId, answers) =>
    api.post('/progress/quiz-submit', { dayModuleId, answers }),
  submitAssessment: (dayModuleId, responses) =>
    api.post('/progress/assessment-submit', { dayModuleId, responses }),
  get: (programId) => api.get(`/progress/${programId}`),
};

// ─── Submissions ───────────────────────────────────────────────────────────
export const submissionApi = {
  submitAssignment: (payload) => api.post('/submissions/assignment', payload),
  my: () => api.get('/submissions/my'),
};

// ─── Applications ─────────────────────────────────────────────────────────
export const applicationApi = {
  submit: (payload) => api.post('/applications', payload),
};

export default api;