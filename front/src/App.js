
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Navbar/>
    <Routes>  
 
 <Route path='/' element={<Home />}/>
 <Route path='/:id' element={<Home />}/>
 </Routes>
 </BrowserRouter>
    </div>
  );
}

export default App;
