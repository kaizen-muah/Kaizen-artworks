import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  projectType: z.enum(['commission', 'character-design', 'fan-art', 'other'], {
    message: 'Please select a project type',
  }),
  budget: z.enum(['under-50', '50-150', '150-300', '300-plus'], {
    message: 'Please select a budget range',
  }),
  deadline: z.string().min(1, 'Please provide a deadline or timeframe'),
  description: z.string().min(20, 'Please describe your project in at least 20 characters'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
