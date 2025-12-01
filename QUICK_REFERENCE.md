# ShoreSquad 🌊 - Quick Reference Guide

## 📱 How to Launch the Website

### Option 1: Live Server (RECOMMENDED)
```
1. Install "Live Server" extension in VS Code
2. Right-click ShoreSquad/index.html
3. Select "Open with Live Server"
4. Browser opens automatically at http://127.0.0.1:5500
```

### Option 2: Python
```bash
cd ShoreSquad
python -m http.server 8000
# Visit http://localhost:8000
```

### Option 3: Node.js http-server
```bash
npm install -g http-server
http-server ShoreSquad -p 8000
```

---

## 🎨 Color Palette Quick Reference

```
Primary Blue:     #0077BE  (Navigation, Headers)
Vibrant Green:    #00D084  (Buttons, CTAs)
Sandy Beige:      #F4A460  (Accents, Stats)
Clean White:      #FFFFFF  (Backgrounds)
Charcoal:         #2C3E50  (Text)
Light Gray:       #ECF0F1  (Section Backgrounds)
```

---

## 📂 Project Structure

```
ShoreSquad/
├── index.html           ← Main page
├── css/
│   └── styles.css      ← All styling (600+ lines)
├── js/
│   └── app.js          ← All JavaScript (500+ lines)
└── README.md           ← Full documentation
```

---

## ⚡ JavaScript Features Included

✅ **Mobile Navigation Toggle** - Hamburger menu for screens < 768px
✅ **Interactive Map** - Leaflet.js with sample beaches
✅ **Geolocation** - "Use My Location" button
✅ **Event System** - Load and display upcoming cleanups
✅ **Crew Management** - Display team members
✅ **Accessibility** - WCAG 2.1 AA compliant
✅ **Responsive Design** - Works on all devices

---

## 🎯 Key UX Principles Implemented

1. **Mobile-First** - Designed for phones first
2. **Accessibility** - Keyboard navigation, screen readers
3. **Performance** - Lazy loading, optimized code
4. **Clear Hierarchy** - Important info stands out
5. **Social Features** - Crew display, gamification
6. **Emotional Design** - Warm colors, friendly tone

---

## 🛠️ Git Commands

```bash
# Check status
git status

# View changes
git diff

# Stage all changes
git add .

# Commit with message
git commit -m "type: description"

# View commit history
git log --oneline
```

---

## 💡 Customization Tips

### Change Colors
Edit CSS Variables in `styles.css` (lines 6-13):
```css
:root {
    --primary-blue: #0077BE;
    --secondary-green: #00D084;
    /* etc */
}
```

### Change Beach Locations
Edit `app.js` - `addBeachMarkers()` function (lines 95-115)

### Add New Events
Edit `app.js` - `loadEvents()` function (lines 160-185)

### Modify Crew Members
Edit `app.js` - `loadCrew()` function (lines 201-210)

---

## 📱 Responsive Breakpoints

| Device | Width | Breakpoint |
|--------|-------|-----------|
| Mobile | < 480px | Optimized |
| Tablet | 480-768px | Responsive |
| Desktop | > 768px | Full layout |

---

## ♿ Accessibility Features

- ✅ Keyboard navigation (Tab, Enter)
- ✅ Focus indicators (visible outlines)
- ✅ High contrast text (4.5:1 ratio)
- ✅ ARIA labels for interactive elements
- ✅ Semantic HTML structure
- ✅ Screen reader support
- ✅ Skip-to-content link

---

## 🚀 Next Development Steps

1. **Phase 2**: Add backend (Node.js, MongoDB)
2. **Phase 3**: User authentication
3. **Phase 4**: Real-time weather API integration
4. **Phase 5**: Event registration system
5. **Phase 6**: Mobile app (React Native)

---

## 📖 Documentation Files

- **README.md** (ShoreSquad/) - Full user guide
- **SHORESQUAD_ANALYSIS.md** - Complete project analysis
- **package.json** - Dependencies & scripts
- **QUICK_REFERENCE.md** - This file!

---

## 🎓 Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Grid, Flexbox, Variables
- **JavaScript ES6+** - Modern syntax
- **Leaflet.js** - Interactive maps
- **OpenStreetMap** - Map tiles

---

## 💚 Design Philosophy

ShoreSquad uses a **mobile-first, accessibility-first, user-first** approach:

- 🌊 Ocean blue evokes water & trust
- 🌱 Vibrant green represents eco-action
- 📱 Touch-friendly for mobile users
- ♿ Fully keyboard accessible
- ⚡ Ultra-fast performance
- 👥 Social & community-focused

---

## ❓ Troubleshooting

### Map Not Loading?
- Check internet connection
- Verify OpenStreetMap CDN is accessible
- Check browser console for errors

### Geolocation Not Working?
- Allow location permission in browser
- Must use HTTPS in production (HTTP in dev OK)
- Check browser geolocation settings

### Styling Not Applied?
- Clear browser cache (Ctrl+Shift+Delete)
- Check that styles.css is in `/css` folder
- Verify CSS file is linked in HTML

### Navigation Menu Not Toggling?
- Check that JavaScript is enabled
- Verify app.js is loaded
- Check browser console for errors

---

## 📞 Support & Resources

- **Leaflet Docs**: https://leafletjs.com/
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/
- **MDN Web Docs**: https://developer.mozilla.org/
- **CSS Tricks**: https://css-tricks.com/

---

## ✅ Pre-Launch Checklist

- [x] HTML5 boilerplate complete
- [x] CSS responsive & styled
- [x] JavaScript interactive features working
- [x] Mobile navigation tested
- [x] Map displays correctly
- [x] Geolocation functional
- [x] Accessibility verified
- [x] Performance optimized
- [x] Git repository initialized
- [x] Documentation complete

---

**Ready to launch! 🌊 Let's clean some beaches!** 💚

---

*Last updated: December 1, 2025*