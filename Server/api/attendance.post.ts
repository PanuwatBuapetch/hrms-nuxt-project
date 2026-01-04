// ไฟล์: server/api/attendance.post.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { employeeId, type } = body // type = 'check-in' หรือ 'check-out'

  if (type === 'check-in') {
    // 1. ลงเวลาเข้า: สร้างแถวใหม่
    // (เช็คก่อนว่าวันนี้เข้าหรือยัง กันกดซ้ำ)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const existing = await prisma.attendance.findFirst({
      where: {
        employeeId: employeeId,
        clockIn: { gte: today } // หาข้อมูลตั้งแต่วันนี้ 00:00
      }
    })

    if (existing) {
      throw createError({ statusCode: 400, message: 'วันนี้คุณลงเวลาเข้างานไปแล้วครับ!' })
    }

    return await prisma.attendance.create({
      data: {
        employeeId: employeeId,
        clockIn: new Date(),
        status: 'present'
      }
    })

  } else if (type === 'check-out') {
    // 2. ลงเวลาออก: อัปเดตแถวล่าสุดที่ยังไม่ได้ออก
    const lastRecord = await prisma.attendance.findFirst({
      where: {
        employeeId: employeeId,
        clockOut: null // หาอันที่ยังไม่ตอกบัตรออก
      },
      orderBy: { clockIn: 'desc' }
    })

    if (!lastRecord) {
      throw createError({ statusCode: 400, message: 'ไม่พบข้อมูลเข้างาน หรือคุณกดออกไปแล้ว' })
    }

    return await prisma.attendance.update({
      where: { id: lastRecord.id },
      data: {
        clockOut: new Date()
      }
    })
  }
})