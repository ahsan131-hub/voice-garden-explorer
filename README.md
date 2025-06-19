# Voice Garden Explorer

A modern web application for exploring and testing speech synthesis voices in your browser. Discover all available voices, filter by language, and play demos to find the perfect voice for your needs.

## Features

- **Voice Discovery**: Browse all available speech synthesis voices in your browser
- **Language Filtering**: Filter voices by language and region
- **Search Functionality**: Search voices by name or language
- **Live Demos**: Test voices with custom text input
- **Voice Information**: View detailed information about each voice including language, region, and service type
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd voice-garden-explorer
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. **Browse Voices**: The application will automatically load all available speech synthesis voices in your browser
2. **Search & Filter**: Use the search bar to find specific voices or filter by language
3. **Test Voices**: Enter custom text in the demo area and click the play button on any voice card
4. **Stop Playback**: Use the "Stop All Speech" button to halt any currently playing voice

## Browser Compatibility

This application uses the Web Speech API, which is supported in most modern browsers:

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

Note: Voice availability may vary by browser and operating system.

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Shadcn/ui** - UI components
- **Web Speech API** - Speech synthesis

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please open an issue on the repository.
