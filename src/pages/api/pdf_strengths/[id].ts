import { PdfStrengthsService } from '@/lib/services/pdf_strengths';

export async function GET({ locals, params }) {
  const { DB } = locals.runtime.env;
  const { id } = params;
  const pdfStrengthsService = new PdfStrengthsService(DB);
  const all = await pdfStrengthsService.getAll();
  const pdfStrength = all.find((row) => String(row.id) === String(id));
  if (!pdfStrength) {
    return Response.json({ message: 'Not found' }, { status: 404 });
  }
  return Response.json({ pdf_strength: pdfStrength });
} 