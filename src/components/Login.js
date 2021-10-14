import React, {useRef} from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { v4 as uuidV4} from 'uuid';

const Login = ({onIdSubmit}) => {
    const idRef = useRef();

    function handleSubmit(e){
        e.preventDefault();
        onIdSubmit(idRef.current.value);
    };

    function createNewId(){
        onIdSubmit(uuidV4());
    }

    return (
    <Container className="align-items-center d-flex" style={{height:'50vh'}}>
            <Form onClick={handleSubmit} className="w-100" >
                <Form.Group>
                    <Form.Label>Enter your ID</Form.Label>
                    <Form.Control type="text" ref={idRef} required />
                </Form.Group>
                <Button type="submit" className="my-3" >Login</Button>
                <Button onClick={createNewId} variant="secondary" className="my-3 mx-2">Create A New Id</Button>
            </Form>
        </Container>
    )
}

export default Login
