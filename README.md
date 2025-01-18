<img src="./src/assets/game-overview-pic.png" alt="game overview picture" width="30%" />

# Table of Contents

1. 📜 [Overview](#overview)
2. ▶️ [Get Started](#getstarted)
3. 🧰 [Tech Stack](#tech-stack)
4. 🔋 [Features](#features)
5. 🚀 [Next Steps](#next-steps)
6. ➕ [More](#more)
7. 🏷️ [Footer](#footer)

# 📜 <a name="overview">Overview</a>

A React-based vanishing man (similar to hangman) game using computer science terms.

# ▶️ <a name="getstarted">Get Started</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**
Not Applicable for this repo

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the project.

# 🧰 <a name="tech-stack">Tech Stack</a>

- React
- Vite
- TailwindCSS
- Shadcn/ui

# 🔋 <a name="features">Features</a>

# 🚀 <a name="next-steps">Next Steps</a>

- [ ] **Update terms that contain multiple words:** These terms have to be separated by space to indicate that this is a multiple word term.
- [ ] **Guessed terms bottom pop up:** The words that the user guessed should appear at the bottom as mini cards where on click they flip to display the definition.
- [ ] **Record Username and Last Score:** These can be then display on the welcome page as the top 3 highest guessed score. Example: packman game machines scores.

# ➕ <a name="more">More</a>

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

# 🏷️ <a name="footer">Footer</a>

Created by Gi Diaz (Full Stack Software Engineer) - 2025
