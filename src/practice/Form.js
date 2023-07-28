import axios from 'axios';
import React, { useState } from 'react'

function Form() {
  const [user, setuser] = useState({
    email: '',
    password: ''
  })
  const { email, password } = user;


  const handlechange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value })
    console.log(user)
  };

  async function handlelogin(e) {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:5000/postuser', user)
      if (response.data) {
        localStorage.setItem('user-info', JSON.stringify(user))
        console.log(response.data.user)
        console.log(response.data)
      }
      else {
        console.log('enter vaild value')
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <div style={{ textAlign: 'center', margin: '150px 0' }}>
      <input type="text" name='email' value={email} onChange={handlechange} /><br /><br /><br />
      <input type="password" name='password' value={password} onChange={handlechange} /><br /><br /><br />
      <button type='button' onClick={handlelogin}>login</button>
    </div>
  )
}

export default Form
