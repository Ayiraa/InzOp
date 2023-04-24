
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import BookList from './components/Books/Allbooks/BookList';


function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/books' element={<BookList/>}></Route>
    </Routes>
  );
}

export default App;
