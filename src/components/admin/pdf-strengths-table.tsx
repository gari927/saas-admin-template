import * as React from 'react';

type PdfStrength = {
  id: number;
  file_name: string;
  [key: string]: any;
};

interface PdfStrengthsTableProps {
  data: PdfStrength[];
}

export function PdfStrengthsTable({ data }: PdfStrengthsTableProps) {
  const strengthHeaders = Array.from({ length: 34 }, (_, i) => `strength_${i + 1}`);

  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <th className="px-2 py-1 border-b">ID</th>
            {strengthHeaders.map((header, idx) => (
              <th key={header} className="px-2 py-1 border-b">{idx + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td className="px-2 py-1 border-b whitespace-nowrap">
                <a className="text-primary underline" href={`/admin/pdfs/${row.id}`}>{row.id}</a>
              </td>
              {strengthHeaders.map((header) => (
                <td key={header} className="px-2 py-1 border-b whitespace-nowrap">{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 