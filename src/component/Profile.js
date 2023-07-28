import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/profile.css'
import Dashbord from './Dashbord'
import toast  from 'react-hot-toast';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Profilevalidation from './Profilevalidation'

const Profile = () => {

    const [user, setuser] = useState({
        name: '',
        email: '',
        hobbies: [],
    })
    const [error, seterror] = useState({})

    const navigate = useNavigate()
    const handlechange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value })
        console.log({ ...user, [e.target.name]: e.target.value })
    };

    const chakevaluebox = (e) => {
        const { name, value, checked } = e.target;
        console.log(`${value} is ${checked}`);
        if (checked) {
            setuser({ ...user, [name]: [...user[name], value] });
        } else {
            let finalvalue = user && user[name].filter((e) => e !== value)
            setuser({ ...user, [name]: finalvalue })

        }
    }
    

    //data get **
    const Fetchuser = async () => {
        try {
            const token = localStorage.getItem('token')
            const usertoken = JSON.parse(token)

            const resp = await axios.get("http://localhost:4500/get", {
                headers: {
                    Authorization: `${usertoken}`
                }
            })
            console.log(resp.data)
            setuser(resp.data)

        } catch (Err) {
            console.log({ Err: Err.message })
        }
    }
    useEffect(() => {
        Fetchuser()
    }, [])

    //update data ** 
    const handlesubmit = async (e) => {
        e.preventDefault();
        const error = Profilevalidation(user)
        if (Object.keys(error).length === 0) {

            try {
                const res = await axios.put("http://localhost:4500/profile/put", user)
                console.log(res)
                setuser(res.data)
                localStorage.setItem("user-info", JSON.stringify(res))
                navigate('/home')
                toast.success("profile successfully")
                
               

            } catch (err) {
                console.log(err);
            }
        } else {
            seterror(error)
            toast.error('Profile is faild')
        }

    }


    return (
        <>
            <Dashbord />
            <div className="main">
                <div className="container">
                    <div className="col-md-12 col-sm-6 text-center" >
                        <h3 className='pb-3'>Profile</h3>
                        <form onSubmit={handlesubmit} className='check' >
                            <div className="inputbox">

                                <label htmlFor="">Name</label><br />
                                <input type="text" name="name" id="name" value={user.name} placeholder='Enter Name' onChange={handlechange} /><br />
                                {error.name && (<p style={{ color: "red" }}>{error.name}</p>)}
                                <br />

                                <label htmlFor="">Email</label><br />
                                <input type="email" name="email" id="email" value={user.email} onChange={handlechange} placeholder='Enter Email' /><br />
                                {error.email && (<p style={{color:'red'}}>{error.email}</p>)}
                                <br />
                            </div>

                            <div className="check" >

                                <input type="checkbox" value='music' name="hobbies" id=""
                                    onChange={chakevaluebox} checked={user?.hobbies?.includes('music')} />

                                <label htmlFor="">music</label>
                                <input type="checkbox" value='play' name="hobbies" id=""
                                    onChange={chakevaluebox} checked={user?.hobbies?.includes('play')} />

                                <label htmlFor="">play</label>
                                <input type="checkbox" value='traveling' name="hobbies" id="" onChange={chakevaluebox} checked={user?.hobbies?.includes('traveling')} />

                                <label htmlFor="">traveling</label>
                            </div>
                            <button type='submit'>Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Profile

