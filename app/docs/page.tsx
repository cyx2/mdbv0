// API Documentation Page
// This page provides documentation for the MongoDB v0 API

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MongoDB v0 API Documentation',
  description: 'Documentation for the MongoDB v0 code generation API',
};

export default function DocsPage() {
  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-4">MongoDB v0 API Documentation</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Documentation for the MongoDB v0 code generation API
        </p>
      </header>

      <main className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">API Endpoints</h2>
          
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Generate Code</h3>
            <p className="mb-4"><code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">POST /api/generate</code></p>
            
            <h4 className="font-semibold mb-2">Request Body</h4>
            <pre className="bg-gray-200 dark:bg-gray-700 p-4 rounded overflow-x-auto mb-4">
{`{
  "prompt": "Description of the application you want to generate",
  "deploymentPreference": "Optional deployment method (e.g., 'Next.js on Vercel')"
}`}
            </pre>
            
            <h4 className="font-semibold mb-2">Response</h4>
            <p className="mb-2">The API returns a ZIP file containing all the generated code files.</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Content-Type: application/zip<br />
              Content-Disposition: attachment; filename="repository-name.zip"
            </p>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Integration Examples</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">JavaScript/TypeScript</h3>
            <pre className="bg-gray-200 dark:bg-gray-700 p-4 rounded overflow-x-auto">
{`async function generateCode(prompt, deploymentPreference) {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      deploymentPreference,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to generate code');
  }

  // Handle the ZIP file
  const blob = await response.blob();
  return blob;
}`}
            </pre>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Rate Limiting</h2>
          <p>
            To ensure fair usage, this API implements rate limiting. Please be mindful of your usage.
          </p>
        </section>
      </main>
    </div>
  );
}
