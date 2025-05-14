# MongoDB v0

An AI-powered tool that generates MongoDB application code from natural language descriptions. This tool enables users to quickly scaffold a new project by describing what they want to build, and receive a complete, runnable codebase that uses MongoDB for data persistence.

## Features

- **Prompt-Based Generation**: Describe your application in natural language
- **MongoDB Integration**: All generated applications use MongoDB as their database
- **Local Runnability**: Generated code is structured to run locally with minimal setup
- **Deployment Preference Support**: Specify your preferred deployment method for tailored instructions
- **Complete Application Structure**: Get a ready-to-use codebase with all necessary files

## Getting Started

### Prerequisites

- Node.js 18.x or later
- A Gemini API key (for AI code generation)

### Installation

1. Clone this repository:

```bash
git clone https://github.com/yourusername/mongodbv0.git
cd mongodbv0
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env.local` file based on the example:

```bash
cp .env.local.example .env.local
```

4. Edit the `.env.local` file and add your Gemini API key:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

### Running the Application

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to access the MongoDB v0 tool.

## How to Use

1. Enter a description of the application you want to build in the provided form
2. Optionally specify your preferred deployment method
3. Click "Generate MongoDB Application"
4. Download the generated ZIP file
5. Extract the ZIP file to your local machine
6. Follow the instructions in the generated README.md to set up and run your application

## Deployment

The MongoDB v0 tool itself can be deployed on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fmongodbv0)

Remember to set the `GEMINI_API_KEY` environment variable in your Vercel project settings.

## License

[MIT](LICENSE)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
