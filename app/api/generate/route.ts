import { NextRequest, NextResponse } from 'next/server';
import { generateCode } from '@/app/services/geminiService';
import JSZip from 'jszip';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { prompt, deploymentPreference } = body;

    // Validate inputs
    if (!prompt) {
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

    // Prepare response with the zip file
    return new NextResponse(arrayBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${generatedCode.repositoryName}.zip"`,
      },
    });
  } catch (error) {
    console.error('Error generating code:', error);
    return NextResponse.json(
      { error: 'Failed to generate code', details: (error as Error).message },
      { status: 500 }
    );
  }
}

// Optional: Add a GET method for health check or documentation
export async function GET() {
  return NextResponse.json({
    status: 'available',
    description: 'API for generating MongoDB application code based on natural language prompts',
  });
}