import React, { useEffect, useState } from 'react'
import 'bootstrap'
import Dashbord from './Dashbord'
import axios from 'axios'


const Home = () => {
  const [user, setuser] = useState([]);

  const Fetchdata = async () => {
    try {

      const token = localStorage.getItem('token')
      const userinfo = JSON.parse(localStorage.getItem('user-info'))
      setuser(userinfo)
      const usertoken = JSON.parse(token)
      const resp = await axios.get("http://localhost:4500/get", {
        headers: {
          Authorization: usertoken
        }
      })
      console.log(resp.data)
      setuser(resp.data)


    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    Fetchdata()
  }, [])

  return (
    <>
      <Dashbord />
      <div className="container text-center">
        <h2 >Welcome to {user.name}</h2>
        <h2 className='pb-5'>Your Hobbies </h2>
      {
        user.hobbies && user.hobbies.map((hoby,i)=>(
          <h4 key={i} >{hoby}</h4>
        ))
      }
      </div>
    </>
  )
}

export default Home
