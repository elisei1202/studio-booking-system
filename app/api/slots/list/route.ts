import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';
import { DAY_SLOTS } from '@/lib/slots';
import { startOfDay, endOfDay } from 'date-fns';

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Neautorizat' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const dateStr = searchParams.get('date');

    if (!dateStr) {
      return NextResponse.json({ error: 'Data este obligatorie' }, { status: 400 });
    }

    const date = new Date(dateStr);
    const dayStart = startOfDay(date);
    const dayEnd = endOfDay(date);

    // Get all reservations for this day
    const reservations = await prisma.reservation.findMany({
      where: {
        date: {
          gte: dayStart,
          lte: dayEnd,
        },
        status: 'CONFIRMED',
      },
    });

    // Mark slots as available or booked
    const availableSlots = DAY_SLOTS.map(slot => {
      const isBooked = reservations.some(
        r => r.slotId === slot.id && r.type === 'DAY_SLOT'
      );
      return {
        ...slot,
        available: !isBooked,
      };
    });

    // Check if night is booked
    const nightBooked = reservations.some(r => r.type === 'NIGHT');

    return NextResponse.json({
      date: dateStr,
      slots: availableSlots,
      nightAvailable: !nightBooked,
    });
  } catch (error) {
    console.error('Slots list error:', error);
    return NextResponse.json(
      { error: 'A apărut o eroare la listarea sloturilor' },
      { status: 500 }
    );
  }
}
