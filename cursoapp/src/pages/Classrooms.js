import { useEffect, useState } from "react";
import AddClassroom from "../components/AddClassroom";
import EditClassroomModal from "../components/EditClassroomModal";
import ErroModalClassroom from "../components/ErroModalClassroom";
import SearchBar from "../components/SearchBar";
import { baseUrl } from "../shared";

export default function Professors() {
  const [classrooms, setClassrooms] = useState([]); //estudantes
  const [classroom, setClassroom] = useState(); //para pegar um unico estudar para editar/deletar
  const [show, setShow] = useState(false); //controla o estado do Modal de adicionar Estudante
  const [showEditModal, setShowEditModal] = useState(false); //controla o estado do Modal de editar/deletar Estudante
  const [searchQuery, setSearchQuery] = useState(""); //pesuisa

  const [errorModalShow, setErrorModalShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function toggleShow() {
    setShow(!show);
  }

  function toggleEditModal() {
    setShowEditModal(!showEditModal);
  }

  function editClassroom(id) {
    fetch(baseUrl + "/classrooms/" + id)
      .then((response) => response.json())
      .then((data) => {
        setClassroom(data.classroom);
        toggleEditModal();
      });
  }

  function toggleShowError() {
    setErrorModalShow(!errorModalShow);
  }

  function updateClassroom(updatedData) {
    fetch(baseUrl + "/classrooms/")
      .then((response) => response.json())
      .then((data) => {
        filter(searchQuery, data.classrooms);
      });
  }

  useEffect(() => {
    updateClassroom();
  }, [searchQuery]); //caso queria reverter só tirar o que ta dentro do []

  const filter = (query, classroomList) => {
    const filtered = classroomList.filter(
      (classroom) =>
        classroom.name.toLowerCase().includes(query.toLowerCase()) ||
        classroom.location.toLowerCase().includes(query.toLowerCase()) ||
        String(classroom.id) == query.toLowerCase()
    );
    setClassrooms(filtered);
  };

  function newClassroom(name, location, size) {
    const data = {
      name: name,
      location: location,
      size: size,
    };
    const url = baseUrl + "/classrooms/";
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
        setClassrooms([...classrooms, data.classroom]);
        updateClassroom();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      <h3 className="mb-5 font-bold">Salas</h3>
      <SearchBar
        onChange={(query) => {
          setSearchQuery(query);
        }}
      />

      <div className="mb-3 shadow-lg overflow-y-auto min-h-[350px] max-h-[350px] max-w-[850px] rounded-xl">
        <div className="flex flex-wrap">
          {classrooms
            ? classrooms.map((classroom) => (
                <div
                  key={classroom.id}
                  className="min-w-[250px] max-w-[250px] m-2 my-2 py-8 px-8 bg-white hover:bg-gray-300 active:bg-violet-700 rounded-lg shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"
                  onClick={() => editClassroom(classroom.id)}
                >
                  <div className="text-left space-y-2 sm:text-left ">
                    <div className="space-y-0.5">
                      <p className="text-lg text-black font-semibold">
                        <span className="inline-block bg-gray-200 rounded-lg px-2 py-1 mr-2">
                          {classroom.id}
                        </span>
                        {classroom.name}
                      </p>
                      <p className="text-slate-500 font-medium">
                        {classroom.location}
                      </p>
                      <p className="text-slate-500 font-medium">
                        {classroom.size}
                        {classroom.size === 1 ? " espaço" : " espaços"}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
      <AddClassroom
        className="mb-3"
        newClassroom={newClassroom}
        show={show}
        toggleShow={toggleShow}
      />
      {showEditModal && (
        <EditClassroomModal
          show={showEditModal}
          toggleShow={toggleEditModal}
          classroom={classroom}
          updateClassroom={updateClassroom}
          showError={errorModalShow}
          toggleShowError={toggleShowError}
          setErrorMessage={setErrorMessage}
        />
      )}
      {errorModalShow && (
        <ErroModalClassroom
          toggleShowError={toggleShowError}
          errorModalShow={errorModalShow}
          errorMessage={errorMessage}
        />
      )}
    </>
  );
}
