# Canada-Trade-Intelligence-Assistant-CTIA

Canada Trade Intelligence Assistant (CTIA) - G7 GovAI Challenge Statement 4

A web-based assistant that provides trade intelligence and facilitates connections between Canadian businesses and international markets using AI-powered insights.

## Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** package manager
- **Google Gemini API Key** (for AI functionality)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Canada-Trade-Intelligence-Assistant-CTIA
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your Google Gemini API key:

```bash
GEMINI_API_KEY=your_api_key_here
```

## Launching the Project

### Development Mode

To start the development server:

```bash
npm run dev
```

The application will be available at:

- **Local:** http://localhost:3000
- **Network:** http://0.0.0.0:3000 (accessible from other devices on your network)

The dev server includes hot module replacement (HMR) for instant updates during development.

### Production Build

To build the project for production:

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
├── components/          # React components
├── datasets/            # Data files (exporters, trade commissioners)
├── services/            # Business logic and API services
├── index.html          # Main HTML template
├── index.tsx           # Application entry point
├── App.tsx             # Main React component
├── types.ts            # TypeScript type definitions
└── vite.config.ts      # Vite configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Technologies

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Google Gemini AI** - AI-powered intelligence
- **Recharts** - Data visualization
- **Lucide React** - Icon library
- **Tailwind CSS** - Styling (via CDN)

## Datasets

The application uses two main datasets located in the `datasets/` directory:

- `tfo_exporters_full.csv` - Canadian exporter database
- `trade_commissioners_index.json` - Trade Commissioner contact information

See `datasets/README.md` for detailed dataset descriptions.

## Troubleshooting

- **Port 3000 already in use:** Modify the port in `vite.config.ts` or use `npm run dev -- --port <port-number>`
- **API Key issues:** Ensure your `.env` file is in the root directory and contains a valid `GEMINI_API_KEY`
- **Build errors:** Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
