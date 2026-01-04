<script setup lang="ts">
// ใช้ข้อมูลชุดเดียวกับพนักงาน
const { data: employees } = await useFetch('/api/employees')

// สั่ง Browser ให้เปิดหน้าต่าง Print
const printSlip = () => {
  window.print()
}
</script>

<template>
  <div class="min-h-screen">
    <div class="flex justify-between items-center mb-6 print:hidden">
      <h1 class="text-2xl font-bold text-gray-800">💸 ระบบคำนวณเงินเดือน</h1>
      <button @click="printSlip" class="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2">
        🖨️ พิมพ์รายงาน
      </button>
    </div>

    <div class="bg-white rounded-xl shadow border border-gray-200 overflow-hidden print:shadow-none print:border-none">
      <table class="w-full text-left">
        <thead class="bg-gray-100 text-gray-700 print:bg-gray-200">
          <tr>
            <th class="p-4">พนักงาน</th>
            <th class="p-4 text-right">เงินเดือน (บาท)</th>
            <th class="p-4 text-right text-red-600">หักประกันสังคม (5%)</th>
            <th class="p-4 text-right text-green-600 font-bold">สุทธิ (Net)</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="emp in employees" :key="emp.id">
            <td class="p-4 font-medium">{{ emp.firstName }} {{ emp.lastName }}</td>
            <td class="p-4 text-right">{{ emp.salary ? Number(emp.salary).toLocaleString() : 0 }}</td>
            
            <td class="p-4 text-right text-red-500">
              -{{ Math.min((emp.salary || 0) * 0.05, 750).toLocaleString() }}
            </td>
            
            <td class="p-4 text-right font-bold text-green-700 text-lg">
              {{ ((emp.salary || 0) - Math.min((emp.salary || 0) * 0.05, 750)).toLocaleString() }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
/* CSS พิเศษ: ซ่อนเมนูด้านข้างเวลาสั่ง Print */
@media print {
  aside, header { display: none !important; }
  main { padding: 0 !important; margin: 0 !important; }
}
</style>