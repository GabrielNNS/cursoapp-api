import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ErroModalProfessor(props) {
  return (
    <>
      <Modal
        show={props.errorModalShow}
        onHide={() => props.toggleShowError(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Erro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Vínculos ativos com os cursos:</p>
          <p>{props.errorMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => props.toggleShowError(false)}
          >
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
      ;
    </>
  );
}
