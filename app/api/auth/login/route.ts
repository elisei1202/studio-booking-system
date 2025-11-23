import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { comparePassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email și parola sunt obligatorii' },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Email sau parolă incorectă' },
        { status: 401 }
      );
    }

    // Check if user is blocked
    if (user.isBlocked) {
      return NextResponse.json(
        { error: 'Contul tău a fost blocat. Te rugăm să contactezi suportul.' },
        { status: 403 }
      );
    }

    // Verify password
    const isValid = await comparePassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Email sau parolă incorectă' },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return NextResponse.json({
      message: 'Autentificare reușită',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'A apărut o eroare la autentificare' },
      { status: 500 }
    );
  }
}
