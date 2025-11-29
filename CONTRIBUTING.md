# Contributing to AIGAMER Portfolio

Thank you for your interest in contributing to the AIGAMER Portfolio project! This document provides guidelines and instructions for contributing.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs **actual behavior**
- **Screenshots** if applicable
- **Environment details** (browser, OS, etc.)

### Suggesting Enhancements

We welcome enhancement suggestions! Please create an issue with:

- **Clear description** of the enhancement
- **Use case** explaining why it would be useful
- **Proposed implementation** (if you have ideas)

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following the code style guidelines
3. **Test thoroughly** to ensure nothing breaks
4. **Update documentation** if needed
5. **Commit with clear messages** describing your changes
6. **Push to your fork** and submit a pull request

## 💻 Development Setup

1. Fork and clone the repository:
```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio/v3
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```env
REACT_APP_API_URL=https://api.aigamer.dev
REACT_APP_API_KEY=your_test_api_key
```

4. Start development server:
```bash
npm start
```

## 📝 Code Style Guidelines

### General Principles

- Write **clean, readable code** with meaningful variable names
- Add **comments** for complex logic
- Follow **React best practices** and hooks patterns
- Keep **components small and focused**
- Use **functional components** with hooks

### File Organization

```
src/
├── components/
│   └── ComponentName/
│       ├── index.js          # Component logic
│       └── styles/
│           └── ComponentName.css
├── data/                     # Static fallback data
├── hooks/                    # Custom React hooks
├── services/                 # API services
├── utils/                    # Utility functions
└── styles/                   # Global styles
```

### Naming Conventions

- **Components**: PascalCase (e.g., `HeroSection`)
- **Files**: PascalCase for components, camelCase for utilities
- **Functions**: camelCase (e.g., `fetchUserData`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- **CSS Classes**: kebab-case (e.g., `hero-section`)

### Component Structure

```javascript
import React, { useState, useEffect } from 'react';
import './styles/ComponentName.css';

/**
 * Brief description of component
 * @param {Object} props - Component props
 */
const ComponentName = ({ prop1, prop2 }) => {
  // State declarations
  const [state, setState] = useState(null);

  // Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  // Event handlers
  const handleEvent = () => {
    // Handler logic
  };

  // Render
  return (
    <div className="component-name">
      {/* JSX content */}
    </div>
  );
};

export default ComponentName;
```

### API Service Pattern

```javascript
export const serviceNameService = {
  async getResource() {
    try {
      const response = await apiClient.get('/endpoint');
      return {
        success: true,
        data: response
      };
    } catch (error) {
      console.error('Error description:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
};
```

## 🧪 Testing

Before submitting a PR:

1. **Test all features** affected by your changes
2. **Verify responsive design** on different screen sizes
3. **Check browser compatibility** (Chrome, Firefox, Safari, Edge)
4. **Test API fallback** by simulating API failure
5. **Verify no console errors** or warnings

## 📋 Commit Message Guidelines

Use clear, descriptive commit messages:

- `feat: Add new project card component`
- `fix: Resolve navigation menu mobile issue`
- `docs: Update API integration documentation`
- `style: Improve hero section animations`
- `refactor: Simplify data transformation logic`
- `test: Add tests for portfolio hook`
- `chore: Update dependencies`

## 🔄 Pull Request Process

1. **Update README.md** if you add features
2. **Update CHANGELOG.md** with your changes
3. **Ensure all checks pass** before requesting review
4. **Link related issues** in the PR description
5. **Wait for review** and address feedback

## 🚫 What Not to Do

- Don't commit `.env` files or API keys
- Don't commit `node_modules/` or `build/` directories
- Don't make large, unrelated changes in one PR
- Don't ignore code style guidelines
- Don't submit untested code

## 📦 Dependencies

When adding new dependencies:

1. **Justify the addition** - explain why it's needed
2. **Check bundle size impact** - keep the bundle small
3. **Verify compatibility** with existing dependencies
4. **Update package.json** and **commit lock file**

## 🎨 Design Guidelines

- Follow the **existing color scheme** and design language
- Maintain **consistency** with other components
- Ensure **accessibility** (proper contrast, ARIA labels)
- Test on **different screen sizes** (mobile, tablet, desktop)
- Use **Framer Motion** for animations where appropriate

## 📞 Getting Help

- Create an **issue** for questions
- Check **existing issues** and **pull requests**
- Review the **README.md** for setup instructions
- Refer to **API documentation** at [api.aigamer.dev/api/docs](https://api.aigamer.dev/api/docs/)

## 🙏 Recognition

Contributors will be:
- Listed in the project contributors
- Credited in release notes
- Appreciated in the community

## 📄 Code of Conduct

- Be **respectful** and **inclusive**
- Provide **constructive feedback**
- Focus on **collaboration** over competition
- Help others learn and grow

Thank you for contributing to AIGAMER Portfolio! 🚀
