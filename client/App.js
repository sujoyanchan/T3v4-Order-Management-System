import './App.css';
import Order from './Order';
import NavBar from './NavBar';
import Home from './Home';
import Login from './Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
<>
<BrowserRouter>
<NavBar/>
<Routes>
  <Route path='/' element={<Order/>}/>
  <Route path='/admin' element={<Login/>}/>
  <Route path='/home' element={<Home/>}/>
  <Route path='*' element={ <Order/> }/>
</Routes>
</BrowserRouter>
</>
  );
}

export default App;
