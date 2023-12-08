import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function AddProfessor(props) {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("M");
  const [adress, setAdress] = useState("");
  const [specialty, setSpecialty] = useState("");

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      event.preventDefault();
      props.newProfessor(
        name,
        email,
        adress,
        phone,
        gender,
        birthday,
        specialty
      );
      setValidated(false);
    }
  };

  return (
    <>
      <button
        className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mb-5"
        onClick={props.toggleShow}
      >
        + Adicionar Professor
      </button>

      <Modal show={props.show} onHide={props.toggleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar</Modal.Title>
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
                  onChange={(e) => {
                    setSpecialty(e.target.value);
                  }}
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
                  onChange={(e) => {
                    setAdress(e.target.value);
                  }}
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
                  onChange={(e) => {
                    setBirthday(e.target.value);
                  }}
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
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />

                <Form.Control.Feedback type="invalid">
                  Por favor, informe um email válido
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom06">
                <Form.Label>Gênero</Form.Label>
                <Form.Select
                  defaultValue={"M"}
                  aria-label="Default select example"
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
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
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
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
