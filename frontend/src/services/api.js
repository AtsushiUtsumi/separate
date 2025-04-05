import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 部品管理API
export const getParts = () => api.get('/parts');
export const getPart = (id) => api.get(`/parts/${id}`);
export const createPart = (data) => api.post('/parts', data);
export const updatePart = (id, data) => api.post(`/parts/${id}/update`, data);
export const deletePart = (id) => api.post(`/parts/${id}/delete`);

// 在庫管理API
export const getInventory = () => api.get('/inventory');
export const getInventoryItem = (id) => api.get(`/inventory/${id}`);
export const updateInventory = (data) => api.post('/inventory', data);
export const deleteInventoryItem = (id) => api.post(`/inventory/${id}/delete`);

export default api; 