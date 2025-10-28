# Quick Start Guide - Table & Plate

## Get Black Background Working in Codespace

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: View Your Site
- Codespace will show a popup: "Your application running on port 3000 is available"
- Click **"Open in Browser"** or **"Open in Preview"**
- The site should load with a **pure black background (#000000)**

### Troubleshooting Black Background

If you see a white or grey background instead of black:

1. **Hard Refresh Your Browser**
   - Windows/Linux: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

2. **Clear Browser Cache**
   - Open DevTools (F12)
   - Right-click the refresh button
   - Select "Empty Cache and Hard Reload"

3. **Check Dark Mode is Active**
   - Open DevTools (F12)
   - Go to Console tab
   - Type: `document.documentElement.classList`
   - Should show "dark" in the list

4. **Verify CSS is Loading**
   - Open DevTools (F12)
   - Go to Network tab
   - Look for `globals.css` - should be 200 status
   - Check Elements tab - `<html>` should have `class="dark"`

5. **Restart Dev Server**
   ```bash
   # Press Ctrl+C to stop
   npm run dev
   ```

## What You Should See

✅ **Pure black background** (#000000)  
✅ **White text** on dark background  
✅ **Pink/rose gradient buttons** with rounded corners  
✅ **Chef cards** with dark styling and smooth animations  
✅ **Video background** with subtle overlay effects  

## Key Features to Test

1. **Homepage** - Black background with "Table & Plate" logo
2. **Get Started Button** - Pink gradient, rounded-2xl
3. **Chef Cards** - Horizontal scrolling grid
4. **Filters** - Click filter button to see modal with dark theme
5. **Signup Flow** - Complete customer onboarding

## Common Issues

### Issue: White Flash on Load
**Solution**: This is normal - the dark mode applies after React hydrates. It disappears in production builds.

### Issue: Styles Not Applying
**Solution**: 
```bash
# Delete Next.js cache
rm -rf .next

# Reinstall node_modules
rm -rf node_modules
npm install

# Restart dev server
npm run dev
```

### Issue: Port Already in Use
**Solution**:
```bash
# Run on different port
npm run dev -- -p 3001
```

## Deploy to Vercel (Production)

In production, the black background will be instant with no flash:

```bash
# Option 1: Push to GitHub, then import to Vercel
git add .
git commit -m "Initial commit"
git push

# Option 2: Use Vercel CLI
npm i -g vercel
vercel
```

## Environment Setup

The site works perfectly without any environment variables for development. 

If you want to add Supabase later:
```bash
cp .env.example .env.local
# Then edit .env.local with your Supabase credentials
```

## Design Specifications

- **Background**: Pure black (#000000)
- **Text**: White (#ffffff)
- **Cards**: Very dark grey (#0a0a0a)
- **Borders**: White with 10% opacity
- **Primary Gradient**: Pink to Rose
- **Border Radius**: rounded-2xl (16px) for buttons, rounded-3xl (24px) for cards
- **Font**: Futura (with fallbacks to Futura PT, Avenir Next, Avenir)

## Need Help?

1. Check the browser console for errors (F12 > Console)
2. Verify Node.js version: `node --version` (should be 18.17+)
3. Check npm version: `npm --version`
4. Review `/SETUP.md` for detailed instructions
5. Review `/guidelines/Guidelines.md` for design standards

---

**Remember**: The black background is part of the dark-first design approach. Everything should render on black by default!
