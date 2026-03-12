// PLACE AT: src/routes/account/+page.server.ts (same folder as account +page.svelte)

import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(302, '/auth/login?redirect=/account');
  }

  return {
    user: locals.user
  };
};