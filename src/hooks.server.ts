import type { Handle } from '@sveltejs/kit';
import { getSession } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get('session_id');

  if (sessionId) {
    const user = await getSession(sessionId);
    event.locals.user = user as App.Locals['user'];
  } else {
    event.locals.user = null;
  }

  const response = await resolve(event);
  return response;
};
