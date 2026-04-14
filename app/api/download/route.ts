import { NextResponse } from 'next/server';
import AdmZip from 'adm-zip';
import path from 'path';
import fs from 'fs';

export async function GET() {
  try {
    const zip = new AdmZip();
    const rootDir = process.cwd();

    // Helper function to recursively add files, ignoring node_modules and .next
    const addDirectoryToZip = (dirPath: string, zipPath: string) => {
      const items = fs.readdirSync(dirPath);
      for (const item of items) {
        // Skip heavy/generated directories
        if (
          item === 'node_modules' || 
          item === '.next' || 
          item === '.git' || 
          item === 'dist' ||
          item.endsWith('.zip')
        ) {
          continue;
        }
        
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          addDirectoryToZip(fullPath, path.join(zipPath, item));
        } else {
          zip.addLocalFile(fullPath, zipPath);
        }
      }
    };

    addDirectoryToZip(rootDir, '');

    const zipBuffer = zip.toBuffer();

    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="tracera-polished-v2.zip"',
      },
    });
  } catch (error) {
    console.error('Error generating zip:', error);
    return new NextResponse('Error generating zip file', { status: 500 });
  }
}
