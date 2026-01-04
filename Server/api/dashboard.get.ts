// ไฟล์: server/api/dashboard.get.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0) // ตัดเวลาให้เป็นเที่ยงคืน

  // 1. นับพนักงานทั้งหมด
  const totalEmp = await prisma.employee.count()

  // 2. นับคนที่มาทำงานวันนี้
  const presentToday = await prisma.attendance.count({
    where: { clockIn: { gte: today } }
  })

  // 3. รวมเงินเดือนทั้งหมด
  const salarySum = await prisma.employee.aggregate({
    _sum: { salary: true }
  })

  // 4. นับพนักงานใหม่เดือนนี้
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const newEmp = await prisma.employee.count({
    where: { createdAt: { gte: startOfMonth } }
  })

  return {
    totalEmp,
    presentToday,
    totalSalary: salarySum._sum.salary || 0,
    newEmp
  }
})