<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const id = route.params.id

// 1. ประกาศ Interface ให้ชัดเจนว่าข้อมูลจาก API หน้าตาเป็นยังไง
interface Employee {
  id: number
  firstName: string
  lastName: string
  email: string
  position: string | null    // database ยอมให้เป็น null
  department: string | null  // database ยอมให้เป็น null
  salary: number | null      // database ยอมให้เป็น null
  status: string
}

// 2. ดึงข้อมูล
const { data: employee } = await useFetch<Employee>(`/api/employees/${id}`)

// 3. กำหนดค่าเริ่มต้นของ Form
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  position: '',
  department: '',
  salary: 0,
  status: 'active'
})

// 4. เติมข้อมูลลงฟอร์ม (แก้ Error ตรงนี้ด้วยการเช็ค Null)
watchEffect(() => {
  if (employee.value) {
    form.value = {
      firstName: employee.value.firstName,
      lastName: employee.value.lastName,
      email: employee.value.email,
      // ✅ ถ้าเป็น null ให้ใส่ '' แทน (แก้ Error Type 'null' is not assignable to 'string')
      position: employee.value.position || '', 
      department: employee.value.department || '',
      // ✅ ถ้าเป็น null ให้ใส่ 0 แทน
      salary: employee.value.salary || 0,
      status: employee.value.status || 'active'
    }
  }
})

const submitUpdate = async () => {
  try {
    const res = await $fetch(`/api/employees/${id}`, {
      method: 'PUT',
      body: form.value
    })
    // เช็คแบบปลอดภัย
    if (res && (res as any).success) {
      alert('แก้ไขเรียบร้อย!')
      router.push('/')
    }
  } catch (e) {
    alert('เกิดข้อผิดพลาด')
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-6">
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg border border-gray-100">
      <h1 class="text-2xl font-bold mb-6 text-gray-800">✏️ แก้ไขข้อมูลพนักงาน</h1>
      
      <form @submit.prevent="submitUpdate" class="space-y-4">
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">ชื่อจริง</label>
            <input v-model="form.firstName" class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="ชื่อ" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">นามสกุล</label>
            <input v-model="form.lastName" class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="นามสกุล" required />
          </div>
        </div>

        <div>
           <label class="block text-sm font-medium text-gray-700 mb-1">อีเมล</label>
           <input v-model="form.email" type="email" class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="อีเมล" required />
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">ตำแหน่ง</label>
            <input v-model="form.position" class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" placeholder="ตำแหน่ง" />
        </div>

        <div class="grid grid-cols-2 gap-4">
             <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">แผนก</label>
                <select v-model="form.department" class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  <option value="IT">IT & Dev</option>
                  <option value="HR">HR</option>
                  <option value="Sales">Sales</option>
                  <option value="Admin">Admin</option>
                </select>
             </div>
             <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">เงินเดือน</label>
                <input v-model="form.salary" type="number" class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" />
             </div>
        </div>
        
        <div class="flex gap-3 pt-4">
          <button type="submit" class="flex-1 bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 shadow font-medium">บันทึกการแก้ไข</button>
          <NuxtLink to="/" class="px-6 py-2 border rounded text-gray-600 hover:bg-gray-50">ยกเลิก</NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>