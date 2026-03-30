import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'assets', 'CV_MEDENOU_Gilles.pdf');
    console.log('[CV] 📥 Téléchargement demandé →', filePath);

    const fileBuffer = await readFile(filePath);

    console.log('[CV] ✅ Fichier trouvé, envoi en cours...');
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="CV_MEDENOU_Gilles.pdf"',
        'Content-Length': fileBuffer.byteLength.toString(),
      },
    });
  } catch (err) {
    console.error('[CV] ❌ Fichier introuvable →', err);
    return NextResponse.json({ error: 'CV non disponible' }, { status: 404 });
  }
}
