# 🚀 Deployment Guide - Simba Supermarket

## Quick Deploy Options

### Option 1: Netlify Drop (Easiest - No Account Needed)

1. Build the project:
```bash
cd simba-supermarket
npm run build
```

2. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)

3. Drag and drop the entire `dist` folder

4. Your site will be live instantly with a URL like: `https://random-name-123456.netlify.app`

**That's it!** ✨ Your site is now live and accessible worldwide.

---

### Option 2: Netlify CLI (For Custom Domain)

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```
(This will open your browser for authentication)

3. Build the project:
```bash
cd simba-supermarket
npm run build
```

4. Deploy:
```bash
netlify deploy --prod --dir=dist
```

5. Follow the prompts:
   - Create a new site or link to existing
   - Choose a site name (e.g., `simba-supermarket`)
   - Confirm deployment

Your site will be live at: `https://simba-supermarket.netlify.app`

---

### Option 3: Netlify Git Integration (Auto-Deploy)

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit - Simba Supermarket"
git remote add origin https://github.com/yourusername/simba-supermarket.git
git push -u origin main
```

2. Go to [https://app.netlify.com](https://app.netlify.com)

3. Click "Add new site" → "Import an existing project"

4. Connect to GitHub and select your repository

5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18 or higher

6. Click "Deploy site"

Netlify will automatically deploy on every push to main branch! 🎉

---

### Option 4: Vercel (Alternative Platform)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd simba-supermarket
vercel --prod
```

3. Follow the prompts and your site will be live!

---

### Option 5: GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/simba-supermarket"
}
```

3. Deploy:
```bash
npm run deploy
```

---

## 🌐 Custom Domain Setup

### For Netlify:

1. Go to your site settings in Netlify dashboard
2. Click "Domain management" → "Add custom domain"
3. Enter your domain (e.g., `simbasupermarket.rw`)
4. Follow DNS configuration instructions
5. Netlify provides free SSL certificate automatically

### DNS Records to Add:
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site-name.netlify.app
```

---

## ✅ Post-Deployment Checklist

After deployment, verify:

- [ ] Home page loads correctly
- [ ] All product images display
- [ ] Search functionality works
- [ ] Cart persists across page refreshes
- [ ] Checkout flow completes
- [ ] Language switcher works (EN/FR/RW)
- [ ] Dark mode toggle works
- [ ] Mobile responsive design
- [ ] All 11 store locations display
- [ ] Contact form works
- [ ] Sign in/Sign up pages work

---

## 🔧 Environment Variables (Optional)

If you add backend services later, create a `.env` file:

```env
VITE_API_URL=https://api.simbasupermarket.rw
VITE_MOMO_API_KEY=your_momo_api_key
VITE_ANALYTICS_ID=your_analytics_id
```

Then update Netlify environment variables in dashboard.

---

## 📊 Performance Optimization

The build is already optimized:
- ✅ Code splitting
- ✅ Minified JS/CSS
- ✅ Gzip compression
- ✅ CDN for images
- ✅ Lazy loading

**Build Stats:**
- HTML: 0.65 KB
- CSS: 28.22 KB (5.82 KB gzipped)
- JS: 484.10 KB (111.12 KB gzipped)

---

## 🐛 Troubleshooting

### Build fails:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Routes not working (404 on refresh):
- Ensure `netlify.toml` is present (it is!)
- It contains the redirect rule for SPA routing

### Images not loading:
- Check internet connection
- Images are hosted on Cloudinary CDN
- Verify `simba_products.json` is in `src/` folder

---

## 📱 Testing on Mobile

After deployment, test on:
- iOS Safari
- Android Chrome
- Different screen sizes
- Slow 3G connection

Use Chrome DevTools → Network → Throttling to simulate slow connections.

---

## 🎉 You're Done!

Your Simba Supermarket e-commerce site is now live and accessible to customers worldwide!

**Share your deployment URL:**
- With the Simba team
- On social media
- With potential customers

---

**Need help?** Check the main README.md for more details.
