// ไฟล์: server/api/auth/login.post.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  // 1. ค้นหาพนักงานจากอีเมล
  const user = await prisma.employee.findUnique({
    where: { email: email }
  })

  // 2. ถ้าไม่เจอ หรือรหัสผ่านผิด (เช็คแบบบ้านๆ ก่อนนะครับ)
  if (!user || user.password !== password) {
    throw createError({
      statusCode: 401,
      message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'
    })
  }

  // 3. ถ้าถูก -> สร้าง Cookie ชื่อ 'user_auth' เก็บ ID ไว้
  // (ตั้งเวลาหมดอายุ 1 วัน)
  setCookie(event, 'user_auth', JSON.stringify({
    id: user.id,
    name: user.firstName,
    role: user.role
  }), {
    maxAge: 60 * 60 * 24 
  })

  return { success: true, user }
})