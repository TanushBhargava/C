import { useMemo } from 'react'
import AttendanceTable from './AttendanceTable'
import { Attendance } from '../services/mockData'

function AttendanceHistory({ records }: { records: Attendance[] }) {
  const sorted = useMemo(() =>
    [...records].sort((a, b) => (a.date < b.date ? 1 : -1)), [records]
  )
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Attendance History</h3>
      <AttendanceTable data={sorted} role="student" />
    </div>
  )
}

export default AttendanceHistory

