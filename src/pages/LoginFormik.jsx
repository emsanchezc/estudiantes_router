import React, {useState, useEffect} from 'react';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import { translation } from '../assets/translation';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/slices/auth/AuthSlices';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../services/token';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {

    const dispatch = useDispatch();
    const { lang } = useSelector(state => state.settings);

    const validacionLogin = Yup.object({
        identificacion: Yup.number().required(translation[lang].campoRequerido),
        email: Yup.string().email(translation[lang].emailInvalido).required(translation[lang].campoRequerido),
        aceptaTerminos: Yup.boolean().oneOf([true], translation[lang].aceptaTerminos)
    })

    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/*');
        }
    }, [token, navigate]);

    
    

    const formik = useFormik({
        initialValues: {
            identificacion: '',
            email: '',
            aceptaTerminos: false
        },
        validationSchema: validacionLogin,
        onSubmit: async (values) => {
            const token = await getToken({ identificacion: values.identificacion , correo: values.email });
            dispatch(login({id: values.identificacion, correo: values.email, token}));
            navigate('/*');
        },
    });

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Row>
                <Col md={12}>
                <Card className="p-4 shadow">
                    <Card.Title className="text-center mb-4">{translation[lang].inicioSesion}</Card.Title>
                    <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>{translation[lang].placeHolderId}</Form.Label>
                        <Form.Control
                            name="identificacion"
                            type="number"
                            onChange={ formik.handleChange}
                            value={formik.values.identificacion}
                            placeholder={translation[lang].placeHolderId}
                            isInvalid={formik.errors.identificacion && formik.touched.identificacion}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.identificacion}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>{translation[lang].placeHolderCorreo}</Form.Label>
                        <Form.Control
                            name='email'
                            type="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            placeholder={translation[lang].placeHolderCorreo}
                            isInvalid={formik.errors.email && formik.touched.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formTerminos">
                        <Form.Check
                            name='aceptaTerminos'
                            type="checkbox"
                            onChange={formik.handleChange}
                            checked={formik.values.aceptaTerminos}
                            label={translation[lang].terminos}
                            isInvalid={formik.errors.aceptaTerminos && formik.touched.aceptaTerminos}
                            feedback={formik.errors.aceptaTerminos}
                            feedbackType='invalid'
                        />                        
                    </Form.Group>

                    <Button className="w-100" variant="primary" type="submit">
                        { translation[lang].ingresar }
                    </Button>
                    </Form>
                </Card>
                </Col>
            </Row>
            </Container>

  );
};

export default Login;