import z from "zod";

const EnvSchema = z.object({
  VITE_BASE_URL: z.string(),
  VITE_WS_URL: z.string(),
});

const env = EnvSchema.safeParse(import.meta.env);

if (!env.success) {
  console.error("Invalid environment variables:", env.error.format());
  throw new Error("Invalid environment variables: " + env.error.format());
}

export const envs = env.data;
