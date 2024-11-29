import { z } from "my-custom-name";

export const LoginValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});



export const SignupValidation = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});
