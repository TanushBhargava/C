import AttendanceHistory from '../components/AttendanceHistory'
import FaceAttendance from '../components/FaceAttendance'
import { useAttendanceStore, subjects } from '../services/attendanceService'
import { useAuth } from '../context/AuthContext'

function StudentDashboard() {
  const { user } = useAuth()
  const { records, markPresentForStudentToday } = useAttendanceStore()

  const myRecords = records.filter((r) => r.studentId === user?.id)
  const currentSubjectId = subjects[0]?.id

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FaceAttendance onConfirm={() => user && currentSubjectId && markPresentForStudentToday(user.id, currentSubjectId)} />
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Current Status</h3>
          <p className="text-sm text-gray-600 mb-4">Your attendance for today</p>
          <div className="text-2xl">
            {myRecords.some((r) => r.date === new Date().toISOString().slice(0,10) && r.status === 'present') ? '✅ Present' : '❌ Not Marked'}
          </div>
        </div>
      </div>

      <AttendanceHistory records={myRecords} />
    </div>
  )
}

export default StudentDashboard

