import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { baseUrl } from "../shared";

export default function EditStudentModal(props) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [adress, setAdress] = useState("");

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (props.student) {
      const { id, name, birthday, phone, email, gender, address } =
        props.student;
      setId(id || "");
      setName(name || "");
      setBirthday(birthday || "");
      setPhone(phone || "");
      setEmail(email || "");
      setGender(gender || "");
      setAdress(address || "");
    }
  }, [props.student]);

  function updateStudent() {
    const url = baseUrl + "/students/" + id;
    const updatedData = {
      name: name,
      birthday: birthday,
      address: adress,
      phone: phone,
      email: email,
      gender: gender,
    };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        props.updateStudent();
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
      updateStudent();
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
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="address">
                <Form.Label>Endereço</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Endereço"
                  defaultValue={adress}
                  required
                  onChange={(e) => {
                    setAdress(e.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, informar um endereço
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="5" controlId="birthday">
                <Form.Label>Nascimento</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Nascimento"
                  value={birthday}
                  required
                  onChange={(e) => {
                    setBirthday(e.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, informe uma data válida
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="7" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  defaultValue={email}
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Por favor, informe um email válido
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="gender">
                <Form.Label>Gênero</Form.Label>
                <Form.Select
                  value={gender}
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
              <Form.Group as={Col} md="5" controlId="phone">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Telefone"
                  defaultValue={phone}
                  required
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
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
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mb-2 m-3"
              onClick={(e) => {
                const url = baseUrl + "/students/" + id;
                fetch(url, {
                  method: "DELETE",
                })
                  .then((response) => {
                    if (!response.ok) {
                      throw new Error("Algo deu errado");
                    }
                    props.toggleShow();
                    props.updateStudent();
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
