import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  try {
    const logs = await prisma.attendance.findMany({
      take: 20,                       // ดึง 20 รายการล่าสุด
      orderBy: { clockIn: 'desc' },   // เรียงจากใหม่ไปเก่า
      include: {
        employee: true                // ดึงข้อมูลพนักงานมาด้วย
      }
    })

    // แปลง Date เป็น String เพื่อกันปัญหา Frontend อ่านไม่ออก
    return logs.map(log => ({
      ...log,
      clockIn: log.clockIn.toISOString(),
      clockOut: log.clockOut ? log.clockOut.toISOString() : null
    }))
  } catch (e: any) {
    // ถ้า Error ให้โยน 500 ออกไป
    throw createError({
      statusCode: 500,
      statusMessage: 'Database Error: ' + e.message
    })
  }
})