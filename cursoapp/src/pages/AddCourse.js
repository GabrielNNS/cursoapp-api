import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ErroModalCourse from "../components/ErroModalCourse";
import { baseUrl } from "../shared";
let courseVar = null;

export default function Course() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [student, setStudent] = useState([]);
  const [professor, setProfessor] = useState("");
  const [professors, setProfessors] = useState("");
  const [classroom, setClassroom] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [errorModalShow, setErrorModalShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  function toggleShowError() {
    setErrorModalShow(!errorModalShow);
  }

  useEffect(() => {
    fetchProfessors();
  }, [query]);

  function fetchProfessors() {
    fetch(baseUrl + "/professors/")
      .then((response) => response.json())
      .then((data) => {
        filterQuery(query, data.professors);
      });
  }
  const filterQuery = (query, list) => {
    if (query && list) {
      const filtered = list.filter(
        (professor) =>
          professor.name.toLowerCase().includes(query.toLowerCase()) ||
          professor.email.toLowerCase().includes(query.toLowerCase())
      );
      setProfessors(filtered);
    }
  };

  function newCourse() {
    const data = {
      name: name,
      description: description,
      professor: professor,
      classroom: parseInt(classroom),
      student: student,
    };
    const url = baseUrl + "/courses/";
    console.log(data);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            setErrorMessage(data.non_field_errors);
            toggleShowError();
            throw new Error(data.non_field_errors || "Error updating course");
          });
        }
        navigate("/courses/");
        return response.json();
      })
      .then((data) => {
        console.log(data.students);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function handleProfessor(id, name) {
    courseVar = {
      ...courseVar,
      professor: id,
    };
    setProfessor(id);
    setQuery(name);
  }

  return (
    <>
      <div className="max-w-2xl mx-auto mt-4">
        <button
          className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mb-2"
          onClick={newCourse}
        >
          Adicionar
        </button>
        <div className="max-w-2xl mx-auto">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Nome
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <input
              type="text"
              name="price"
              id="price"
              className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Nome"
              defaultValue={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
            Descrição
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Descrição"
            defaultValue={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>

        <div className="max-w-2xl mx-auto">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
            Alunos [por ID]
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Descrição"
            defaultValue={student}
            onChange={(e) => {
              const studentIds = e.target.value
                .split(",") // assuming IDs are separated by commas
                .map((id) => parseInt(id.trim())); // convert each ID to an integer

              setStudent(studentIds);
            }}
          ></textarea>
        </div>
        <div className="flex flex-wrap">
          <div className="max-w-2xl mx-auto">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Professor
            </label>
            <div className="relative w-96 max-w-xl">
              <form className="flex justify-between overflow-hidden rounded-md bg-white shadow shadow-black/200">
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-800 sm:text-sm sm:leading-6"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                ></input>
              </form>
              <div className="absolute mt-2 w-full overflow-y-auto min-h-[20px] max-h-[200px] rounded-md bg-white">
                {professors &&
                  professors.map((professor) => (
                    <div
                      key={professor.id}
                      onClick={() =>
                        handleProfessor(professor.id, professor.name)
                      }
                      className="cursor-pointer py-2 px-3 hover:bg-slate-100"
                    >
                      <p className="text-sm font-medium text-gay-600">
                        {professor.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {professor.specialty}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Sala [por ID]
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                type="text"
                name="price"
                id="price"
                className="block  rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Nome"
                defaultValue={classroom}
                onChange={(e) => {
                  setClassroom(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {errorModalShow && (
        <ErroModalCourse
          toggleShowError={toggleShowError}
          errorModalShow={errorModalShow}
          errorMessage={errorMessage}
        />
      )}
    </>
  );
}
