# Snake Loop Game 🐍

A classic Snake game implementation with a modern twist, built with React, TypeScript, and HTML5 Canvas.

## Features

- 🎮 Smooth snake movement and keyboard controls
- 🧠 Collision detection with self and boundaries
- 🏆 Score tracking with real-time updates
- 🔁 Looping map for endless gameplay (snake can exit one side and reappear on the opposite side)
- 📱 Responsive layout for mobile and desktop
- ⚛️ Built with modern React (v18+), using hooks and functional components
- 🧩 Modular, component-based architecture
- 🖼️ HTML5 Canvas rendering for efficient performance
- 🧪 Easy to test and extend with TypeScript typings
- 🔄 Game restart/reset functionality
- 🌗 Dark mode support (optional)
- 🔧 Easy configuration for grid size, speed, and difficulty

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- React.js (v18 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/snake-loop-game.git
   cd snake-loop-game
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to play the game.

## Scripts

- `npm run dev` — Starts the development server
- `npm run build` — Builds the production-ready app
- `npm run start` — Serves the built app
- `npm run lint` — Runs ESLint for code quality
- `npm run format` — Formats code using Prettier

## Project Structure

```
/src
├── components       # Reusable UI components (GameBoard, ScoreBoard, etc.)
├── hooks            # Custom React hooks for game logic
├── utils            # Utility functions (e.g., collision detection, movement logic)
├── types            # TypeScript interfaces and types
├── assets           # Images, sounds, or other media
├── styles           # CSS or styled-components
└── App.tsx          # Root component
```

## Customization

You can easily customize the game by tweaking the configuration options:

- Grid size
- Initial snake length
- Game speed
- Scoring logic
- Theme colors

These settings can be found in the `constants.ts` or `config.ts` file.

## Future Improvements

- 🧩 Power-ups and obstacles
- 🌍 Multiplayer mode
- 📈 Leaderboard integration
- 💾 Persistent high score with localStorage or backend
- 🎵 Sound effects and background music
- 🎮 Gamepad support

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repo
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a pull request

## License

MIT © [Your Name]

---

Made with ❤️ using React + TypeScript + Canvas
