// See https://svelte.dev/docs/kit/types#app.d.ts
declare global {
  namespace App {
    interface Locals {
      user: {
        id: number;
        email: string;
        full_name: string;
        phone: string | null;
        role: string | null;
      } | null;
    }
  }

  var __prisma: import('@prisma/client').PrismaClient;
}

export {};
