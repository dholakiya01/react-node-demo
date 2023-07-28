import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Loginpage from "./component/Loginpage"
import Dashbord from './component/Dashbord';
import Form from './practice/Form';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Registerpage from './component/Registerpage';
import Profile from './component/Profile';
import Home from './component/Home';
import { Toaster } from 'react-hot-toast';
import Feedbac from './component/Feedbac';
import List from './component/List';

function App() {
  return (
    <>
   
    <Router>
      <Routes>
        <Route path='/' element={<Loginpage name='' age='10'/>}/>
        <Route path='/dashboard' element={<Dashbord/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/register' element={<Registerpage/>}/>
        <Route path='/form' element={<Form/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/feedback' element={<Feedbac/>} />
        <Route path='/list' element={<List/>} />
        <Route path='/*' element={<h2>404 page not found</h2>}/>
      </Routes>
      <Toaster/>
    </Router>
  
    </>
  );
}

export default App;
