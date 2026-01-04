// ไฟล์: server/api/employees/[id].put.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  // 1. รับ ID จาก URL (เช่น /api/employees/1)
  const id = Number(getRouterParam(event, 'id'))
  
  // 2. รับข้อมูลที่จะแก้
  const body = await readBody(event)

  try {
    const updatedEmployee = await prisma.employee.update({
      where: { id: id },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        position: body.position,
        department: body.department,
        salary: Number(body.salary),
        status: body.status
      }
    })
    return { success: true, data: updatedEmployee }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
})