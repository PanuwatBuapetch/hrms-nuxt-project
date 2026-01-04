import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    // 1. แก้ employees -> employee (ตามชื่อ Model ใน Schema ไม่ใช่ชื่อตาราง)
    return await prisma.employee.findMany({
      include: {
        attendances: true // (Optional) ถ้าอยากดึงข้อมูลการลงเวลามาด้วย
      }
    })
  } catch (error: any) { // 2. ใส่ : any ตรงนี้เพื่อแก้ error 'unknown'
    console.error(error) // log ดูใน terminal เวลามีปัญหา
    return { 
      status: 'error',
      message: error.message || 'Something went wrong'
    }
  }
})