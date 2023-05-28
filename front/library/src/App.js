import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import BookList from './components/books/allbooks/booklst'
import Home from './components/home/home';
import Profile from './components/profile/profile';
import Borrows from './components/borrows/borrows';
import Usrs from './components/usrs/usrs';
import Register from './components/register/register';
import {NavbarLogIn, NavbarLogOut} from './components/utils/Navbar';
import useToken from './useToken';

function App() {
  const { token, setToken } = useToken();
  if(token) {
    return (
            <>
                <NavbarLogIn/>
                <Routes>
                  <Route path='/' element={<Home/>}/>
                  <Route path='/books' element={<BookList/>}></Route>
                  <Route path="/profile" element={<Profile/>} />
                  <Route path="/borrows" element={<Borrows/>} />
                  <Route path="/usrs" element={<Usrs/>} />
                </Routes>
            </>
        )
  } else {
        return (
            <>
                <NavbarLogOut/>
                <Routes>
                  <Route path='/' element={<Home/>}/>
                  <Route path='/books' element={<BookList/>}></Route>
                  <Route path="/profile" element={<Profile/>} />
                  <Route path="/login" element={<Login setToken={setToken} />} />{" "}
                  <Route path="/register" element={<Register/>} />
                </Routes>
            </>
        );
  }




}

export default App;
