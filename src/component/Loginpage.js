import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import Validation from './Validation';

function Loginpage() {

  const [users, setUers] = useState({
    name: "",
    password: ""
  })


  const navigate = useNavigate()

  const { name, password } = users;
  const [errors, seterrors] = useState({})


  const handleChange = (e) => {
    setUers({ ...users, [e.target.name]: e.target.value })
    console.log({ ...users, [e.target.name]: e.target.value })
  }

  const handlelogin = async (e) => {
    e.preventDefault()
    const errors = Validation(users);
    if (Object.keys(errors).length === 0) {
      try {
        const data = await axios.post("http://localhost:4500/post/login", users)
        console.log(data, "33")
        const token = data.data.token

        localStorage.setItem('user-info', JSON.stringify(users));
        localStorage.setItem('token', JSON.stringify(token));

        toast.success("Loging is successfully")
        if ('user-info') {
          navigate('/dashboard')

        } else {
          navigate('/')
        }
      }
      catch (error) {
        console.log(error)
        toast.error("Enter Valid Email and Password")

      }
    }
    else {
      seterrors(errors)
      toast.error("Please enter valid field")
    }
  }


  // useEffect(()=>{
  //   const userinfo = JSON.parse(localStorage.getItem('user-info'));
  //   if(userinfo){
  //     navigate('/')
  //   }
  // },[navigate])


  return (
    <div className='main'>
      <div className='container border'>
        <div className='row align-items-center'>
          <div className='text-center col-lg-6'>
            <h2 className='mb-4'>Login Page</h2>

            <form onSubmit={handlelogin}>

              <label>Email</label><br />
              <input type="text" id='name' name='name' value={name} onChange={handleChange} placeholder='Ex: xyz123@gmail.com' /><br />
              {errors.name && <span className='text-danger'>{errors.name}</span>}
              <br /><br />
              <label >Password</label><br />
              <input type="password" name='password' value={password} onChange={handleChange} placeholder='Enter Password' /><br />
              {errors.password && <span className='text-danger'>{errors.password}</span>}
              <br /><br />
              <button type='submit' className='btn bg-primary mb-3'>Log in</button>
              <p >Don't have a account?<Link to='register'>  Sign Up</Link></p>
            </form>
          </div>
          <div className='col-lg-6'>
            <img src="img/login.jpg" alt="" width={'100%'} />
          </div>
        </div>
      </div>
    </div>

  )
}

export default Loginpage;


