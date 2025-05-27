import { PdfStrengthsService } from '@/lib/services/pdf_strengths';

export async function GET({ locals }) {
  const { DB } = locals.runtime.env;
  const pdfStrengthsService = new PdfStrengthsService(DB);
  const pdfStrengths = await pdfStrengthsService.getAll();
  return Response.json({ pdf_strengths: pdfStrengths });
} 