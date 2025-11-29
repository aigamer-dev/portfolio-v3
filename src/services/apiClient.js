// API configuration
// Use REACT_APP_API_URL when set (production). If not set, use relative paths
// so the CRA dev server proxy can forward requests and avoid CORS in development.
const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_URL || '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Api-Key ${process.env.REACT_APP_API_KEY || 'aigamer_live_Wrf51gvqSy8ImeC2i9PGWJFDjFFqmGXNHNmrn5uwLS0'}`
  }
};

// HTTP client utility
class APIClient {
  constructor(config = {}) {
    this.baseURL = config.baseURL || API_CONFIG.baseURL;
    this.timeout = config.timeout || API_CONFIG.timeout;
    this.headers = { ...API_CONFIG.headers, ...config.headers };
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      timeout: this.timeout,
      headers: this.headers,
      credentials: 'include', // Include cookies for session-based auth
      ...options
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }

      return await response.text();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;

    return this.request(url, {
      method: 'GET'
    });
  }

  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    });
  }
}

// Export configured API client instance
export const apiClient = new APIClient();

// Export class for custom instances
export { APIClient };
