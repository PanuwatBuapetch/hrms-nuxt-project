import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  await prisma.employee.delete({ where: { id } })
  return { success: true }
})