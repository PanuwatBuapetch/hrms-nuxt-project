<script setup lang="ts">
// interface ข้อมูลพนักงาน
interface Employee {
  id: number; firstName: string; lastName: string; email: string;
  position: string | null; salary: number | null; status: string;
}

// โหลดข้อมูล 2 อย่าง: รายชื่อพนักงาน + ข้อมูล Dashboard
const { data: employees, refresh } = await useFetch<Employee[]>('/api/employees')
const { data: stats } = await useFetch('/api/dashboard')

// ฟังก์ชันลบ
const deleteEmployee = async (id: number) => {
  if (!confirm('ยืนยันที่จะลบข้อมูลพนักงานคนนี้?')) return
  await $fetch(`/api/employees/${id}`, { method: 'DELETE' })
  refresh()
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 pb-12">
    
    <div class="mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
      
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">👥</div>
        <div>
          <div class="text-gray-500 text-sm">พนักงานทั้งหมด</div>
          <div class="text-2xl font-bold text-gray-800">{{ stats?.totalEmp || 0 }} คน</div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-2xl">⏰</div>
        <div>
          <div class="text-gray-500 text-sm">มาทำงานวันนี้</div>
          <div class="text-2xl font-bold text-gray-800">{{ stats?.presentToday || 0 }} คน</div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-2xl">💰</div>
        <div>
          <div class="text-gray-500 text-sm">ยอดจ่ายเงินเดือน</div>
          <div class="text-2xl font-bold text-gray-800">{{ Number(stats?.totalSalary).toLocaleString() }}</div>
        </div>
      </div>

       <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-2xl">🆕</div>
        <div>
          <div class="text-gray-500 text-sm">พนักงานใหม่ (เดือนนี้)</div>
          <div class="text-2xl font-bold text-gray-800">+{{ stats?.newEmp || 0 }}</div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 class="text-xl font-bold text-gray-800">รายชื่อพนักงาน</h2>
        <NuxtLink to="/create" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">
          + เพิ่มคนใหม่
        </NuxtLink>
      </div>
      
      <table class="w-full text-left">
        <thead class="bg-gray-50 text-gray-600 text-sm uppercase">
          <tr>
            <th class="p-4">ชื่อ-นามสกุล</th>
            <th class="p-4">ตำแหน่ง</th>
            <th class="p-4">เงินเดือน</th>
            <th class="p-4 text-right">จัดการ</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="emp in employees" :key="emp.id" class="hover:bg-gray-50">
            <td class="p-4">
              <div class="font-bold text-gray-800">{{ emp.firstName }} {{ emp.lastName }}</div>
              <div class="text-xs text-gray-400">{{ emp.email }}</div>
            </td>
            <td class="p-4"><span class="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">{{ emp.position || '-' }}</span></td>
            <td class="p-4 font-mono">{{ emp.salary ? Number(emp.salary).toLocaleString() : 0 }}</td>
            <td class="p-4 text-right space-x-2">
              <NuxtLink :to="`/edit/${emp.id}`" class="text-blue-500 hover:underline text-sm">แก้ไข</NuxtLink>
              <button @click="deleteEmployee(emp.id)" class="text-red-500 hover:underline text-sm">ลบ</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>