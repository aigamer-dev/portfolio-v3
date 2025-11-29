import { apiClient } from './apiClient';

// Profile service - matches /api/me/profile/ endpoint
export const profileService = {
  // Get profile information
  async getProfile() {
    try {
      const response = await apiClient.get('/api/me/profile/');
      return {
        success: true,
        data: response
      };
    } catch (error) {
      console.error('Profile fetch error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
};

// Projects service - matches /api/me/projects/ endpoints
export const projectsService = {
  // Get all projects
  async getProjects() {
    try {
      const response = await apiClient.get('/api/me/projects/');
      return {
        success: true,
        data: response
      };
    } catch (error) {
      console.error('Projects fetch error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Get project by slug
  async getProject(slug) {
    try {
      const response = await apiClient.get(`/api/me/projects/${slug}/`);
      return {
        success: true,
        data: response
      };
    } catch (error) {
      console.error('Project fetch error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
};

// Skills service - matches /api/me/skills/ endpoints
export const skillsService = {
  // Get all skills
  async getSkills() {
    try {
      const response = await apiClient.get('/api/me/skills/');
      return {
        success: true,
        data: response
      };
    } catch (error) {
      console.error('Skills fetch error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Get skill by ID
  async getSkill(id) {
    try {
      const response = await apiClient.get(`/api/me/skills/${id}/`);
      return {
        success: true,
        data: response
      };
    } catch (error) {
      console.error('Skill fetch error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
};

// Experience service - matches /api/me/experience/ endpoints
export const experienceService = {
  // Get all experience/work history
  async getExperience() {
    try {
      const response = await apiClient.get('/api/me/experience/');
      return {
        success: true,
        data: response
      };
    } catch (error) {
      console.error('Experience fetch error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Get experience by ID
  async getExperienceById(id) {
    try {
      const response = await apiClient.get(`/api/me/experience/${id}/`);
      return {
        success: true,
        data: response
      };
    } catch (error) {
      console.error('Experience detail fetch error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
};

// Social Links service - matches /api/me/social-links/ endpoints
export const socialLinksService = {
  // Get all social links
  async getSocialLinks() {
    try {
      const response = await apiClient.get('/api/me/social-links/');
      return {
        success: true,
        data: response
      };
    } catch (error) {
      console.error('Social links fetch error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
};
