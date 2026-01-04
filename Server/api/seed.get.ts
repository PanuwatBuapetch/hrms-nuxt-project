import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default defineEventHandler(async () => {
  // ลบข้อมูลเก่าทิ้งก่อนกันซ้ำ (ถ้ามี)
  await prisma.employee.deleteMany({ where: { email: 'admin@hrms.com' } })

  return await prisma.employee.create({
    data: {
      firstName: 'Super',
      lastName: 'Admin',
      email: 'admin@hrms.com', // อีเมลนี้
      username: 'admin',
      password: '1234',
      role: 'admin',
      status: 'active'
    }
  })
})