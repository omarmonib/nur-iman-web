import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_AZKAR_API: z.string().url().optional(),
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_AZKAR_API: process.env.NEXT_PUBLIC_AZKAR_API,
});

if (!parsed.success) {
  console.error('[env] Invalid environment variables:');
  console.error(parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables — see above for details.');
}

export const env = parsed.data;
