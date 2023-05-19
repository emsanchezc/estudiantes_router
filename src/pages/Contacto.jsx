import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Contacto = () => {

    const [formState, setFormState] = useState({
        nombre: '',
        identificacion: '',
        correo: '',
        celular: ''
    });

    const [errors, setErrors] = useState({
        nombre: null,
        identificacion: null,
        correo: null,
        celular: null
    });

    const cambiarInput = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });

    };

    const enviarFormulario = (e) => {
        e.preventDefault();
        const nuevosErrores = validarFormulario();
        console.log(nuevosErrores);
        if(Object.keys(nuevosErrores).length > 0) {
            setErrors(nuevosErrores);
            return;
        }else{
            alert('Formulario enviado con éxito!!!');
        }


    };

    const validarFormulario = () => {
        const nuevosErrores = {};

        if( !formState.nombre.trim() || formState.nombre === '' ) {
            nuevosErrores.nombre = 'El campo nombre es obligatorio';
        }

        if( !formState.identificacion.trim() || formState.identificacion === '' ) {
            nuevosErrores.identificacion = 'El campo identificación es obligatorio';
        }

        if( !formState.correo.trim() || !formState.correo.includes('@') ) {
            nuevosErrores.correo = 'Correo invalido';
        }else if( !formState.correo.includes('.') ) {
            nuevosErrores.correo = 'Correo invalido';
        }

        if( !formState.celular.trim() || formState.celular.length !== 10 ) {
            nuevosErrores.celular = 'El campo celular es obligatorio y debe tener 10 dígitos';
        }

        return nuevosErrores;

    };

    return (
        <Form onSubmit={ enviarFormulario }>
            <Form.Group controlId="formNombre">
                <Form.Label htmlFor="formNombre">Nombre: </Form.Label>
                <Form.Control 
                    type="text" 
                    name="nombre" 
                    value={ formState.nombre } 
                    onChange={ cambiarInput } 
                    placeholder="Ingrese su nombre" 
                    isInvalid={ errors.nombre }/>
                <Form.Control.Feedback type="invalid">{ errors.nombre }</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='formIdentificacion'>
                <Form.Label htmlFor='formIdentificacion'>Identificación: </Form.Label>
                <Form.Control 
                    type="text" 
                    name="identificacion" 
                    value={ formState.identificacion } 
                    onChange={ cambiarInput } 
                    placeholder="Ingrese su identificación"
                    isInvalid={ errors.identificacion } />
                <Form.Control.Feedback type="invalid">{ errors.identificacion }</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='formCorreo'>
                <Form.Label htmlFor='formCorreo'>Correo: </Form.Label>
                <Form.Control 
                    type="text" 
                    name="correo" 
                    value={ formState.correo } 
                    onChange={ cambiarInput } 
                    placeholder="Ingrese su correo" 
                    isInvalid={ errors.correo } />
                <Form.Control.Feedback type="invalid">{ errors.correo }</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId='formCelular'>
                <Form.Label htmlForm="formCelular">Celular: </Form.Label>
                <Form.Control 
                    type="text" 
                    name="celular" 
                    value={ formState.celular} 
                    onChange={ cambiarInput } 
                    placeholder="Ingrese su celular" 
                    isInvalid={ errors.celular } />
                <Form.Control.Feedback type="invalid">{ errors.celular }</Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" variant="outline-primary">
                Enviar
            </Button>
        </Form>
    );
};

export default Contacto;
