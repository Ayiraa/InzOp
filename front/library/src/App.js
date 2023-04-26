
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import BookList from './components/Books/Allbooks/BookList';
import Home from './components/home/home';
import Navbar from './components/utils/Navbar';


function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='' element={<Home/>}/>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/books' element={<BookList/>}></Route>
    </Routes>
    </>
  );
}

export default App;
