# 🎵 Spotify Culichi - Full-Featured Music Streaming App

<div align="center">

![Spotify Culichi Landing Page](https://github.com/user-attachments/assets/a93e1df1-68df-4c89-b41f-9374f1bc43f3)

**A modern, full-featured Spotify clone built with Next.js 14, TypeScript, and the Spotify Web API**

[Demo](#demo) • [Features](#features) • [Setup](#setup-instructions) • [Tech Stack](#technologies-used)

</div>

---

## 📖 About

Spotify Culichi is a pixel-perfect recreation of Spotify's web player, showcasing modern web development practices and seamless integration with the Spotify API. This project demonstrates how to build a production-ready music streaming application with authentication, real-time playback, and a beautiful, responsive UI.

Whether you're looking to learn about modern React development, API integration, or just want to explore a fully functional Spotify alternative, this project has you covered!

## ✨ Features

### 🎵 Core Music Features
- **Browse Music Library** - Explore playlists, albums, and artists from Spotify's extensive catalog
- **Music Playback** - Play 30-second previews of tracks with full playback controls
- **Personalized Recommendations** - View "Made For You" playlists and daily mixes
- **Liked Songs** - Save and manage your favorite tracks in a dedicated playlist
- **Recently Played** - Quick access to your recent listening history

### 🔐 Authentication & User Experience
- **Spotify OAuth Integration** - Secure login with your Spotify account
- **Demo Mode** - Try the app without authentication to explore features
- **Persistent Sessions** - Stay logged in across browser sessions

### 🎨 Interface & Design
- **Spotify-Inspired Dark Theme** - Beautiful, authentic Spotify design language
- **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **Smooth Animations** - Polished transitions and hover effects
- **Interactive Player** - Bottom player bar with volume control, shuffle, and repeat

### 🔍 Discovery & Navigation
- **Search Functionality** - Find songs, artists, albums, and playlists
- **Library Management** - Organize your music collection
- **Multiple Views** - Browse by category (All, Music, Podcasts)

## 📸 Demo

### Landing Page
![Landing Page](https://github.com/user-attachments/assets/a93e1df1-68df-4c89-b41f-9374f1bc43f3)
*Welcome screen with demo mode and Spotify authentication options*

### Home Page
![Home Page](https://github.com/user-attachments/assets/90bfa2be-c58d-401a-8787-045291646d97)
*Browse personalized playlists, recently played tracks, and music recommendations*

### Liked Songs
![Liked Songs](https://github.com/user-attachments/assets/45bf3dca-6bd0-4b42-9669-8d5382e71bbb)
*Manage your favorite tracks in a beautiful playlist view*

---

## 🚀 Setup Instructions

Follow these steps to get Spotify Culichi up and running on your local machine.

### Prerequisites

- Node.js 18+ installed on your machine
- npm, yarn, or pnpm package manager
- A Spotify account (free or premium)

### 1. Get Spotify API Credentials

To connect with Spotify's API, you'll need to register your application:

1. Navigate to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account credentials
3. Click **"Create an App"**
4. Fill in the required information:
   - **App Name**: Choose any name (e.g., "Spotify Culichi")
   - **App Description**: Brief description of your app
5. After creation, you'll see your **Client ID** and **Client Secret** - keep these handy!
6. Click **"Edit Settings"** and add the following **Redirect URI**:
   - For local development: `http://localhost:3000/api/auth/callback`
   - For production: `https://your-domain.vercel.app/api/auth/callback`
7. Save your settings

### 2. Clone the Repository

```bash
git clone https://github.com/ByCulichi/Mirror.git
cd Mirror
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Add your Spotify credentials to `.env.local`:

```env
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
NEXT_PUBLIC_SPOTIFY_REDIRECT_URI=http://localhost:3000/api/auth/callback
```

> **Note**: Never commit your `.env.local` file to version control. It's already included in `.gitignore`.

### 4. Install Dependencies

Using npm:
```bash
npm install --legacy-peer-deps
```

Using yarn:
```bash
yarn install
```

Using pnpm:
```bash
pnpm install
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### 6. Start Exploring!

You have two options:

1. **Demo Mode**: Click "Ver Demo" to explore the app with pre-loaded sample data
2. **Connect with Spotify**: Click "Conectar con Spotify" to authenticate and access your personal music library

---

## 🎯 How to Use

### Playing Music

1. **Login**: Click "Conectar con Spotify" on the landing page
2. **Authorize**: Grant the app permission to access your Spotify account
3. **Browse**: Explore playlists, albums, and recently played tracks on the home page
4. **Play**: Click on any track to load it in the bottom player
5. **Control**: Use the player controls to play, pause, skip, shuffle, and adjust volume

> **Note**: Due to Spotify API limitations, most tracks provide 30-second preview clips. Full playback requires Spotify Premium and an active device.

### Managing Your Library

- **Like Songs**: Click the heart icon on any track to add it to "Liked Songs"
- **View Library**: Access your saved music from the left sidebar
- **Browse Playlists**: Explore curated playlists and daily mixes personalized for you

---

## 🛠️ Technologies Used

This project leverages cutting-edge web technologies to deliver a seamless music streaming experience:

### Frontend Framework
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router for optimal performance
- **[React 19](https://react.dev/)** - Modern UI library with latest features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality, accessible component library
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible UI primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful, consistent icons

### API & Authentication
- **[Spotify Web API](https://developer.spotify.com/documentation/web-api)** - Music data and metadata
- **OAuth 2.0** - Secure authentication flow

### Additional Libraries
- **[React Hook Form](https://react-hook-form.com/)** - Form state management
- **[Zod](https://zod.dev/)** - Schema validation
- **[date-fns](https://date-fns.org/)** - Date utility library
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications

---

## 📁 Project Structure

```
Mirror/
├── app/                      # Next.js App Router
│   ├── api/
│   │   └── auth/            # Authentication API routes
│   │       ├── login/       # Spotify OAuth login
│   │       ├── callback/    # OAuth callback handler
│   │       └── logout/      # Logout functionality
│   ├── home/                # Main application pages
│   │   ├── browse/          # Browse music categories
│   │   ├── liked/           # Liked songs page
│   │   └── page.tsx         # Home dashboard
│   ├── library/             # User library page
│   ├── search/              # Search functionality
│   ├── globals.css          # Global styles and CSS variables
│   ├── layout.tsx           # Root layout with providers
│   └── page.tsx             # Landing page
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── auth-guard.tsx       # Protected route wrapper
│   ├── hamburger-menu.tsx   # Mobile menu
│   ├── mobile-nav.tsx       # Mobile navigation bar
│   ├── player.tsx           # Music player component
│   ├── player-bar.tsx       # Player controls bar
│   ├── sidebar.tsx          # Desktop sidebar navigation
│   ├── right-sidebar.tsx    # Right sidebar (queue, lyrics)
│   ├── top-bar.tsx          # Top navigation bar
│   └── theme-provider.tsx   # Theme context provider
├── contexts/                # React contexts
├── lib/                     # Utility functions and configs
│   ├── spotify/             # Spotify API client
│   └── auth.ts              # Authentication utilities
├── types/                   # TypeScript type definitions
│   └── spotify.ts           # Spotify API types
├── public/                  # Static assets
│   └── *.jpg                # Album covers and images
├── styles/                  # Additional styles
├── .env.local              # Environment variables (not in git)
├── .gitignore              # Git ignore rules
├── components.json         # shadcn/ui configuration
├── next.config.mjs         # Next.js configuration
├── package.json            # Dependencies and scripts
├── postcss.config.mjs      # PostCSS configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

---

## 🚀 Deploying to Vercel

Vercel is the recommended platform for deploying Next.js applications, offering zero-configuration deployment with automatic HTTPS, global CDN, and instant rollbacks.

### Method 1: Deploy via Vercel Dashboard

1. **Push to GitHub**: Ensure your code is pushed to a GitHub repository
   ```bash
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click **"New Project"**
   - Import your GitHub repository
   - Vercel will auto-detect Next.js configuration

3. **Add Environment Variables**:
   - In the project settings, navigate to **"Environment Variables"**
   - Add the following variables:
     - `NEXT_PUBLIC_SPOTIFY_CLIENT_ID` → Your Spotify Client ID
     - `SPOTIFY_CLIENT_SECRET` → Your Spotify Client Secret
     - `NEXT_PUBLIC_SPOTIFY_REDIRECT_URI` → `https://your-domain.vercel.app/api/auth/callback`

4. **Deploy**: Click **"Deploy"** and wait for the build to complete

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### Post-Deployment: Update Spotify Redirect URI

**Important**: After your app is deployed, you must update your Spotify app settings:

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Select your app
3. Click **"Edit Settings"**
4. Add your production URL to **Redirect URIs**:
   ```
   https://your-domain.vercel.app/api/auth/callback
   ```
5. Click **"Save"**

Your Spotify Culichi app is now live! 🎉

---

## ⚠️ Limitations & Known Issues

- **30-Second Previews**: The Spotify API provides 30-second preview clips for most tracks. Full playback requires Spotify Premium and an active Spotify device.
- **Premium Features**: Some features (like controlling active devices) require a Spotify Premium subscription.
- **API Rate Limits**: Spotify API has rate limits. Heavy usage may result in temporary restrictions.
- **Browser Compatibility**: Best experienced on modern browsers (Chrome, Firefox, Safari, Edge).

---

## 🔧 Troubleshooting

### Common Issues

**Problem**: "Failed to authenticate with Spotify"
- **Solution**: Verify your Client ID and Client Secret are correct in `.env.local`
- **Solution**: Ensure the Redirect URI in `.env.local` matches exactly with your Spotify app settings

**Problem**: "No preview available for this track"
- **Solution**: Not all tracks have preview URLs. This is a Spotify API limitation.

**Problem**: "Build fails with dependency errors"
- **Solution**: Try installing with `--legacy-peer-deps` flag: `npm install --legacy-peer-deps`

**Problem**: Songs won't play
- **Solution**: Check browser console for errors
- **Solution**: Verify your Spotify account is active and in good standing
- **Solution**: Some tracks may not have preview URLs available

### Getting Help

If you encounter issues not covered here:
1. Check the [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api)
2. Review browser console for error messages
3. Ensure all environment variables are set correctly
4. Verify your Spotify app is properly configured in the Developer Dashboard

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Spotify Culichi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve Spotify Culichi:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 🌟 Acknowledgments

- **[Spotify](https://www.spotify.com/)** - For providing the amazing Web API
- **[Next.js Team](https://nextjs.org/)** - For the incredible React framework
- **[Vercel](https://vercel.com/)** - For seamless deployment platform
- **[shadcn](https://ui.shadcn.com/)** - For the beautiful component library

---

## 📞 Contact & Support

- **GitHub**: [@ByCulichi](https://github.com/ByCulichi)
- **Issues**: [Report a bug](https://github.com/ByCulichi/Mirror/issues)

---

<div align="center">

**Made with ❤️ and 🎵 by the Culichi Team**

If you found this project helpful, please consider giving it a ⭐️!

</div>
