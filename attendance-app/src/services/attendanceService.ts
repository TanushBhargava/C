import { produce } from 'immer'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Attendance, AttendanceStatus, initialAttendance, students as seedStudents, subjects as seedSubjects, teachers as seedTeachers, Student, Subject, Teacher } from './mockData'
import { isAfter, subDays } from 'date-fns'

type AttendanceState = {
  records: Attendance[]
  students: Student[]
  subjects: Subject[]
  teachers: Teacher[]
  markPresentForStudentToday: (studentId: string, subjectId: string) => void
  updateStatus: (id: string, status: AttendanceStatus) => void
  overrideRecord: (record: Attendance) => void
  addStudent: (s: Omit<Student, 'id'>) => void
  removeStudent: (id: string) => void
  addSubject: (s: Omit<Subject, 'id'>) => void
  removeSubject: (id: string) => void
  addTeacher: (t: Omit<Teacher, 'id'>) => void
  removeTeacher: (id: string) => void
}

export const useAttendanceStore = create<AttendanceState>()(
  persist(
    (set, get) => ({
      records: initialAttendance,
      students: seedStudents,
      subjects: seedSubjects,
      teachers: seedTeachers,
      markPresentForStudentToday: (studentId, subjectId) =>
        set(
          produce<AttendanceState>((draft) => {
            const existing = draft.records.find(
              (r) => r.studentId === studentId && r.subjectId === subjectId && isToday(r.date)
            )
            if (existing) {
              existing.status = 'present'
              return
            }
            draft.records.push({
              id: cryptoRandomId(),
              date: new Date().toISOString().slice(0, 10),
              subjectId,
              studentId,
              status: 'present',
            })
          })
        ),
      updateStatus: (id, status) =>
        set(
          produce<AttendanceState>((draft) => {
            const rec = draft.records.find((r) => r.id === id)
            if (rec) rec.status = status
          })
        ),
      overrideRecord: (record) =>
        set(
          produce<AttendanceState>((draft) => {
            const idx = draft.records.findIndex((r) => r.id === record.id)
            if (idx >= 0) draft.records[idx] = record
            else draft.records.push(record)
          })
        ),
      addStudent: (s) =>
        set(
          produce<AttendanceState>((draft) => {
            const id = cryptoRandomId()
            draft.students.push({ id, ...s })
          })
        ),
      removeStudent: (id) =>
        set(
          produce<AttendanceState>((draft) => {
            draft.students = draft.students.filter((x) => x.id !== id)
            draft.records = draft.records.filter((r) => r.studentId !== id)
          })
        ),
      addSubject: (s) =>
        set(
          produce<AttendanceState>((draft) => {
            const id = cryptoRandomId()
            draft.subjects.push({ id, ...s })
          })
        ),
      removeSubject: (id) =>
        set(
          produce<AttendanceState>((draft) => {
            draft.subjects = draft.subjects.filter((x) => x.id !== id)
            draft.records = draft.records.filter((r) => r.subjectId !== id)
            draft.teachers = draft.teachers.filter((t) => t.subjectId !== id)
          })
        ),
      addTeacher: (t) =>
        set(
          produce<AttendanceState>((draft) => {
            const id = cryptoRandomId()
            draft.teachers.push({ id, ...t })
          })
        ),
      removeTeacher: (id) =>
        set(
          produce<AttendanceState>((draft) => {
            draft.teachers = draft.teachers.filter((x) => x.id !== id)
          })
        ),
    }),
    { name: 'attendance-store' }
  )
)

export function isEditableByTeacher(recordDateISO: string): boolean {
  const twoDaysAgo = subDays(new Date(), 2)
  return isAfter(new Date(recordDateISO + 'T00:00:00'), twoDaysAgo)
}

function isToday(dateISO: string): boolean {
  const today = new Date().toISOString().slice(0, 10)
  return dateISO === today
}

function cryptoRandomId() {
  return Math.random().toString(36).slice(2)
}

export const selectTeacherById = (id: string) => (state: AttendanceState) => state.teachers.find(t => t.id === id)
export const selectStudents = (state: AttendanceState) => state.students
export const selectSubjects = (state: AttendanceState) => state.subjects


