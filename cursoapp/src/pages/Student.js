import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Student() {
  const { id } = useParams();
  const [student, setStudent] = useState();
  useEffect(() => {
    fetch("http://localhost:8000/api/v1/students/" + id)
      .then((response) => response.json())
      .then((data) => {
        setStudent(data.students);
      });
  }, []);
  return (
    <>
      <p>{id}</p>
    </>
  );
}
