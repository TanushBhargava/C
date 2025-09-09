import { addDays, formatISO, startOfToday, subDays } from 'date-fns'
import { v4 as uuid } from 'uuid'

export type Subject = {
  id: string
  name: string
}

export type Student = {
  id: string
  name: string
  classId: string
}

export type Teacher = {
  id: string
  name: string
  subjectId: string
}

export type AttendanceStatus = 'present' | 'absent'

export type Attendance = {
  id: string
  date: string
  subjectId: string
  studentId: string
  inTime?: string
  outTime?: string
  status: AttendanceStatus
}

export const subjects: Subject[] = [
  { id: 'sub-math', name: 'Mathematics' },
  { id: 'sub-phy', name: 'Physics' },
  { id: 'sub-chem', name: 'Chemistry' },
]

export const students: Student[] = [
  { id: 'u1', name: 'Alex Student', classId: 'c1' },
  { id: 'u2', name: 'Bianca Student', classId: 'c1' },
  { id: 'u3', name: 'Carlos Student', classId: 'c1' },
]

export const teachers: Teacher[] = [
  { id: 't1', name: 'Ms. Taylor', subjectId: 'sub-math' },
  { id: 't2', name: 'Mr. Green', subjectId: 'sub-phy' },
]

const today = startOfToday()
const dates = [subDays(today, 2), subDays(today, 1), today]

export const initialAttendance: Attendance[] = students.flatMap((s, idx) => {
  return dates.map((d, di) => {
    const status: AttendanceStatus = di === 2 && idx % 3 === 0 ? 'absent' : 'present'
    const inTime = status === 'present' ? formatISO(addDays(d, 0)) : undefined
    const outTime = status === 'present' ? formatISO(addDays(d, 0)) : undefined
    return {
      id: uuid(),
      date: formatISO(d, { representation: 'date' }),
      subjectId: subjects[(idx + di) % subjects.length].id,
      studentId: s.id,
      inTime,
      outTime,
      status,
    }
  })
})

