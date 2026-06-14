# 💕 Birthday Website — Setup Guide

## Folder Structure
```
birthday-website/
├── index.html      ← main page
├── style.css       ← all styles
├── script.js       ← all JavaScript
├── photos/         ← add your photos here
│   ├── memory1.jpg    (Timeline card 1)
│   ├── memory2.jpg    (Timeline card 2)
│   ├── memory3.jpg    (Timeline card 3)
│   ├── memory4.jpg    (Timeline card 4)
│   ├── gallery1.jpg   (Gallery photo 1)
│   ├── gallery2.jpg   (Gallery photo 2)
│   ├── gallery3.jpg   (Gallery photo 3)
│   ├── gallery4.jpg   (Gallery photo 4)
│   ├── gallery5.jpg   (Gallery photo 5)
│   └── gallery6.jpg   (Gallery photo 6)
└── music/
    └── your-song.mp3  (romantic background music)
```

## ✏️ Personalisation Checklist

### In index.html — search for ✏️ CUSTOMISE:
- [ ] Girlfriend's name (appears in Welcome, Hero, and Finale sections)
- [ ] Hero message (paragraph below the name)
- [ ] Timeline dates, titles, descriptions, and photo references
- [ ] Gallery photo paths and captions (data-caption attribute)
- [ ] Love letter sign-off name
- [ ] Countdown section label
- [ ] Surprise popup message
- [ ] Wishes wall names (— Your Mum, — Dad, etc.)
- [ ] Finale message and your name

### In script.js — search for ✏️ PERSONALISATION CONSTANTS:
- [ ] TARGET_DATE — countdown target (next birthday or anniversary)
- [ ] RELATIONSHIP_START — when your relationship started (for days-together counter)
- [ ] LOVE_LETTER — your full love letter text

### Adding Music:
1. Place your MP3 in the `/music/` folder
2. In index.html, find the `<audio>` tag near line 55
3. Uncomment the `<audio>` line and update the `src` attribute:
   ```html
   <audio id="bgMusic" loop src="music/your-song.mp3"></audio>
   ```
4. Remove or comment out the empty `<audio id="bgMusic" loop></audio>` below it

## 🚀 How to Open
Simply open `index.html` in any modern web browser.
No server needed — it runs entirely in the browser!

For best results, use Chrome, Firefox, Edge, or Safari (latest versions).

---
Made with ❤️ — Customise it, personalise it, and make her smile!
