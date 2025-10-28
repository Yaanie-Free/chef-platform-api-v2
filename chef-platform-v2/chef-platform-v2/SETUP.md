# Setup Instructions for Codespace & Vercel

## Quick Start in Codespace

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Access the Application**
   - Codespace will provide a forwarded URL (usually on port 3000)
   - Click the "Open in Browser" button when prompted
   - Or manually navigate to the forwarded port URL

## Deploy to Vercel

### Option 1: GitHub Integration (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js - click "Deploy"
6. Done! Your site will be live in ~2 minutes

### Option 2: Vercel CLI

1. Install Vercel CLI globally:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Follow the prompts to deploy

## Environment Variables

If you need to use Supabase or other external services:

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your environment variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. In Vercel, add the same environment variables:
   - Go to Project Settings > Environment Variables
   - Add each variable
   - Redeploy

## Troubleshooting

### Styles Not Loading

If styles aren't appearing:
1. Make sure you ran `npm install`
2. Restart the dev server with `npm run dev`
3. Clear your browser cache
4. Check the browser console for errors

### Build Errors

If you get build errors:
1. Delete `.next` folder and `node_modules`:
   ```bash
   rm -rf .next node_modules
   ```
2. Reinstall dependencies:
   ```bash
   npm install
   ```
3. Try building again:
   ```bash
   npm run build
   ```

### Port Already in Use

If port 3000 is already in use:
```bash
npm run dev -- -p 3001
```

This will run on port 3001 instead.

## Features to Test

After setup, test these features:

1. **Chef Discovery** - Scroll through chef profiles horizontally
2. **Filters** - Click "Filters" button to filter by location, price, cuisine, event type, and guest count
3. **Search** - Use the search bar in the header to find chefs by name
4. **Signup Flow** - Click "Get started" to test the customer signup
5. **Chef Signup** - Click "Become a Chef" in the header
6. **Dark Mode** - The site should be in dark mode by default
7. **Responsive Design** - Test on mobile, tablet, and desktop

## Support

For issues or questions:
- Email: hello@tableandplate.co.za
- Check the browser console for error messages
- Review `/guidelines/Guidelines.md` for design standards
