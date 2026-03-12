import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from './db';

const SESSION_MAX_AGE_DAYS = 30;

// Password hashing
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Session management
export async function createSession(userId: number): Promise<string> {
  const sessionId = uuidv4();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_MAX_AGE_DAYS);

  await prisma.sessions.create({
    data: {
      id: sessionId,
      user_id: userId,
      expires_at: expiresAt
    }
  });

  return sessionId;
}

export async function getSession(sessionId: string) {
  const session = await prisma.sessions.findUnique({
    where: { id: sessionId },
    include: { users: true }
  });

  if (!session) return null;

  // Check if expired
  if (new Date() > session.expires_at) {
    await prisma.sessions.delete({ where: { id: sessionId } });
    return null;
  }

  return {
    id: session.users.id,
    email: session.users.email,
    full_name: session.users.full_name,
    phone: session.users.phone,
    role: session.users.role
  };
}

export async function deleteSession(sessionId: string): Promise<void> {
  await prisma.sessions.deleteMany({ where: { id: sessionId } });
}

export async function cleanExpiredSessions(): Promise<void> {
  await prisma.sessions.deleteMany({
    where: {
      expires_at: { lt: new Date() }
    }
  });
}
