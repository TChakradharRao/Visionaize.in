/* eslint-disable prettier/prettier */
export type Enquiry = {
  id: number;
  name: string;
  company?: string;
  phone?: string;
  email?: string;
  sourcePage?: string;
  provider?: string;
  formId?: string | number;
  submittedAt: string;
  message?: string;
};

export const seedEnquiries: Enquiry[] = [
  {
    id: 61,
    name: 'Jorge',
    company: 'Cleaning California',
    phone: '4085474250',
    email: 'jorge@cleanerinca.com',
    sourcePage: '/request-a-demo',
    provider: 'cf7',
    formId: 1834,
    submittedAt: '2026-07-09T11:35:10',
    message: 'Interested in a demo',
  },
  {
    id: 60,
    name: 'Danielle',
    company: 'Demandvistaprox',
    phone: '2125550147',
    email: 'danielle.foster@demandvistaprox.com',
    sourcePage: '/contact',
    provider: 'cf7',
    formId: 1834,
    submittedAt: '2026-06-23T15:23:56',
    message: 'Please send whitepaper',
  },
  {
    id: 59,
    name: 'test',
    company: 'test',
    email: 'test@test.com',
    sourcePage: '/whitepaper/cement',
    provider: 'cf7',
    formId: 2716,
    submittedAt: '2026-06-16T10:40:28',
  },
];
