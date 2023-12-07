import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { baseUrl } from "../shared";

export default function EditClassroomModal(props) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [size, setSize] = useState("");

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    console.log("useEffect is running!");
    console.log("props.classroom:", props.classroom);

    if (props.classroom) {
      const { id, name, location, size } = props.classroom;
      setId(id || "");
      setName(name || "");
      setLocation(location || "");
      setSize(size || "");
    }
  }, [props.classroom]);

  function updateClassroom() {
    const url = baseUrl + "/classrooms/" + id;
    const updatedData = {
      name: name,
      location: location,
      size: size,
    };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        props.updateClassroom();
        props.toggleShow();
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch();
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      updateClassroom();
      event.preventDefault();
      console.log(id);
    }

    setValidated(true);
  };

  return (
    <>
      <Modal show={props.show} onHide={props.toggleShow}>
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="inline-block bg-gray-200 rounded-lg px-2 py-1 mr-2">
              {id}
            </span>
            Editar
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nome"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <Form.Control.Feedback>Tudo certo!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="5" controlId="validationCustom04">
                <Form.Label>Localização</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Localização"
                  defaultValue={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, informe uma data válida
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="5" controlId="validationCustom07">
                <Form.Label>Capacidade</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Capacidade"
                  defaultValue={size}
                  onChange={(e) => {
                    setSize(e.target.value);
                  }}
                  readOnly
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, informe um número válido
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <button
              className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mb-2"
              type="submit"
            >
              Editar
            </button>

            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mb-2 m-3"
              onClick={(e) => {
                const url = baseUrl + "/classrooms/" + id;
                fetch(baseUrl + "/courses/", {})
                  .then()
                  .then();
                fetch(url, {
                  method: "DELETE",
                })
                  .then((response) => {
                    if (response.status === 409) {
                      return response.json().then((data) => {
                        props.setErrorMessage(
                          Array.isArray(data) ? data.join("; ") : String(data)
                        );
                        props.toggleShowError(true);
                        props.toggleShow();
                      });
                    } else {
                      props.toggleShow();
                      props.updateClassroom();
                    }
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              }}
            >
              Deletar
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
