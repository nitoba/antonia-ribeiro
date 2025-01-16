# README.md

# Astro Project

This project is built using Astro, a modern static site generator that allows you to create fast and optimized websites.

## Features

The project includes a reusable component named `FeatureCard`, which is used to display various features of the application. Each feature card consists of an image, title, description, and a link for more information.

### File Structure

```
astro-project
├── src
│   ├── components
│   │   ├── FeatureCard.astro
│   └── pages
│       └── features.astro
├── public
├── package.json
└── README.md
```

### Components

- **FeatureCard.astro**: This component accepts the following props:
  - `imageSrc`: The source URL of the feature image.
  - `title`: The title of the feature.
  - `description`: A brief description of the feature.
  - `link`: The URL to learn more about the feature.

### Pages

- **features.astro**: This page imports the `FeatureCard` component and renders multiple feature cards by passing data through props. The data is organized in an array to facilitate looping and avoid duplication.

## Installation

To get started with this project, clone the repository and install the dependencies:

```bash
npm install
```

## Usage

To run the project locally, use the following command:

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser to see the application in action.

## License

This project is licensed under the MIT License.