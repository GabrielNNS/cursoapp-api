import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EditStudentModal from "../components/EditStudentModal";

import SearchBar from "../components/SearchBar";
import { baseUrl } from "../shared";

export default function Professors() {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState();
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  function toggleEditModal() {
    setShowEditModal(!showEditModal);
  }

  function editCourse(id) {
    fetch(baseUrl + "/courses/" + id)
      .then((response) => response.json())
      .then((data) => {
        setCourse(data.course);
        toggleEditModal();
      });
  }

  function updateCourse(updatedData) {
    fetch(baseUrl + "/courses/")
      .then((response) => response.json())
      .then((data) => {
        filter(searchQuery, data.courses);
      });
  }

  useEffect(() => {
    updateCourse();
  }, [searchQuery]);

  const filter = (query, professorList) => {
    const filtered = professorList.filter(
      (course) =>
        course.name.toLowerCase().includes(query.toLowerCase()) ||
        course.email.toLowerCase().includes(query.toLowerCase())
    );
    setCourses(filtered);
  };

  return (
    <>
      <h3 className="mb-5 font-bold">Cursos</h3>
      <SearchBar
        onChange={(query) => {
          setSearchQuery(query);
        }}
      />
      <div className="mb-3 shadow-lg overflow-y-auto min-h-[350px] max-h-[350px] rounded-xl">
        <div className="flex flex-wrap">
          {courses
            ? courses.map((course) => (
                <Link className="no-underline  " to={"/courses/" + course.id}>
                  <div
                    key={course.id}
                    className=" min-w-[550px] max-w-[550px] m-2 my-2 py-8 px-8 bg-white hover:bg-gray-300 active:bg-violet-700 rounded-lg shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"
                    onClick={() => editCourse(course.id)}
                  >
                    <div className=" text-left space-y-2 sm:text-left ">
                      <div className="space-y-0.5">
                        <p className=" text-lg text-black font-semibold">
                          <span className="inline-block bg-gray-200 rounded-lg px-2 py-1 mr-2">
                            {course.id}
                          </span>
                          {course.name}
                        </p>
                        <p className="text-slate-500 font-medium">
                          {course.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            : null}
        </div>
      </div>
      <button
        className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mb-5"
        onClick={(e) => {
          navigate("/addcourse/");
        }}
      >
        + Adicionar Curso
      </button>

      {showEditModal && (
        <EditStudentModal
          show={showEditModal}
          toggleShow={toggleEditModal}
          course={course}
          updateCourse={updateCourse}
        />
      )}
    </>
  );
}
