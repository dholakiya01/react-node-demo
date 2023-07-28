import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap'
import axios from 'axios';
import Profilevalidation from './Profilevalidation';
import { toast } from 'react-hot-toast';


function Feedbac() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [user, setuser] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [err, seterrors] = useState({})
  const { name, email, message } = user

  const handlechange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value })
    console.log(e.target.value)
  }

  const handlelogin = async (e) => {
    e.preventDefault()
    const error = Profilevalidation(user)
    if (Object.keys(error).length === 0) {
      try {
        const insert = await axios.post("http://localhost:4500/feedback/post", user)
        console.log(insert.data)
        toast.success('Your Feedback Is Send ')
        setShow(false)
      }
      catch (err) {
        console.log(err)
      }
    }
    else {
      seterrors(error)
      console.log("Please enter vaild Field")
      toast.error("Please Filed vaild data")
    }
  }


  return (
    <>
      <div variant="primary" onClick={handleShow}>Feedback
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form  >

            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type='textd'  autoFocus placeholder='Enter Your Name' name='name' value={name} onChange={handlechange} />
              {err.name && <p style={{color:'red'}}>{err.name}</p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"

                name='email'
                value={email}
                onChange={handlechange}
              />
              {err.email && <p style={{color:'red'}}>{err.email}</p>}
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} name='message' value={message} onChange={handlechange} />
              {err.message && <p style={{color:'red'}}>{err.message}</p>}

            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlelogin}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Feedbac;