import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function AddProfessor(props) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [size, setSize] = useState("");

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      props.newClassroom(name, location, size);
    }

    setValidated(true);
  };

  return (
    <>
      <button
        className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mb-5"
        onClick={props.toggleShow}
      >
        + Adicionar Sala
      </button>

      <Modal show={props.show} onHide={props.toggleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="name">
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
              <Form.Group as={Col} md="5" controlId="location">
                <Form.Label>Localização</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Localização"
                  defaultValue={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                />
                <Form.Control.Feedback>Tudo certo!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Row className="mb-3">
                <Form.Group as={Col} md="5" controlId="validationCustom07">
                  <Form.Label>Capacidade</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Capacidade"
                    defaultValue={size}
                    onChange={(e) => {
                      setSize(e.target.value);
                    }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor, informe um número válido
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
            </Row>

            <Button type="submit">Salvar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
