import { Attendance } from '../services/mockData'
import { isEditableByTeacher } from '../services/attendanceService'

type Props = {
  data: Attendance[]
  role: 'student' | 'teacher' | 'admin'
  onChangeStatus?: (id: string, status: 'present' | 'absent') => void
}

function AttendanceTable({ data, role, onChangeStatus }: Props) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-gray-700">
          <tr>
            <th className="px-3 py-2 text-left">Date</th>
            <th className="px-3 py-2 text-left">Subject</th>
            <th className="px-3 py-2 text-left">In</th>
            <th className="px-3 py-2 text-left">Out</th>
            <th className="px-3 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => {
            const editable = role === 'admin' || (role === 'teacher' && isEditableByTeacher(r.date))
            return (
              <tr key={r.id} className="border-t border-gray-100">
                <td className="px-3 py-2 whitespace-nowrap">{r.date}</td>
                <td className="px-3 py-2 whitespace-nowrap">{r.subjectId}</td>
                <td className="px-3 py-2 whitespace-nowrap">{r.inTime?.slice(11, 16) ?? '-'}</td>
                <td className="px-3 py-2 whitespace-nowrap">{r.outTime?.slice(11, 16) ?? '-'}</td>
                <td className="px-3 py-2">
                  {editable && onChangeStatus ? (
                    <select
                      value={r.status}
                      onChange={(e) => onChangeStatus(r.id, e.target.value as 'present' | 'absent')}
                      className="rounded-md border-gray-300 text-sm"
                    >
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                    </select>
                  ) : (
                    <span className={r.status === 'present' ? 'text-green-600' : 'text-red-600'}>
                      {r.status === 'present' ? '✅ Present' : '❌ Absent'}
                    </span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default AttendanceTable

