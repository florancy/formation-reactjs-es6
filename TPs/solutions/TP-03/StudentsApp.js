import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './StudentFilter'
import StudentsTable from './StudentsTable'
import StudentDetails from './StudentDetails'
import Student from './Student'

const StudentsApp = () => {
  const [students, setStudents] = useState([])
  const [filter, setFilter] = useState('')
  const [selectedStudent, setSelectedStudent] = useState(Student.NULL)

  useEffect(() => {
    axios.get('./students.json').then(({ data: students }) => setStudents(students))
  }, [])

  const handleFilterChange = f => {
    setFilter(f)
  }

  const handleSelectStudent = s => {
    setSelectedStudent(s)
  }

  const filteredStudents = (students, filter) =>
    students.filter(s => s.firstname.includes(filter) || s.lastname.includes(filter))

  return (
    <>
      <Filter onChange={handleFilterChange} />
      <StudentsTable students={filteredStudents(students, filter)} selectStudent={handleSelectStudent} />
      <StudentDetails student={selectedStudent} />
    </>
  )
}

export default StudentsApp
