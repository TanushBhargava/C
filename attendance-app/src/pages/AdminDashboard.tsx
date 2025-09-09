import { useAttendanceStore } from '../services/attendanceService'
import AttendanceTable from '../components/AttendanceTable'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

function AdminDashboard() {
  const { records, updateStatus, students, subjects, addStudent, removeStudent, addSubject, removeSubject } = useAttendanceStore()

  const stats = subjects.map((s) => {
    const total = records.filter((r) => r.subjectId === s.id).length
    const present = records.filter((r) => r.subjectId === s.id && r.status === 'present').length
    return { subject: s.name, present, absent: total - present }
  })

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Admin Dashboard</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Overall Attendance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats}>
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="present" fill="#16a34a" />
                <Bar dataKey="absent" fill="#dc2626" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
          <h3 className="font-semibold">Entities</h3>
          <p className="text-sm text-gray-600">Students: {students.length} · Subjects: {subjects.length}</p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-sm rounded-md bg-gray-900 text-white" onClick={() => addStudent({ name: 'New Student', classId: 'c1' })}>Add Student</button>
            <button className="px-3 py-1.5 text-sm rounded-md bg-gray-900 text-white" onClick={() => addSubject({ name: 'New Subject' })}>Add Subject</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <h4 className="font-medium mb-1">Students</h4>
              <ul className="space-y-1 max-h-40 overflow-auto">
                {students.map(s => (
                  <li key={s.id} className="flex items-center justify-between text-sm">
                    <span>{s.name}</span>
                    <button className="text-red-600" onClick={() => removeStudent(s.id)}>Remove</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-1">Subjects</h4>
              <ul className="space-y-1 max-h-40 overflow-auto">
                {subjects.map(s => (
                  <li key={s.id} className="flex items-center justify-between text-sm">
                    <span>{s.name}</span>
                    <button className="text-red-600" onClick={() => removeSubject(s.id)}>Remove</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <AttendanceTable data={records} role="admin" onChangeStatus={updateStatus} />
    </div>
  )
}

export default AdminDashboard

