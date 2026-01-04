<script setup lang="ts">
const router = useRouter()

// ตัวแปรเก็บข้อมูลฟอร์ม
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  position: '',
  department: 'IT', // ค่าเริ่มต้น
  salary: 0
})

const isSubmitting = ref(false)

// ฟังก์ชันบันทึกข้อมูล
const submitForm = async () => {
  isSubmitting.value = true
  
  try {
    const response = await $fetch('/api/employees', {
      method: 'POST',
      body: form.value
    })

    if (response.success) {
      alert('บันทึกข้อมูลสำเร็จ!')
      router.push('/') // กลับไปหน้าแรก
    } else {
      alert('เกิดข้อผิดพลาด: ' + response.error)
    }
  } catch (e) {
    alert('เชื่อมต่อ Server ไม่ได้')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg border border-gray-100">
      
      <h1 class="text-2xl font-bold text-gray-800 mb-6">📝 เพิ่มพนักงานใหม่</h1>

      <form @submit.prevent="submitForm" class="space-y-4">
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">ชื่อจริง</label>
            <input v-model="form.firstName" required type="text" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="สมชาย" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">นามสกุล</label>
            <input v-model="form.lastName" required type="text" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="ใจดี" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">อีเมล</label>
          <input v-model="form.email" required type="email" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="somchai@company.com" />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">ตำแหน่ง</label>
            <input v-model="form.position" required type="text" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Web Developer" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">แผนก</label>
            <select v-model="form.department" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="IT">IT & Dev</option>
              <option value="HR">Human Resource</option>
              <option value="Sales">Sales & Marketing</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">เงินเดือน (บาท)</label>
          <input v-model="form.salary" required type="number" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>

        <div class="flex gap-3 pt-4">
          <button type="submit" :disabled="isSubmitting" class="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400">
            {{ isSubmitting ? 'กำลังบันทึก...' : 'บันทึกข้อมูล' }}
          </button>
          
          <NuxtLink to="/" class="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
            ยกเลิก
          </NuxtLink>
        </div>

      </form>
    </div>
  </div>
</template>