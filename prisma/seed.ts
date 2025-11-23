import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create subscription plans
  const basicPlan = await prisma.subscriptionPlan.upsert({
    where: { name: 'BASIC' },
    update: {},
    create: {
      name: 'BASIC',
      priceLei: 600,
      creditUnits: 800,
      weekendLimit: 0,
      canBookNight: false,
      advanceBookingDays: 7,
      description: 'Plan de bază pentru rezervări Luni-Joi',
    },
  })

  const standardPlan = await prisma.subscriptionPlan.upsert({
    where: { name: 'STANDARD' },
    update: {},
    create: {
      name: 'STANDARD',
      priceLei: 750,
      creditUnits: 1000,
      weekendLimit: 2,
      canBookNight: true,
      advanceBookingDays: 7,
      description: 'Plan standard cu acces weekend limitat',
    },
  })

  const premiumPlan = await prisma.subscriptionPlan.upsert({
    where: { name: 'PREMIUM' },
    update: {},
    create: {
      name: 'PREMIUM',
      priceLei: 900,
      creditUnits: 1200,
      weekendLimit: null,
      canBookNight: true,
      advanceBookingDays: 14,
      description: 'Plan premium cu acces nelimitat',
    },
  })

  console.log('Plans created:', { basicPlan, standardPlan, premiumPlan })

  // Create admin user (optional)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@studiobooking.ro' },
    update: {},
    create: {
      email: 'admin@studiobooking.ro',
      passwordHash: '$2b$10$YourHashedPasswordHere', // Change this!
      role: 'ADMIN',
    },
  })

  console.log('Admin user created:', adminUser)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
