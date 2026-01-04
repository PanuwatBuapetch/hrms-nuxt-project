// ไฟล์: server/api/setup.get.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  try {
    // สร้าง User Admin
    const admin = await prisma.employee.create({
      data: {
        firstName: 'System',
        lastName: 'Admin',
        email: 'admin@hrms.com',      // 👈 อีเมลสำหรับ Login
        username: 'admin',
        password: '1234',             // 👈 รหัสผ่าน
        role: 'admin',
        position: 'Administrator',
        department: 'IT',
        salary: 50000,
        status: 'active'
      }
    })
    return { success: true, message: '✅ สร้าง Admin สำเร็จ!', user: admin }
  } catch (e: any) {
    return { 
      success: false, 
      message: '❌ สร้างไม่สำเร็จ (อาจจะมี User นี้อยู่แล้ว หรือ Database Error)', 
      error: e.message 
    }
  }
})