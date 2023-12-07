import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function EditProfessor(props) {
  const [name, setName] = useState(props.name);
  const [specialty, setSpecialty] = useState(props.specialty);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setName(props.name)
    setShow(true);
  }

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      handleClose();
      event.preventDefault();
      props.updateProfessor(props.id, name);
    }

    setValidated(true);
  };

  return (
    <>
      <button
        onClick={handleShow}
        className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
      >
        Editar
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar</Modal.Title>
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
              <Form.Group as={Col} md="5" controlId="validationCustom02">
                <Form.Label>Especialidade</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Especialidade"
                  defaultValue={specialty}
                />
                <Form.Control.Feedback>Tudo certo!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Endereço</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Endereço"
                  defaultValue={props.adress}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, informar um endereço
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="5" controlId="validationCustom04">
                <Form.Label>Nascimento</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Nascimento"
                  defaultValue={props.birthday}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, informe uma data válida
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="7" controlId="validationCustom05">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  defaultValue={props.email}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, informe um email válido
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom06">
                <Form.Label>Gênero</Form.Label>
                <Form.Select
                  defaultValue={props.gender}
                  aria-label="Default select example"
                >
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                  <option value="O">Outro</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="5" controlId="validationCustom07">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Telefone"
                  defaultValue={props.phone}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, informe um número válido
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button type="submit">Salvar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditProfessor;
