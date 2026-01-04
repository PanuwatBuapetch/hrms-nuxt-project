// ไฟล์: server/api/employees/[id].get.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  // 1. รับ ID จาก URL ที่ส่งมา
  const id = Number(getRouterParam(event, 'id'))

  // 2. ค้นหาข้อมูลจาก Database
  const employee = await prisma.employee.findUnique({
    where: { id: id }
  })

  // 3. ส่งข้อมูลกลับไปหน้าบ้าน (ถ้าไม่เจอ จะได้ null)
  return employee
})