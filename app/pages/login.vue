<script setup lang="ts">
// กำหนด layout ให้หน้านี้ไม่มี Sidebar
definePageMeta({
  layout: false
})

const form = ref({ email: '', password: '' })
const router = useRouter()
const isError = ref(false)

const handleLogin = async () => {
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: form.value
    })
    // ถ้าผ่าน ให้ไปหน้า Dashboard
    router.push('/')
  } catch (e) {
    isError.value = true
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-900">
    <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
      
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-slate-800">🔐 เข้าสู่ระบบ</h1>
        <p class="text-gray-500 mt-2">ระบบ HRMS จัดการพนักงาน</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">อีเมล</label>
          <input v-model="form.email" type="email" required 
            class="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="admin@company.com" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">รหัสผ่าน</label>
          <input v-model="form.password" type="password" required 
            class="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="••••••••" />
        </div>

        <div v-if="isError" class="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
          อีเมลหรือรหัสผ่านไม่ถูกต้อง
        </div>

        <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition transform active:scale-95">
          เข้าสู่ระบบ
        </button>
      </form>

      <div class="mt-6 text-center text-xs text-gray-400">
        Demo Account: รหัสผ่านเริ่มต้นคือ 1234
      </div>
    </div>
  </div>
</template>