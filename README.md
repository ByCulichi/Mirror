# Spotify Culichi - Spotify Clone

A full-featured Spotify clone built with Next.js 14, TypeScript, and the Spotify Web API.

## Features

- 🎵 Browse and play music from Spotify's catalog
- 🔐 Spotify OAuth authentication
- 📱 Responsive design (mobile & desktop)
- 🎨 Spotify-inspired dark theme
- 🎧 Music player with playback controls
- 📚 View playlists, albums, and artists
- 🔍 Search functionality
- ❤️ Liked songs and library management

## Setup Instructions

### 1. Get Spotify API Credentials

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create an App"
4. Fill in the app name and description
5. Once created, you'll see your **Client ID** and **Client Secret**
6. Click "Edit Settings" and add the following Redirect URI:
   - For local development: `http://localhost:3000/api/auth/callback`
   - For production: `https://your-domain.vercel.app/api/auth/callback`

### 2. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

2. Fill in your Spotify credentials in `.env.local`:
   \`\`\`env
   NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_client_id_here
   SPOTIFY_CLIENT_SECRET=your_client_secret_here
   NEXT_PUBLIC_SPOTIFY_REDIRECT_URI=http://localhost:3000/api/auth/callback
   \`\`\`

### 3. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 4. Run the Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing Song Previews

1. Click "Log in with Spotify" on the landing page
2. Authorize the app with your Spotify account
3. You'll be redirected to the home page
4. Browse playlists, albums, and recently played tracks
5. Click on any track to load it in the player
6. Note: Spotify API only provides 30-second previews for most tracks

## Deploying to Vercel

### Option 1: Deploy from v0

1. Click the "Publish" button in the top right of v0
2. Follow the prompts to deploy to Vercel

### Option 2: Deploy Manually

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Add your environment variables in the Vercel project settings:
   - `NEXT_PUBLIC_SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET`
   - `NEXT_PUBLIC_SPOTIFY_REDIRECT_URI` (use your Vercel domain)
6. Deploy!

### Important: Update Redirect URI

After deploying to Vercel:
1. Go to your Spotify Developer Dashboard
2. Edit your app settings
3. Add your Vercel domain to the Redirect URIs:
   \`\`\`
   https://your-domain.vercel.app/api/auth/callback
   \`\`\`

## Project Structure

\`\`\`
├── app/
│   ├── api/auth/          # Authentication routes
│   ├── home/              # Main app pages
│   ├── globals.css        # Global styles
│   └── page.tsx           # Landing page
├── components/
│   ├── sidebar.tsx        # Desktop sidebar navigation
│   ├── mobile-nav.tsx     # Mobile bottom navigation
│   └── player.tsx         # Music player component
├── lib/
│   ├── spotify/           # Spotify API client and config
│   └── auth.ts            # Authentication utilities
└── types/
    └── spotify.ts         # TypeScript types for Spotify API
\`\`\`

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Spotify Web API** - Music data and playback
- **shadcn/ui** - UI components

## Limitations

- Song previews are limited to 30 seconds (Spotify API limitation)
- Full playback requires Spotify Premium and active device
- Some features require additional Spotify API scopes

## Support

If you encounter any issues:
1. Check that your Spotify credentials are correct
2. Verify the Redirect URI matches in both `.env.local` and Spotify Dashboard
3. Ensure you're logged in with a valid Spotify account
4. Check the browser console for error messages

## License

MIT
