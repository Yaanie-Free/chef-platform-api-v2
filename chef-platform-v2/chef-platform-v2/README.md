# Table & Plate

A luxury private chef discovery platform connecting customers with private chefs in South Africa.

**Dark-First Design**: This application uses a pure black (#000000) background with elegant pink/rose gradients, following a luxury aesthetic with smooth rounded edges and the Futura typeface.

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
npm run build
npm start
```

## Deployment

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to GitHub
2. Import your repository on Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Click "Deploy"

### Environment Variables

If you're using Supabase or other services, create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Project Structure

```
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── chef-dashboard/ # Chef dashboard components
│   └── ...             # Other components
├── pages/              # Next.js pages
│   ├── _app.tsx        # App wrapper
│   ├── _document.tsx   # Document wrapper
│   └── index.tsx       # Home page
├── styles/             # Global styles
│   └── globals.css     # Global CSS with Tailwind
└── public/             # Static files
```

## Features

- Chef discovery with horizontal scrolling
- Advanced filtering (location, price, cuisine, event type, guest count)
- Customer and chef signup flows
- Chef dashboard for managing profiles and bookings
- Real-time chat functionality
- Review and rating system
- Responsive design with dark theme
- British English throughout

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Database**: Supabase (optional)

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Supabase](https://supabase.com/docs)
