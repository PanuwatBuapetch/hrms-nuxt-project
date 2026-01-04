// ไฟล์: server/api/check-users.get.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  // ดึงข้อมูลทุกคนมาดู (เฉพาะ id, email, password, username)
  const users = await prisma.employee.findMany({
    select: {
      id: true,
      firstName: true,
      email: true,     // 👈 สิ่งที่ต้องใช้ Login
      password: true,  // 👈 รหัสผ่าน
      username: true
    }
  })
  
  return { 
    count: users.length,
    users: users 
  }
})