<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// แก้ไข Interface ให้ตรงกับ JSON เป๊ะๆ (salary เป็น string)
interface Employee {
  id: number
  firstName: string
  lastName: string
  salary: string | number | null // 👈 ยอมรับทั้ง string และ number
}

interface AttendanceLog {
  id: number
  clockIn: string
  clockOut: string | null
  employee: Employee
}

const currentTime = ref(new Date())
let timer: any

// ดึงข้อมูลพนักงาน
const { data: employees } = await useFetch<Employee[]>('/api/employees')

// 👇 เพิ่ม key: 'logs' เพื่อบังคับให้ Nuxt รู้ว่าเป็นข้อมูลคนละชุดกับค่าเก่า
const { data: todayLogs, refresh: refreshLogs } = await useFetch<AttendanceLog[]>('/api/attendance/today', {
  key: 'attendance-logs-v1' 
})

// ... (ส่วน Logic อื่นๆ เหมือนเดิม) ...
const selectedEmpId = ref<number | null>(null)
const isProcessing = ref(false)

const updateTime = () => { currentTime.value = new Date() }
onMounted(() => { timer = setInterval(updateTime, 1000) })
onUnmounted(() => { clearInterval(timer) })

const handleAttendance = async (type: 'check-in' | 'check-out') => {
  if (!selectedEmpId.value) return alert('กรุณาเลือกชื่อพนักงานก่อนครับ')
  isProcessing.value = true
  try {
    await $fetch('/api/attendance', {
      method: 'POST',
      body: { employeeId: Number(selectedEmpId.value), type }
    })
    alert(type === 'check-in' ? '☀️ เข้างานสำเร็จ!' : '🌙 ออกงานสำเร็จ!')
    await refreshLogs() // โหลดใหม่
  } catch (error: any) {
    alert(error.data?.message || 'เกิดข้อผิดพลาด')
  } finally {
    isProcessing.value = false
  }
}

const formatTime = (dateStr: string | null | undefined) => {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleTimeString('th-TH')
}
</script>

<template>
    <div class="min-h-screen p-6 flex flex-col items-center" style="background-color: #0f172a; color: white;">
        <div class="text-center mt-10 mb-8">
            <h1 class="text-3xl font-bold mb-2 text-blue-300">🕒 ระบบลงเวลาเข้า-ออกงาน</h1>
            <div class="text-6xl font-mono font-bold tracking-widest mt-4">
                {{ currentTime.toLocaleTimeString('th-TH') }}
            </div>
            <div class="text-xl text-gray-400 mt-2">
                {{ currentTime.toLocaleDateString('th-TH', {
                    weekday: 'long', day: 'numeric', month: 'long', year:
                        'numeric'
                }) }}
            </div>
        </div>

        <div class="p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-700"
            style="background-color: #1e293b;">

            <div class="mb-8">
                <label class="block text-sm text-gray-400 mb-2">เลือกชื่อพนักงาน (จำลอง Login)</label>

                <select v-model="selectedEmpId" class="w-full p-3 rounded-lg outline-none"
                    style="color: black; background-color: white;">
                    <option :value="null">-- กรุณาเลือกชื่อ --</option>
                    <option v-for="emp in employees" :key="emp.id" :value="emp.id">
                        {{ emp.firstName }} {{ emp.lastName }}
                    </option>
                </select>

                <div v-if="!employees || employees.length === 0" class="text-red-400 text-sm mt-2">
                    ⚠️ ไม่พบข้อมูลพนักงาน (โปรดตรวจสอบว่ามีพนักงานในระบบหรือไม่)
                </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <button @click="handleAttendance('check-in')" :disabled="isProcessing || !selectedEmpId"
                    class="bg-green-600 hover:bg-green-500 disabled:bg-gray-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg">
                    ☀️ เข้างาน
                </button>

                <button @click="handleAttendance('check-out')" :disabled="isProcessing || !selectedEmpId"
                    class="bg-red-600 hover:bg-red-500 disabled:bg-gray-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg">
                    🌙 ออกงาน
                </button>
            </div>

            <div class="mt-6 text-center">
                <NuxtLink to="/" class="text-gray-400 hover:text-white underline text-sm">กลับหน้าจัดการพนักงาน
                </NuxtLink>
            </div>
        </div>

        <div class="mt-12 w-full max-w-4xl">
            <h3 class="text-xl font-bold mb-4 text-gray-300">📋 รายการลงเวลาวันนี้</h3>

            <div class="rounded-xl overflow-hidden shadow-lg border border-gray-700" style="background-color: #1e293b;">
                <table class="w-full text-left">
                    <thead class="bg-gray-800 text-gray-300">
                        <tr>
                            <th class="p-4">พนักงาน</th>
                            <th class="p-4">เวลาเข้า</th>
                            <th class="p-4">เวลาออก</th>
                            <th class="p-4">สถานะ</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-700">
                        <tr v-for="log in todayLogs" :key="log.id" class="hover:bg-gray-700">
                            <td class="p-4">{{ log?.employee?.firstName }} {{ log?.employee?.lastName }}</td>

                            <td class="p-4 text-green-400 font-mono">{{ formatTime(log.clockIn) }}</td>
                            <td class="p-4 text-red-400 font-mono">{{ formatTime(log.clockOut) }}</td>

                            <td class="p-4">
                                <span v-if="!log.clockOut"
                                    class="px-2 py-1 rounded text-xs bg-blue-900 text-blue-200">ทำงานอยู่</span>
                                <span v-else class="px-2 py-1 rounded text-xs bg-gray-600 text-gray-300">กลับแล้ว</span>
                            </td>
                        </tr>

                        <tr v-if="!todayLogs || todayLogs.length === 0">
                            <td colspan="4" class="p-8 text-center text-gray-500">
                                วันนี้ยังไม่มีใครลงเวลา
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</template>