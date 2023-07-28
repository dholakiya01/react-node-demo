import React, { useState } from 'react'
import '../App.css'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Validation from './Validation'

function Registerpage() {


    //Hooks **
    const [errors, seterrors] = useState({})
    const [user, setuser] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate()
    //type thay te maate function call kravus **
    const { name, email, password } = user


    //functions inputs  **
    const handlechange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value })
        console.log(e.target.value)
    }
    

    //function login button and validation **
    const handlelogin = async (e) => {
        e.preventDefault();
        const err = Validation(user);
        if (Object.keys(err).length === 0) {
            try {
                const response = await axios.post('http://localhost:4500/post', user);
                console.log(response.data)
                const token = response.data.user.token
                console.log(token)

                localStorage.setItem('user-info',JSON.stringify(user));
                localStorage.setItem('token',JSON.stringify(response.data.user.token));

                navigate('/')
                toast.success("Registrtion successfully")
                
            }
            catch (err) {
                console.log(err)
            }
        }
        else{
            seterrors(err)
            toast.error("Please filed valid details")
        }
    }

    var rootStyle = {
        border: '2px solid black',
        boxShadow: '17px 8px 34px 6px gray',
        margin: '50px auto',

    }

    return (
        <div >

            <div className='container ' style={rootStyle}>
                <div className='row d-flex justify-content-center' style={{ height: '600px' }}>
                    <div className='col-md-6 align-self-center text-center form'>
                        <h2 className='mb-3'>Please Create New account</h2>

                        <form onSubmit={handlelogin}>
                            <label htmlFor=""> UserName</label><br />
                            <input type="text" placeholder='name' name='name' value={name} onChange={handlechange}/><br />
                            {errors.name && <span className='text-danger'>{errors.name}</span>}
                            <br />

                            <label htmlFor="" >Email</label><br />
                            <input type="text" placeholder='Ex: xyz123@gmail.com' name='email' value={email} onChange={handlechange} /><br />
                            {errors.email && <span className='text-danger'>{errors.email}</span>}
                            <br />

                            <label htmlFor="" >Password</label><br />
                            <input type="password" name='password' value={password} placeholder='****' onChange={handlechange} /><br />
                            {errors.password && <span className='text-danger'>{errors.password}</span>}
                            <br />

                            <input type="checkbox"  name="check" style={{ width: '20px' }} />&nbsp;
                            <span>Terms and Condition</span><br />
                            <button className='bg-success text-light border' type='submit'>Register</button>
                        </form>

                    </div>
                    <div className='col-md-5 align-self-center'>
                        <img src="/img/reg.png" alt="register" width={'100%'} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registerpage;