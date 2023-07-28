import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import Feedbac from './Feedbac';

function Dashbord() {

  const navigate = useNavigate()
  const logout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container">
          <Link className="navbar-brand "  to="/dashboard">
            <img src="img/images.jpg" style={{ width: '70px', borderRadius: '1px 68px 130px 12px' }} alt="" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link text-light "  to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light "  to="/profile">Profile</Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link text-light " ><Feedbac/></Link>
              </li>  
              <li className="nav-item ">
                <Link className="nav-link text-light "  to='/list' >List</Link>
              </li>
            </ul>
            <form className="d-flex">
              <button className="btn btn-outline-success " type="button" onClick={logout}>Log Out</button>
            </form>
          </div>
        </div>
      </nav>
      <div className='container mt-5'>

        {/* <h3>Hello World !</h3><hr />
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam minima possimus id sequi deserunt nihil, libero ducimus, iure necessitatibus tenetur cumque quisquam nemo quas deleniti iusto repudiandae provident ipsum? Eaque?</p> */}
      </div>
    </div>
  )
}

export default Dashbord
