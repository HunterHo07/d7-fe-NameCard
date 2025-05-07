Visit: https://hunterho07.github.io/d7-fe-NameCard

# NameCard Demo

This is a demo of the NameCard digital business card platform built with Next.js, featuring advanced animations using GSAP, Lottie, and Three.js.

## Features

- Interactive 3D business card visualization
- Animated transitions and micro-interactions
- QR code generation for sharing
- AR preview of how the card appears in augmented reality
- Responsive design for all device types

## Tech Stack

- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **Animations**:
  - GSAP for page transitions and animations
  - Lottie for micro-interactions
  - Three.js for 3D elements
- **Development**: TypeScript for type safety

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+

### Installation

1. Clone the repository
2. Navigate to the demo directory
3. Install dependencies:

```bash
bun install
```

### Running the Development Server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
bun run build
```

## Project Structure

```
demo/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js app router
│   ├── components/      # Reusable UI components
│   ├── styles/          # Additional CSS styles
│   ├── lib/             # Utility functions
│   └── assets/          # Static assets like images and animations
└── ...config files
```

## Troubleshooting

### Common Issues

1. **Animations not working properly**:
   - Make sure you have the latest version of the browser
   - Check if JavaScript is enabled
   - Try clearing your browser cache

2. **3D rendering issues**:
   - Ensure your device supports WebGL
   - Update your graphics drivers
   - Try using a different browser

3. **Build errors**:
   - Delete the `.next` folder and try rebuilding
   - Make sure all dependencies are installed correctly
   - Check for TypeScript errors with `bun run typecheck`

## Creator

- Hunter Ho
