/* eslint-disable prettier/prettier */
export type MappedForm = {
  provider: string;
  formName: string;
  id: number;
  mappedFields: number;
  lastUpdated: string;
};

export const seedMappedForms: MappedForm[] = [
  { provider: 'Contact Form 7', formName: 'Contact form 1', id: 1834, mappedFields: 4, lastUpdated: '2026-03-05T08:57:00' },
  { provider: 'Contact Form 7', formName: 'White paper', id: 2716, mappedFields: 3, lastUpdated: '2026-03-05T08:56:21' },
  { provider: 'Contact Form 7', formName: 'Request a Demo', id: 13246, mappedFields: 4, lastUpdated: '2026-03-05T08:16:47' },
  { provider: 'Contact Form 7', formName: 'Power & energy form', id: 3155, mappedFields: 4, lastUpdated: '2026-03-05T08:55:09' },
];

export type ColumnDef = { key: string; label: string; type: 'text' | 'number' | 'date'; enabled: boolean };

export const seedColumns: ColumnDef[] = [
  { key: 'name', label: 'Name', type: 'text', enabled: true },
  { key: 'company', label: 'Company', type: 'text', enabled: true },
  { key: 'phone', label: 'Phone', type: 'text', enabled: true },
  { key: 'email', label: 'Email', type: 'text', enabled: true },
];
