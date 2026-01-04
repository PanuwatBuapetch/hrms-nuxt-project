export default defineEventHandler((event) => {
  deleteCookie(event, 'user_auth') // ลบ Cookie ทิ้ง
  return { success: true }
})