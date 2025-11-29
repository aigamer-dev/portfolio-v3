# Portfolio V3 - React Application

This is the third version of my portfolio website, built as a modern React application with Framer Motion animations and deployed via GitHub Pages. It features a fully dynamic UI with API integration, fallback data handling, and responsive design.

The site showcases a complete rewrite using React 19, featuring smooth animations, modular component architecture, and integration with the AIGAMER API for dynamic content.

The site will be deployed to a custom domain (to be configured).

## Structure

```tree
.
├── public/
│   ├── index.html          # Main HTML template
│   ├── profile.json        # Backup data fallback
│   └── ...                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── Hero/          # Hero section
│   │   ├── About/         # About section
│   │   ├── Projects/      # Projects showcase
│   │   ├── Contact/       # Contact section
│   │   └── ...            # Other components
│   ├── data/              # Static data files
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API services
│   ├── utils/             # Utility functions
│   └── App.js             # Main App component
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions deployment
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## 🚀 Features

- **Dynamic Content**: Portfolio data fetched from `api.aigamer.dev` with fallback to local data
- **Modern UI**: Built with React 19 and Framer Motion for smooth animations
- **Responsive Design**: Fully responsive layout that works on all devices
- **Modular Architecture**: Clean, component-based structure for easy maintenance
- **API Integration**: Seamless integration with REST API for profile, projects, skills, and experience
- **Performance Optimized**: Built for production with optimized bundle size

## 📦 Tech Stack

- **Frontend**: React 19.1.0
- **Animations**: Framer Motion 12.23.6
- **Icons**: React Icons 5.5.0
- **Build Tool**: Create React App 5.0.1
- **API**: RESTful API from api.aigamer.dev

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd v3
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env.local` file in the root directory:
```env
REACT_APP_API_URL=https://api.aigamer.dev
REACT_APP_API_KEY=your_api_key_here
```

## 🚀 Development

Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 🏗️ Build

Create a production build:
```bash
npm run build
```

The optimized build will be in the `build/` folder.

## 📁 Project Structure

```
v3/
├── public/              # Static files
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # React components
│   │   ├── About/
│   │   ├── Contact/
│   │   ├── Footer/
│   │   ├── Hero/
│   │   ├── Navigation/
│   │   ├── Projects/
│   │   └── ...
│   ├── data/            # Static data files (fallback)
│   ├── hooks/           # Custom React hooks
│   │   └── usePortfolioData.js
│   ├── services/        # API services
│   │   ├── api.js
│   │   ├── apiClient.js
│   │   └── index.js
│   ├── styles/          # Global styles
│   └── utils/           # Utility functions
├── .env.local           # Local environment variables
├── .env.production      # Production environment variables
└── package.json
```

## 🔌 API Integration

The portfolio fetches data from the following endpoints:

- `GET /api/me/profile/` - User profile information
- `GET /api/me/projects/` - List of projects
- `GET /api/me/skills/` - List of skills
- `GET /api/me/experience/` - Work experience history
- `GET /api/me/social-links/` - Social media links

### Authentication

All API requests require an API key in the Authorization header:
```
Authorization: Api-Key your_api_key_here
```

### Fallback Mechanism

If the API is unavailable, the application automatically falls back to local data stored in the `src/data/` directory.

## 📥 Populating API Data

### Using the Provided Data Files

The repository includes ready-to-use data files for populating your API:

**`api-data-import.json`** - Complete portfolio data including:
- ✅ Profile information (19 fields)
- ✅ 20 Skills with categories and icons
- ✅ 5 Work experiences with tech stacks
- ✅ 3 Projects with details
- ✅ 6 Social media links

### Population Methods

**Option 1: Automated Python Script (Recommended)**
```bash
# Install requirements
pip install requests

# Run the script
./populate-api-data.py
```

**Option 2: Bash Script (Manual Examples)**
```bash
./populate-api-data.sh
```

**Option 3: Manual via Admin Dashboard**
1. Open `api-data-import.json`
2. Login to `https://api.aigamer.dev/admin/`
3. Copy and paste data into admin forms

**Option 4: Individual curl Commands**
```bash
curl -X POST https://api.aigamer.dev/api/me/profile/ \
  -H "Authorization: Api-Key your_api_key" \
  -H "Content-Type: application/json" \
  -d @profile-data.json
```

See the scripts for detailed examples and error handling.

## 🎨 Customization

### Updating Content

1. **Via API**: Update content through the API backend (recommended)
2. **Via Scripts**: Modify `api-data-import.json` and re-run population scripts
3. **Local Data**: Edit files in `src/data/` for fallback content

### Styling

- Global styles: `src/styles/globals.css`
- Component styles: `src/components/[ComponentName]/styles/`

## 📝 Available Scripts

- `npm start` - Start development server
- `npm run build` - Create production build
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (one-way operation)

## 🌐 Deployment

The portfolio can be deployed to any static hosting service:

1. Build the production version:
```bash
npm run build
```

2. Deploy the `build/` folder to:
   - GitHub Pages
   - Netlify
   - Vercel
   - AWS S3
   - Or any static hosting service

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **API Documentation**: [https://api.aigamer.dev/api/docs/](https://api.aigamer.dev/api/docs/)
- **Live Demo**: [Coming Soon]

## 📧 Contact

For questions or feedback, reach out via the contact form on the portfolio or through any of the social links.

---

Built with ❤️ by AIGAMER
