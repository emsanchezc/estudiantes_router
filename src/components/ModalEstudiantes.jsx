import React, { useState } from "react";
import { Form, Toast } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { createEstudiante } from "../services/estudiantes";
import Notificacion from "./Notificacion";

function ModalEstudiante() {
  const [show, setShow] = useState(false);
  const [notificacion, setNotificacion] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.target;

    if (form.checkValidity()) {
      const formData = new FormData(form);
      const nuevoEstudiante = Object.fromEntries(formData);

      const fixedEstudiante = {
        ...nuevoEstudiante,
        tipoIdentificacion: parseInt(nuevoEstudiante.tipoIdentificacion),
        numeroIdentificacion: parseInt(nuevoEstudiante.numeroIdentificacion),
        celular: parseInt(nuevoEstudiante.celular),
      };

      try {
        const respuesta = await createEstudiante(token, fixedEstudiante);

        if (respuesta) {
          setNotificacion({
            title: "Felicidades",
            message: "El estudiante ha sido creado correctamente",
          });
        }
      } catch (error) {
        console.log("Error", error.message);
        setNotificacion({
          title: "Error",
          message: error.message,
        });
      } finally {
        setShow(false);
      }
    }

    setValidated(true);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Crear estudiante
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Crear Estudiante</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de documento</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="tipoIdentificacion"
                required
              >
                <option disabled>Seleccionar tipo de documento</option>
                <option value="1">Cédula</option>
                <option value="2">Tarjeta de identidad</option>
                <option value="3">Pasaporte</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Número de identificación</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="1000000000"
                name="numeroIdentificacion"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nombres</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="John"
                name="nombres"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Doe"
                name="apellidos"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Celular</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="3100000000"
                name="celular"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="name@example.com"
                name="correo"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>LinkedIn</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="https://linkedin.com/in/santiagolarae"
                name="linkedin"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>GitHub</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="https://github.com/santiagolarae"
                name="github"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {notificacion ? <Notificacion notificacion={notificacion} /> : null}
    </>
  );
}

export default ModalEstudiante;
