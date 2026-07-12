import { NextResponse } from 'next/server';
import { getSession } from '@/app/lib/auth-utils';
import { db } from '@/app/lib/db';
export const dynamic = 'force-dynamic';

export async function GET() {
  const session = getSession();

  if (!session || session.role !== "DIETITIAN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dietitianId = session.id;

  const [clientCount, mealPlanCount, todayAppointments, recentClients] = await Promise.all([
    db.client.count({ where: { dietitianId } }),

    db.mealPlan.count({
      where: { client: { dietitianId } },
    }),

    db.appointment.findMany({
      where: {
        dietitianId,
        dateTime: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      },
      include: { client: true },
      orderBy: { dateTime: 'asc' },
    }),

    db.client.findMany({
      where: { dietitianId },
      orderBy: { createdAt: 'desc' },
      take: 4,
    }),
  ]);

  return NextResponse.json({
    stats: {
      activeClients: clientCount,
      todayAppointments: todayAppointments.length,
      mealPlans: mealPlanCount,
    },
    appointments: todayAppointments.map((a) => ({
      id: a.id,
      name: a.client.name,
      time: new Date(a.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: a.status,
    })),
    recentClients: recentClients.map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email,
    })),
  });
}