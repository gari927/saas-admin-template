export type PdfStrength = {
  id: number;
  file_name: string;
  [key: string]: any;
};

export class PdfStrengthsService {
  private DB: D1Database;

  constructor(DB: D1Database) {
    this.DB = DB;
  }

  async getAll(): Promise<PdfStrength[]> {
    const query = `SELECT * FROM pdf_strengths ORDER BY id ASC`;
    const response = await this.DB.prepare(query).all();
    if (response.success) {
      return response.results as PdfStrength[];
    }
    return [];
  }

  async count(): Promise<number> {
    const query = `SELECT COUNT(*) as count FROM pdf_strengths`;
    const response = await this.DB.prepare(query).all();
    if (response.success && response.results.length > 0) {
      return Number(response.results[0].count);
    }
    return 0;
  }
} 