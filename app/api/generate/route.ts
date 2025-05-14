import { NextRequest, NextResponse } from 'next/server';
import { generateCode } from '@/app/services/geminiService';
import JSZip from 'jszip';

export async function POST(request: NextRequest) {
  // Define prompt outside the try block to make it accessible in catch
  let prompt: string | undefined;
  let deploymentPreference: string | undefined;
  
  try {
    // Parse the request body
    const body = await request.json();
    prompt = body.prompt;
    deploymentPreference = body.deploymentPreference;

    // Log the user query for monitoring
    console.log(`[${new Date().toISOString()}] [INFO] User query: "${prompt?.substring(0, 100) || ''}${prompt && prompt.length > 100 ? '...' : ''}"${deploymentPreference ? `, deployment: ${deploymentPreference}` : ''}`);

    // Validate inputs
    if (!prompt) {
      console.log(`[${new Date().toISOString()}] [ERROR] Validation failed: Missing prompt parameter`);
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Generate code using the Gemini service
    const generatedCode = await generateCode({ 
      prompt, 
      deploymentPreference 
    });

    // Create a ZIP file containing all generated files
    const zip = new JSZip();

    // Add files to the ZIP
    for (const file of generatedCode.files) {
      zip.file(file.path, file.content);
    }

    // Generate the ZIP blob
    const zipBlob = await zip.generateAsync({ type: 'blob' });

    // Convert blob to ArrayBuffer for response
    const arrayBuffer = await zipBlob.arrayBuffer();

    // Log successful code generation
    console.log(`[${new Date().toISOString()}] [SUCCESS] Code generated: "${prompt?.substring(0, 50) || ''}${prompt && prompt.length > 50 ? '...' : ''}" (${generatedCode.repositoryName}.zip)`);

    // Prepare response with the zip file
    return new NextResponse(arrayBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${generatedCode.repositoryName}.zip"`,
      },
    });
  } catch (error) {
    console.error('Error generating code:', error);
    // Log the error with query information
    console.log(`[${new Date().toISOString()}] [ERROR] Code generation failed: "${prompt?.substring(0, 50) || 'unknown'}${prompt && prompt.length > 50 ? '...' : ''}" - ${(error as Error).message}`);
    
    return NextResponse.json(
      { error: 'Failed to generate code', details: (error as Error).message },
      { status: 500 }
    );
  }
}

// Optional: Add a GET method for health check or documentation
export async function GET() {
  console.log(`[${new Date().toISOString()}] [INFO] Health check requested`);
  return NextResponse.json({
    status: 'available',
    description: 'API for generating MongoDB application code based on natural language prompts',
  });
}