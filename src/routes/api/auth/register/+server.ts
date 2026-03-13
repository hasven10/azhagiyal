
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/db';
import { hashPassword, createSession } from '$lib/server/auth';

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const { full_name, email, phone, password } = await request.json();

    // Validate input
    if (!full_name || !email || !password) {
      return json({ error: 'Name, email, and password are required.' }, { status: 400 });
    }

    if (password.length < 8) {
      return json({ error: 'Password must be at least 8 characters.' }, { status: 400 });
    }

    // Check if email already exists
    const existing = await prisma.users.findUnique({ where: { email } });
    if (existing) {
      return json({ error: 'An account with this email already exists.' }, { status: 409 });
    }

    // Create user
    const password_hash = await hashPassword(password);
    const user = await prisma.users.create({
      data: {
        full_name,
        email,
        phone: phone || null,
        password_hash,
        role: 'customer'
      }
    });

    // Create session
    const sessionId = await createSession(user.id);

    // Set cookie
    const secure = process.env.NODE_ENV === 'production';
    cookies.set('session_id', sessionId, {
      path: '/',
      httpOnly: true,
      secure,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    });

    return json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    return json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
};