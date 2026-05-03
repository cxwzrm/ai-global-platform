# AI Industrial - Global Laser Equipment Platform

A modern, multilingual industrial equipment e-commerce platform built with Next.js 15, React 19, and Sanity.io CMS.

## 🚀 Features

- **Multilingual Support**: 6 languages (English, German, Spanish, French, Italian, Dutch)
- **Modern Tech Stack**: Next.js 15, React 19, TypeScript
- **Headless CMS**: Sanity.io for content management
- **Global CDN**: Cloudflare Enterprise integration
- **Image Optimization**: Cloudflare R2 storage
- **SEO Optimized**: Sitemap, robots.txt, structured data
- **Responsive Design**: Mobile-first approach
- **Type Safe**: Full TypeScript implementation

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Sanity.io account
- Cloudflare account (optional for deployment)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-global-platform
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env.local
```

4. Fill in your Sanity.io credentials in `.env.local`

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📁 Project Structure

```
ai-global-platform/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # Locale-specific pages
│   │   ├── api/               # API routes
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── layout/            # Layout components
│   │   ├── sections/          # Page sections
│   │   ├── forms/             # Form components
│   │   └── ui/                # UI components
│   ├── lib/                   # Utilities
│   │   ├── i18n/              # Internationalization
│   │   └── sanity/            # Sanity client
│   ├── sanity/               # Sanity schemas
│   └── styles/               # Global styles
├── messages/                  # Translation files
├── public/                    # Static assets
└── sanity.config.ts          # Sanity configuration
```

## 🌐 Internationalization

The platform supports 6 languages:
- English (en) - Default
- German (de)
- Spanish (es)
- French (fr)
- Italian (it)
- Dutch (nl)

Translation files are located in `/messages` directory.

## 📝 Sanity CMS Setup

1. Create a Sanity project at [sanity.io](https://sanity.io)
2. Install Sanity CLI: `npm install -g @sanity/cli`
3. Login to Sanity: `sanity login`
4. Initialize Sanity in your project (or use existing)

Content types available:
- Products (with multilingual support)
- Categories
- Pages
- Settings

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect to Vercel
3. Configure environment variables
4. Deploy

### Manual Build

```bash
npm run build
npm start
```

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run sanity` - Open Sanity Studio

## 📄 License

Private - All rights reserved
