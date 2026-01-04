// ไฟล์: server/api/employees.post.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  // 1. อ่านข้อมูลที่ส่งมาจากหน้าบ้าน
  const body = await readBody(event)

  try {
    // 2. บันทึกลง MySQL
    // (สังเกต: ใช้ prisma.employee ไม่มี s นะครับ)
    const newEmployee = await prisma.employee.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        position: body.position,
        department: body.department,
        salary: Number(body.salary), // แปลงเป็นตัวเลขก่อนบันทึก
        status: 'active'
      }
    })
    
    return { success: true, data: newEmployee }

  } catch (error: any) {
    // ดัก Error เช่น อีเมลซ้ำ
    return { success: false, error: error.message }
  }
})