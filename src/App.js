import { useState } from "react";

function App() {
  const [studentList, setStudentList] = useState([])

  function addStudentData(data) {
    setStudentList([...studentList, data])
  }

  function deleteStudentData(id) {
    setStudentList(studentList.filter((student) => student.id !== id))
  }

  function clearStudentData() {
    setStudentList([])
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddStudentData={addStudentData} />
      <StudentList studentData={studentList} onDeleteStudentData={deleteStudentData} onClearStudentData={clearStudentData} />
    </div>
  );
}

function Logo() {
  return <h1>🎒 Student List 🏫</h1>
}

function Form({ onAddStudentData }) {

  const [name, setName] = useState("")
  const [gender, setGender] = useState("")
  const [standard, setStandard] = useState(1)


  function clearData() {
    setName("")
    setGender("")
    setStandard(1)
  }


  function handleFormSubmit(e) {
    e.preventDefault()
    const studentData = {
      id: Date.now(),
      name,
      gender,
      standard
    }
    onAddStudentData(studentData)
    clearData()
  }

  return <form className="student-form" onSubmit={handleFormSubmit}>
    <h3>Enter student details here</h3>
    <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
    <select value={gender} onChange={(e) => setGender(e.target.value)}>
      <option>--Select Gender--</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
    </select>
    <select value={standard} onChange={(e) => setStandard(Number(e.target.value))}>
      <option>--Select Standard--</option>
      {
        Array.from({ length: 10 }, (_, i) => i + 1).map((n) => <option value={n}>{n}</option>)
      }
    </select>
    <button>Add</button>

  </form>
}

function StudentList({ studentData, onDeleteStudentData, onClearStudentData }) {

  const [filter, setFilter] = useState("by input")
  let filteredList = []

  if (filter === "by input") filteredList = studentData
  if (filter === "by name") filteredList = studentData.slice().sort((a, b) => a.name.localeCompare(b.name))
  if (filter === "by standard") filteredList = studentData.slice().sort((a, b) => a.standard - b.standard)



  return <>
    <div className="tableClass">
      {studentData.length > 0 ? <table>
        <tr>
          <th>Name</th>
          <th>Gender</th>
          <th>Standard</th>
          <th>Action</th>
        </tr>
        {
          filteredList.map((student) => (
            <Item studentData={student} onDeleteStudentData={onDeleteStudentData} key={student.id} />
          ))
        }

      </table>

        : <h2 className="noRecords">No Record found</h2>
      }
      <div className="filter">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="by input">Filter by input</option>
          <option value="by name">Filter by name</option>
          <option value="by standard">Filter by Standard</option>
        </select>
        <button onClick={onClearStudentData}>Clear List</button>
      </div>

    </div>
  </>

}

function Item({ studentData, onDeleteStudentData }) {
  return (
    <tr>
      <td>{studentData.name}</td>
      <td>{studentData.gender}</td>
      <td>{studentData.standard}</td>
      <td><button onClick={() => onDeleteStudentData(studentData.id)}>❌</button></td>
    </tr>
  )
}

export default App;
