const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return handleResponse(response);
  },

  post: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  put: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  delete: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return handleResponse(response);
  }
};

const handleResponse = async (response) => {
  try {
    const data = await response.json();
    
    if (!response.ok) {
      // Log detailed error information
      console.error('API Error:', {
        status: response.status,
        statusText: response.statusText,
        data
      });
      
      throw new Error(data.message || data.error || 'Server error');
    }
    
    return data;
  } catch (error) {
    console.error('Request failed:', error);
    throw new Error('Server error. Please try again later.');
  }
};

// Add connection test
export const testConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error('Connection test failed:', error);
    return false;
  }
};
