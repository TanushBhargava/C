import AttendanceTable from '../components/AttendanceTable'
import { useAttendanceStore } from '../services/attendanceService'
import { useAuth } from '../context/AuthContext'

function TeacherDashboard() {
  const { user } = useAuth()
  const { records, updateStatus } = useAttendanceStore()
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Teacher Dashboard</h2>
      <AttendanceTable
        data={records.filter(r => !!user && user.role === 'teacher' ? true : true)}
        role="teacher"
        onChangeStatus={(id, status) => updateStatus(id, status)}
      />
    </div>
  )
}

export default TeacherDashboard

