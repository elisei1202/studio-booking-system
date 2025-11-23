import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const admin = getUserFromRequest(request);
    if (!admin || admin.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Acces interzis - doar admin' }, { status: 403 });
    }

    const { userId, isBlocked } = await request.json();

    if (!userId || typeof isBlocked !== 'boolean') {
      return NextResponse.json(
        { error: 'ID utilizator și status blocare sunt obligatorii' },
        { status: 400 }
      );
    }

    // Update user block status
    await prisma.user.update({
      where: { id: userId },
      data: { isBlocked },
    });

    return NextResponse.json({
      message: isBlocked
        ? 'Utilizator blocat cu succes'
        : 'Utilizator deblocat cu succes',
    });
  } catch (error) {
    console.error('Block user error:', error);
    return NextResponse.json(
      { error: 'A apărut o eroare la blocarea utilizatorului' },
      { status: 500 }
    );
  }
}
