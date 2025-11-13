const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export const getToken = () => localStorage.getItem('token');
export const setToken = (t) => localStorage.setItem('token', t);
export const clearToken = () => localStorage.removeItem('token');

async function request(path, options = {}) {
  const headers = options.headers || {};
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Request failed');
  }
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) return res.json();
  return res.text();
}

export const api = {
  signup: (data) => request('/auth/signup', { method: 'POST', body: JSON.stringify(data) }),
  login: async (email, password) => {
    const body = new URLSearchParams();
    body.append('username', email);
    body.append('password', password);
    return request('/auth/login', { method: 'POST', headers: { }, body });
  },
  me: () => request('/me'),
  updateMe: (data) => request('/me', { method: 'PUT', body: JSON.stringify(data) }),
  createProject: (data) => request('/projects', { method: 'POST', body: JSON.stringify(data) }),
  myProjects: () => request('/projects'),
  uploadFile: (projectId, file) => {
    const fd = new FormData();
    fd.append('file', file);
    return request(`/projects/${projectId}/files`, { method: 'POST', body: fd });
  },
  sendMessage: (projectId, content) => request(`/projects/${projectId}/messages`, { method: 'POST', body: JSON.stringify({ project_id: projectId, content }) }),
  getMessages: (projectId) => request(`/projects/${projectId}/messages`),
  adminList: (filters={}) => {
    const params = new URLSearchParams(filters).toString();
    return request(`/admin/projects${params ? `?${params}`:''}`);
  },
  adminUpdateStatus: (projectId, data) => request(`/admin/projects/${projectId}/status`, { method: 'PUT', body: JSON.stringify(data) }),
};
