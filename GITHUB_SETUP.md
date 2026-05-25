# GitHub Setup Guide

Your TODO list app is now ready to be pushed to GitHub! Follow these steps:

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in to your account
2. Click the `+` icon in the top right corner and select "New repository"
3. Name your repository: `todolistapp` (or any name you prefer)
4. Add a description: "A beautiful, mobile-friendly TODO list app with React and IndexedDB"
5. Choose "Public" if you want it to be visible to others
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

## Step 2: Add Remote and Push

Copy the following commands and run them in your terminal from the project directory:

```bash
# Replace YOUR_USERNAME and YOUR_REPO_NAME with your GitHub username and repository name
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Or using SSH (if you have SSH keys set up):

```bash
git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 3: Verify

1. Refresh your GitHub repository page
2. You should see all your files and the commit history
3. The README should be displayed on the main page

## Deployment Options

Once your code is on GitHub, you can deploy it for free using:

### Option 1: GitHub Pages (Static Site)
1. Go to your repository settings
2. Scroll to "GitHub Pages" section
3. Under "Build and deployment", select "Deploy from a branch"
4. Choose `main` branch and `/root` folder (after building)
5. Your app will be available at: `https://YOUR_USERNAME.github.io/todolistapp`

### Option 2: Vercel (Recommended - Free)
1. Go to [Vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Select your `todolistapp` repository
5. Click "Deploy"
6. Your app will be live at a Vercel URL instantly!

### Option 3: Netlify (Free)
1. Go to [Netlify.com](https://www.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repository
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click "Deploy site"

## Troubleshooting

### Authentication Error
If you get authentication errors, make sure you have:
- GitHub credentials configured, or
- SSH keys set up for GitHub

### Remote Already Exists
If you get "remote origin already exists", run:
```bash
git remote remove origin
# Then run the git remote add command again
```

## Making Updates

After making changes to your code:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

---

**Enjoy your beautiful TODO list app! 🚀**
