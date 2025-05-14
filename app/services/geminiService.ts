import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with the API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export interface GenerateCodeParams {
  prompt: string;
  deploymentPreference?: string;
}

export interface GeneratedCode {
  repositoryName: string;
  files: Array<{
    path: string;
    content: string;
  }>;
}

export async function generateCode({ prompt, deploymentPreference }: GenerateCodeParams): Promise<GeneratedCode> {
  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    // Construct the prompt for code generation
    const fullPrompt = `
      Generate a complete application based on the following description:
      
      "${prompt}"
      
      ${deploymentPreference ? `The user prefers to deploy with: ${deploymentPreference}` : ''}
      
      Requirements:
      1. Use MongoDB as the primary database
      2. Make the app runnable locally with minimal setup
      3. Include a .env file template for MongoDB connection string configuration
      4. Include a clear README.md with setup and running instructions
      5. Ensure all necessary files for a complete, functional application are included
      6. Keep the code simple, clean, and well-documented
      7. Format the response as a JSON object with the following structure:
         {
           "repositoryName": "a-short-descriptive-name",
           "files": [
             { 
               "path": "relative/file/path", 
               "content": "file content as string" 
             },
             ...
           ]
         }
      
      Important: All generated code must use MongoDB for data storage. Include proper error handling for database operations.
    `;

    // Generate content using the model
    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    const text = response.text();
    
    // Parse the JSON response
    try {
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
      const jsonString = jsonMatch ? jsonMatch[1] : text;
      
      // Remove any final newlines or trailing commas that might break JSON parsing
      const cleanedJsonString = jsonString.trim().replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
      
      const generatedCode: GeneratedCode = JSON.parse(cleanedJsonString);
      return generatedCode;
    } catch (jsonError) {
      console.error('Failed to parse JSON response:', jsonError);
      throw new Error('Failed to parse the generated code response');
    }
  } catch (error) {
    console.error('Error generating code:', error);
    throw error;
  }
}