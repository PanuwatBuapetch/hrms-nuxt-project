// ไฟล์: app/middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
  // อ่าน Cookie
  const userAuth = useCookie('user_auth')

  // ถ้าจะไปหน้า login ไม่ต้องเช็คอะไร ปล่อยไป
  if (to.path === '/login') {
    // แต่ถ้า login อยู่แล้ว ให้ดีดไปหน้าแรก
    if (userAuth.value) {
      return navigateTo('/')
    }
    return
  }

  // ถ้าไม่มี Cookie (ยังไม่ login) ดีดไปหน้า login
  if (!userAuth.value) {
    return navigateTo('/login')
  }
})