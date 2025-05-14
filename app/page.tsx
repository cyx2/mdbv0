"use client";

import { useState } from "react";
import { saveAs } from "file-saver";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [deploymentPreference, setDeploymentPreference] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError("Please enter a description of your application");
      return;
    }

    setIsGenerating(true);
    setError("");
    
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          deploymentPreference: deploymentPreference.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate code");
      }

      // Get the blob from the response
      const blob = await response.blob();
      
      // Extract filename from Content-Disposition header if available
      const contentDisposition = response.headers.get("Content-Disposition");
      const filenameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"/);
      const filename = filenameMatch ? filenameMatch[1] : "mongodb-app.zip";
      
      // Save the blob as a file
      saveAs(blob, filename);
      
    } catch (err) {
      console.error("Error generating code:", err);
      setError((err as Error).message || "Failed to generate code");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <header className="flex flex-col gap-2 items-center mb-10 mt-8">
        <div className="mb-4">
          <h1 className="text-3xl font-bold">MongoDB v0</h1>
        </div>
        <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl">
          Generate example MongoDB application code from a natural language description.
          Get started with functional code that's ready to run locally or in the cloud.
        </p>
      </header>

      <main className="flex flex-col gap-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="prompt" className="font-medium">
              Describe your application
            </label>
            <textarea
              id="prompt"
              className="min-h-32 p-3 border rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              placeholder="Example: A blog application with posts and comments, where users can create accounts, write blog posts, and comment on other posts."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="deploymentPreference" className="font-medium">
              Preferred deployment method (optional)
            </label>
            <input
              id="deploymentPreference"
              type="text"
              className="p-3 border rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              placeholder="Example: Next.js on Vercel, Express on Heroku, etc."
              value={deploymentPreference}
              onChange={(e) => setDeploymentPreference(e.target.value)}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-md">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isGenerating}
            className="py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-md flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              "Generate MongoDB Application"
            )}
          </button>
        </form>
      </main>

      <footer className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          MongoDB v0 - AI-powered code generation tool for MongoDB applications
        </p>
      </footer>
    </div>
  );
}
