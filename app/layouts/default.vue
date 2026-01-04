<script setup lang="ts">
const router = useRouter()

const logout = async () => {
  try {
    await $fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  } catch (e) {
    console.error('Logout failed', e)
  }
}
</script>

<template>
  <div class="flex h-screen bg-gray-50 font-sans">

    <aside class="w-64 bg-slate-900 text-slate-300 flex flex-col shadow-xl z-20">

      <div class="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950">
        <div class="text-xl font-bold text-white tracking-wider flex items-center gap-2">
          🏢 <span class="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">HRMS PRO</span>
        </div>
      </div>

      <nav class="flex-1 py-6 px-3 space-y-1">
        <NuxtLink to="/" active-class="bg-blue-600 text-white shadow-lg shadow-blue-500/30"
          class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-slate-800 hover:text-white group">
          <span class="text-lg">👥</span> <span class="font-medium">จัดการพนักงาน</span>
        </NuxtLink>

        <NuxtLink to="/create" active-class="bg-blue-600 text-white shadow-lg shadow-blue-500/30"
          class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-slate-800 hover:text-white group">
          <span class="text-lg">➕</span> <span class="font-medium">เพิ่มพนักงาน</span>
        </NuxtLink>

        <NuxtLink to="/attendance" active-class="bg-blue-600 text-white shadow-lg shadow-blue-500/30"
          class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-slate-800 hover:text-white group">
          <span class="text-lg">🕒</span> <span class="font-medium">ลงเวลาเข้า-ออก</span>
        </NuxtLink>
        <NuxtLink to="/payroll" active-class="bg-blue-600 text-white shadow-lg"
          class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-white group">
          <span class="text-lg">💸</span> <span class="font-medium">เงินเดือน</span>
        </NuxtLink>
      </nav>

      <div class="p-4 border-t border-slate-800 bg-slate-950 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">U</div>
          <div>
            <div class="text-sm font-semibold text-white">User</div>
            <div class="text-xs text-slate-500">Online</div>
          </div>
        </div>

        <button @click="logout" class="text-slate-400 hover:text-red-400 transition p-2 rounded hover:bg-slate-800"
          title="ออกจากระบบ">
          <span class="text-xl">🚪</span>
        </button>
      </div>
    </aside>

    <div class="flex-1 flex flex-col h-screen overflow-hidden">
      <header class="h-16 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-8 z-10">
        <h2 class="text-lg font-semibold text-gray-700">👋 ยินดีต้อนรับเข้าสู่ระบบ</h2>
        <div class="text-sm text-gray-500">
          {{ new Date().toLocaleDateString('th-TH', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
          }}
        </div>
      </header>

      <main class="flex-1 overflow-y-auto bg-gray-50 p-6 relative">
        <div class="max-w-7xl mx-auto">
          <slot />
        </div>
      </main>
    </div>

  </div>
</template>

<style>
body {
  font-family: 'Sarabun', sans-serif;
}
</style>