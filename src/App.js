import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import AdminLogin from './Components/AdminLogin';
import UserLogin from './Components/UserLogin';
import Home from './Components/Home';
import UserProfile from './Components/UserProfile';
import ChangePassword from './Components/ChangePassword';
import UpdateUser from './Components/UpdateUser';
import UpdateSelectedUser from './Components/UpdateSelectedUser';
import CreateUser from './Components/CreateUser';
import CreateAdmin from './Components/CreateAdmin';
import Analyze from './Components/Analyze';
import AnalyzeTimeInt from './Components/AnalyzeTimeInt';
import AnalyzeDateInt from './Components/AnalyzeDateInt';
import ViewData from './Components/ViewData';

// cd "c:\Users\gekol\Desktop\app\app-frontend"
// npm start

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/user" element={<UserLogin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path='/updateuser' element={<UpdateUser />} />
          <Route path='/updateselecteduser' element={<UpdateSelectedUser />} />
          <Route path='/createuser' element={<CreateUser />} />
          <Route path='/createadmin' element={<CreateAdmin />} />
          <Route path='/analyze' element={<Analyze />} />
          <Route path='/analyzetimeint' element={<AnalyzeTimeInt />} />
          <Route path='/analyzedateint' element={<AnalyzeDateInt />} />
          <Route path='/viewdata' element={<ViewData />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
