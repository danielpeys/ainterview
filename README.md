# Ainterview

![Ainterview Logo](static\images\logo.svg)

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-Dependencies)
- [Getting Started - Setup](#getting-started---setup)
- [Contributing](#contributing)
- [License](#license)

Ainterview is a web application built with SvelteKit that helps you prepare for job interviews. It takes job description input either by text or via a URL and presents you with interview questions based on the job requirements. You can answer the questions using text input or by speaking, and you will receive an evaluation of your answers after each question.

## Features

Ainterview offers the following key features:

1. **Job Description Analysis:** Provide a job description either by entering text or providing a URL, and Ainterview will analyze the job requirements to generate relevant interview questions. Please note that the current version of Ainterview only supports LinkedIn, Xing and Stepstone job descriptions for URL analysis.

2. **Interactive Answers:** Answer interview questions using either text input or speech recognition. Ainterview provides a user-friendly interface to input your responses.

3. **Answer Evaluation:** Ainterview evaluates your responses based on various criteria, such as clarity, relevance, and language proficiency.

4. **Personalized Recommendations:** Based on your performance, Ainterview provides personalized recommendations on areas for improvement.

These features aim to provide an interactive and personalized interview preparation experience, helping you boost your confidence and enhance your performance during job interviews.

## Prerequisites

Before running the project, make sure you have the following prerequisites:

- Node.js
- OpenAI API key for accessing the AI models developed by OpenAI.
- A code editor such as Visual Studio Code

## Dependencies

This project utilizes the following libraries and resources:

- [Cheerio](https://github.com/cheeriojs/cheerio) - Library for parsing and manipulating HTML/XML.
- [LottieFiles](https://lottiefiles.com/) - Online library for animated icons.
- [Lordicon](https://lordicon.com/) - Animated icon library.
- [SVG Repo](https://www.svgrepo.com/) - Collection of free SVG icons.

Make sure to check the documentation and licenses of each library and resource for more information on how to use them in your project.

## Dev Dependencies

The project utilizes the following dev dependencies:

- [@sveltejs/adapter-auto](https://www.npmjs.com/package/@sveltejs/adapter-auto): SvelteKit adapter for automatic deployment.
- [@sveltejs/kit](https://www.npmjs.com/package/@sveltejs/kit): SvelteKit framework for building web applications.
- [svelte](https://www.npmjs.com/package/svelte): JavaScript framework for building user interfaces.
- [svelte-check](https://www.npmjs.com/package/svelte-check): Tool for checking Svelte project files.
- [tslib](https://www.npmjs.com/package/tslib): Runtime library for TypeScript.
- [typescript](https://www.npmjs.com/package/typescript): TypeScript language support for JavaScript.
- [vite](https://www.npmjs.com/package/vite): Next-generation frontend tooling.

These dev dependencies are used during the development process and are not required for running the production version of the application.

## Getting Started - Setup

To set up the project, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/your-username/ainterview.git
   ```

2. Navigate to the project folder:

   ```
   cd ainterview
   ```

3. Create a .env file in the project folder and add the following values:

   ```
   # OPEN_AI_KEY is the API key for OpenAI.
   OPEN_AI_KEY=<your-openai-key>

   # PUBLIC_URL is the URL for the application, usually set to http://127.0.0.1:5173/ when running locally.
   PUBLIC_URL=http://127.0.0.1:5173/
   ```

4. Install dependencies:

   ```
   npm install
   ```

5. Run the development server:

   ```
   npm run dev
   ```

6. Open your browser and visit http://127.0.0.1:5173/ to use the application.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
