# AI DailyCard Website

A modern, responsive landing page for AI DailyCard - Smart Flashcards for Efficient Learning.

## 🚀 Features

- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Performance Optimized**: Fast loading with lazy loading images
- **SEO Friendly**: Proper meta tags and semantic HTML
- **Accessibility**: Built with accessibility best practices

## 📁 Project Structure

```
website/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── package.json        # Node.js dependencies
├── vercel.json         # Vercel deployment configuration
├── images/             # App screenshots
│   ├── app-home.png
│   ├── app-generator.png
│   ├── app-study.png
│   ├── app-cards.png
│   └── app-complete.png
└── README.md           # This file
```

## 🛠 Local Development

1. **Navigate to the website directory:**

   ```bash
   cd website
   ```

2. **Install dependencies (optional):**

   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   or simply open `index.html` in your browser.

## 🚀 Deploy to Vercel

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI:**

   ```bash
   npm install -g vercel
   ```

2. **Navigate to website directory:**

   ```bash
   cd website
   ```

3. **Deploy:**

   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - Login to your Vercel account
   - Choose project settings
   - Confirm deployment

### Method 2: Vercel Dashboard (GUI)

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign in/up with GitHub, GitLab, or Bitbucket**
3. **Click "New Project"**
4. **Import your Git repository** or **drag & drop the website folder**
5. **Configure project settings:**
   - Framework Preset: **Other**
   - Root Directory: **website** (if deploying from repo root)
   - Build Command: **(leave empty)**
   - Output Directory: **(leave empty)**
6. **Click "Deploy"**

### Method 3: GitHub Integration

1. **Push your code to GitHub repository**
2. **Connect Vercel to your GitHub account**
3. **Import the repository in Vercel dashboard**
4. **Configure settings and deploy**

## 🔧 Configuration

### Vercel Configuration (`vercel.json`)

The project includes a `vercel.json` file with:

- Static file serving
- Security headers
- Cache optimization
- Clean URLs

### Environment Variables (if needed)

If you need to add environment variables:

1. **In Vercel Dashboard:**

   - Go to Project Settings
   - Navigate to Environment Variables
   - Add your variables

2. **For local development:**
   Create a `.env.local` file in the website directory.

## 📱 Custom Domain

To use a custom domain:

1. **In Vercel Dashboard:**

   - Go to your project
   - Navigate to "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update DNS records:**
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or add A record pointing to Vercel's IP

## 🔍 SEO Optimization

The website includes:

- Meta tags for description and keywords
- Open Graph tags for social sharing
- Structured data markup
- Optimized images with alt text
- Semantic HTML structure

## 📊 Analytics Integration

To add analytics:

1. **Google Analytics:**

   - Add GA4 tracking code to `index.html`
   - Uncomment analytics code in `script.js`

2. **Facebook Pixel:**
   - Add pixel code to `index.html`
   - Update tracking functions in `script.js`

## 🛡 Security

The website includes:

- Security headers via `vercel.json`
- Content Security Policy ready structure
- XSS protection
- Frame options security

## 📈 Performance

Optimizations included:

- Compressed images
- Lazy loading
- Critical CSS inlined
- Minified assets
- Proper caching headers

## 🐛 Troubleshooting

### Common Issues:

1. **Images not loading:**

   - Verify image paths in `images/` directory
   - Check file names match HTML references

2. **Styles not applying:**

   - Ensure `styles.css` is in the same directory as `index.html`
   - Check for CSS syntax errors

3. **Deployment fails:**
   - Verify `vercel.json` syntax
   - Check all files are present
   - Review Vercel deployment logs

### Getting Help:

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- Check deployment logs in Vercel dashboard

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

---

**Built with ❤️ for AI DailyCard**
