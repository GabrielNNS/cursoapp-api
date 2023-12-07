import { useEffect, useState } from "react";
import AddProfessor from "../components/AddProfessor";
import EditProfessorModal from "../components/EditProfessorModal";
import SearchBar from "../components/SearchBar";
import ErroModalProfessor from "../components/ErroModalProfessor";
import { baseUrl } from "../shared";

export default function Professors() {
  const [professors, setProfessors] = useState([]); //estudantes
  const [professor, setProfessor] = useState(); //para pegar um unico estudar para editar/deletar
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

  function toggleShowError() {
    setErrorModalShow(!errorModalShow);
  }

  function editProfessor(id) {
    fetch(baseUrl + "/professors/" + id)
      .then((response) => response.json())
      .then((data) => {
        setProfessor(data.professor);
        toggleEditModal();
      });
  }

  function updateProfessor() {
    fetch(baseUrl + "/professors/")
      .then((response) => response.json())
      .then((data) => {
        filter(searchQuery, data.professors);
      });
  }

  useEffect(() => {
    updateProfessor();
  }, [searchQuery]); //caso queria reverter só tirar o que ta dentro do []

  const filter = (query, professorList) => {
    const filtered = professorList.filter(
      (professor) =>
        professor.name.toLowerCase().includes(query.toLowerCase()) ||
        professor.email.toLowerCase().includes(query.toLowerCase())
    );
    setProfessors(filtered);
  };

  function newProfessor(
    name,
    email,
    adress,
    phone,
    gender,
    birthday,
    specialty
  ) {
    const data = {
      name: name,
      birthday: birthday,
      address: adress,
      phone: phone,
      email: email,
      gender: gender,
      specialty: specialty,
    };
    const url = baseUrl + "/professors/";
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
        setProfessors([...professors, data.professors]);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      <h3 className="mb-5 font-bold">Professores</h3>
      <SearchBar
        onChange={(query) => {
          setSearchQuery(query);
        }}
      />

      <div className="mb-3 shadow-lg overflow-y-auto min-h-[350px] max-h-[350px] rounded-xl">
        <div className="flex flex-wrap">
          {professors
            ? professors.map((professor) => (
                <div
                  key={professor.id}
                  className="min-w-[250px] max-w-[250px] m-2 my-2 py-8 px-8 bg-white hover:bg-gray-300 active:bg-violet-700 rounded-lg shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"
                  onClick={() => editProfessor(professor.id)}
                >
                  <div className="text-left space-y-2 sm:text-left ">
                    <div className="space-y-0.5">
                      <p className="text-lg text-black font-semibold">
                        <span className="inline-block bg-gray-200 rounded-lg px-2 py-1 mr-2">
                          {professor.id}
                        </span>
                        {professor.name}
                      </p>
                      <p className="text-slate-500 font-medium">
                        {professor.email}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
      <AddProfessor
        newProfessor={newProfessor}
        show={show}
        toggleShow={toggleShow}
      />
      {showEditModal && (
        <EditProfessorModal
          show={showEditModal}
          toggleShow={toggleEditModal}
          professor={professor}
          updateProfessor={updateProfessor}
          showError={errorModalShow}
          toggleShowError={toggleShowError}
          setErrorMessage={setErrorMessage}
        />
      )}

      {errorModalShow && (
        <ErroModalProfessor
          toggleShowError={toggleShowError}
          errorModalShow={errorModalShow}
          message={errorMessage}
          errorMessage={errorMessage}
        />
      )}
    </>
  );
}
