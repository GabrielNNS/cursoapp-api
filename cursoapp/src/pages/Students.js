import { useEffect, useState } from "react";

import AddStudent from "../components/AddStudent";
import EditStudentModal from "../components/EditStudentModal";
import SearchBar from "../components/SearchBar";
import { baseUrl } from "../shared";

export default function Students() {
  const [students, setStudents] = useState([]); //estudantes
  const [student, setStudent] = useState(); //para pegar um unico estudar para editar/deletar
  const [show, setShow] = useState(false); //controla o estado do Modal de adicionar Estudante
  const [showEditModal, setShowEditModal] = useState(false); //controla o estado do Modal de editar/deletar Estudante
  const [searchQuery, setSearchQuery] = useState(""); //pesuisa

  function toggleShow() {
    setShow(!show);
  }

  function toggleEditModal() {
    setShowEditModal(!showEditModal);
  }

  function editStudent(id) {
    fetch(baseUrl + "/students/" + id)
      .then((response) => response.json())
      .then((data) => {
        setStudent(data.student);
        toggleEditModal();
      });
  }

  function updateStudent() {
    fetch(baseUrl + "/students/")
      .then((response) => response.json())
      .then((data) => {
        filterStudents(searchQuery, data.students);
      });
  }

  useEffect(() => {
    updateStudent();
  }, [searchQuery]); //caso queria reverter só tirar o que ta dentro do []

  const filterStudents = (query, studentList) => {
    const filtered = studentList.filter(
      (student) =>
        student.name.toLowerCase().includes(query.toLowerCase()) ||
        student.email.toLowerCase().includes(query.toLowerCase())
    );
    setStudents(filtered);
  };

  function newStudent(name, email, adress, phone, gender, birthday) {
    const data = {
      name: name,
      birthday: birthday,
      address: adress,
      phone: phone,
      email: email,
      gender: gender,
    };
    const url = baseUrl + "/students/";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Algo deu errado");
        }
        return response.json();
      })
      .then((data) => {
        toggleShow();
        setStudents([...students, data.students]);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      <h3 className="mb-5 font-bold">Alunos</h3>
      <SearchBar
        onChange={(query) => {
          setSearchQuery(query);
        }}
      />

      <div className="mb-3 shadow-lg overflow-y-auto min-h-[350px] max-h-[350px] max-w-[600px] rounded-xl">
        <div className="flex-wrap">
          {students
            ? students.map((student) => (
                <div
                  key={student.id}
                  className="min-w-[550px] max-w-[550px] m-2 my-2 py-8 px-8 bg-white hover:bg-gray-300 active:bg-violet-700 rounded-lg shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"
                  onClick={() => editStudent(student.id)}
                >
                  {
                    //<Link to={"/students/" + student.id}>{student.name}</Link>
                    //<button onClick={() => test(student.id)}>Teste</button>
                  }
                  <div className="text-left space-y-2 sm:text-left ">
                    <div className="space-y-0.5">
                      <p className="text-sm text-black font-semibold">
                        <span className="inline-block bg-gray-200 rounded-lg px-2 py-1 mr-2">
                          {student.id}
                        </span>
                        {student.name}
                      </p>
                      <p className="text-slate-500 font-medium text-xs">
                        {student.email}
                      </p>
                      <p className="text-slate-500 font-medium text-xs">
                        {student.address}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
      <AddStudent
        className="mb-5"
        newStudent={newStudent}
        show={show}
        toggleShow={toggleShow}
      />
      {showEditModal && (
        <EditStudentModal
          show={showEditModal}
          toggleShow={toggleEditModal}
          student={student}
          updateStudent={updateStudent}
        />
      )}
    </>
  );
}
