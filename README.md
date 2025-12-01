# ShoreSquad 🌊

**Rally your crew. Track weather. Hit the next beach cleanup.**

ShoreSquad is a dope mobile-first web application that mobilizes young people to clean beaches through easy planning, real-time weather tracking, and social features. Find beaches, coordinate cleanup events, and join the eco-action movement!

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Design System](#design-system)
- [Technical Stack](#technical-stack)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Accessibility](#accessibility)
- [Performance](#performance)
- [Contributing](#contributing)

---

## 📖 Project Overview

### One-Line Pitch
Rally your crew, track weather, and hit the next beach cleanup with our dope map app!

### Why It Matters
ShoreSquad creates value by mobilizing young people to clean beaches, using weather and maps for easy planning and social features to make eco-action fun and connected.

### Target Audience
- Ages 13-35 (Gen Z & young millennials)
- Environmentally conscious youth
- Community organizers
- Beach enthusiasts

---

## ✨ Features

### Core Features
- 🗺️ **Smart Beach Mapping** - Discover cleanup hotspots with interactive Leaflet.js map
- ⛅ **Weather Integration** - Real-time weather forecasts for planning sessions
- 👥 **Crew Management** - Build eco-warrior squads and coordinate events
- 🏆 **Gamification** - Earn badges and climb leaderboards
- 📍 **Geolocation** - Auto-detect nearby beaches
- 📱 **Mobile-First** - Optimized for all devices
- ♿ **Accessible** - WCAG 2.1 AA compliant

### Upcoming Features
- User authentication & profiles
- Event registration system
- Real-time collaboration
- Impact tracking dashboard
- Social sharing integration

---

## 🎨 Design System

### Color Palette
Thoughtfully chosen to evoke coastal vibes and environmental action:

| Color | Hex | Purpose | Usage |
|-------|-----|---------|-------|
| Ocean Blue | `#0077BE` | Primary brand color | Navigation, headers, accents |
| Vibrant Green | `#00D084` | Call-to-action | Buttons, highlights, eco-focus |
| Sandy Beige | `#F4A460` | Secondary accent | Stats, badges, warmth |
| Clean White | `#FFFFFF` | Background | Main content area |
| Charcoal | `#2C3E50` | Text color | Body copy, dark elements |
| Light Gray | `#ECF0F1` | Neutral bg | Sections, cards |

### Typography
- **Display**: Poppins (700) - Headlines
- **Body**: Inter (400/500) - Readability and modern feel
- **Mono**: System fonts - Code, technical content

### Spacing & Layout
- Desktop: Max-width 1200px
- Mobile: Full-width with 20px padding
- Grid-based: 12-column system
- Consistent gaps: 1rem, 2rem, 3rem

---

## 💻 Technical Stack

### Frontend
- **HTML5** - Semantic structure
- **CSS3** - Modern styling (Grid, Flexbox, CSS Variables)
- **JavaScript (ES6+)** - Core interactivity

### Libraries & APIs
- **Leaflet.js** - Interactive mapping
- **OpenStreetMap** - Map tiles
- **Google Fonts** - Typography
- **OpenWeatherMap API** (ready for integration)

### Tools & Configuration
- **Live Server** - Development server
- **Git** - Version control
- **VS Code** - Recommended IDE

---

## 🚀 Setup Instructions

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor or IDE (VS Code recommended)
- Git (optional)

### Quick Start

1. **Clone or download the repository**
   ```bash
   git clone <repository-url>
   cd dev-c240/ShoreSquad
   ```

2. **Start development server**
   
   **Option A: Using Live Server (VS Code Extension)**
   - Install "Live Server" extension in VS Code
   - Right-click `index.html` → "Open with Live Server"
   - Browser opens at `http://127.0.0.1:5500`

   **Option B: Using Python (built-in)**
   ```bash
   python -m http.server 8000
   # Visit http://localhost:8000
   ```

   **Option C: Using Node.js http-server**
   ```bash
   npm install -g http-server
   http-server ShoreSquad -p 8000
   ```

3. **Open in browser**
   - Navigate to the local server URL
   - Browser will auto-reload with Live Server

### Configuration Files
- `.liveserverrc` - Live Server settings
- `.gitignore` - Git exclusions
- `index.html` - HTML5 boilerplate
- `css/styles.css` - Complete styling
- `js/app.js` - JavaScript application

---

## 📱 Usage

### Navigation
- Use the sticky navbar to navigate sections
- Mobile hamburger menu on screens < 768px
- All links support keyboard navigation

### Map Interaction
- Click beaches to view event details
- Use "Use My Location" button for geolocation
- Zoom with mouse wheel or touch
- Search for specific locations (coming soon)

### Events
- Browse upcoming cleanup events
- Click "Join Event" to register
- Filter by date or location (coming soon)

### Crew Management
- View squad members
- Click "Invite Friends" to add teammates
- Share crew codes for team invites

---

## ♿ Accessibility Features

### WCAG 2.1 AA Compliance
- ✅ Semantic HTML structure
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ High contrast ratios (4.5:1+)
- ✅ Focus indicators (outline: 3px)
- ✅ Screen reader announcements
- ✅ Reduced motion support
- ✅ Skip-to-content link

### Keyboard Support
- `Tab` - Navigate to next interactive element
- `Shift+Tab` - Navigate to previous element
- `Enter` / `Space` - Activate buttons/links
- `Escape` - Close mobile menu (coming soon)

### Color Accessibility
- No reliance on color alone for meaning
- 4.5:1 contrast ratio for text
- Color-blind friendly palette

---

## ⚡ Performance Optimizations

### Current Implementations
- Lazy loading support for images
- Minified CSS and JavaScript ready
- Service Worker integration ready
- Responsive image sizing
- Efficient DOM queries
- Debounced event handlers

### Best Practices
- <3s first contentful paint target
- Lighthouse 90+ score goal
- Zero cumulative layout shift
- Mobile-first approach

### Future Optimizations
- Image optimization & WebP format
- Code splitting & dynamic imports
- Service workers for offline support
- CDN integration for assets

---

## 🔧 Development Tips

### VS Code Extensions Recommended
- Live Server (ms-vscode.live-server)
- Prettier - Code formatter
- ESLint - JavaScript linting
- Thunder Client - API testing

### Project Structure
```
ShoreSquad/
├── index.html          # Main HTML file
├── css/
│   └── styles.css     # All styling
├── js/
│   └── app.js         # Application logic
├── .liveserverrc      # Live Server config
├── README.md          # This file
└── assets/            # (Future: images, icons)
```

### Common Tasks
- **Add new feature**: Edit relevant HTML section, add CSS in styles.css, implement JS in app.js
- **Test locally**: Use Live Server for instant browser refresh
- **Check accessibility**: Use browser DevTools, WAVE extension, Lighthouse

---

## 📝 Git Workflow

```bash
# Initial setup
git init
git add .
git commit -m "Initial ShoreSquad project setup"

# Making changes
git checkout -b feature/feature-name
git add .
git commit -m "Add feature description"
git push origin feature/feature-name

# Merging back to main
git checkout main
git merge feature/feature-name
```

### Ignored Files
- `node_modules/` - Dependencies
- `.DS_Store` - macOS system file
- `.env` - Environment variables
- `dist/` - Build output

---

## 🤝 Contributing

### Code Style
- **HTML**: Semantic tags, proper indentation
- **CSS**: Follow naming conventions, organize by sections
- **JS**: ES6+ syntax, meaningful variable names, comments for complex logic

### Commit Messages
```
[Feature] Add new feature description
[Fix] Fix bug description
[Docs] Update documentation
[Style] Formatting changes
```

---

## 📄 License

This project is created for educational purposes. All rights reserved.

---

## 🌊 Let's Clean Together!

ShoreSquad is more than just an app—it's a movement. Every beach cleaned, every volunteer joined, every crew assembled brings us closer to healthier oceans.

**Ready to rally your crew? Start using ShoreSquad today!**

---

## 📞 Support

- 🐛 Found a bug? Create an issue
- 💡 Have an idea? Share your suggestion
- ❓ Need help? Check the docs or reach out

---

**Made with 💚 for our oceans.**
   ```
3. Open the project in your preferred code editor.
4. Install any necessary dependencies (if applicable).
5. Launch the application using Live Server for real-time updates.

## JavaScript Features
- Fetch API for retrieving weather data and maps.
- Event delegation for handling user interactions efficiently.
- Debouncing for optimizing performance on scroll and resize events.
- Local storage for saving user preferences and settings.

## UX Design Principles
- Consistent navigation and layout for ease of use.
- Clear call-to-action buttons to guide users.
- Responsive design for accessibility on various devices.
- Use of alt text for images and ARIA roles for enhanced accessibility.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.