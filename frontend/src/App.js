import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login1 from './pages/Login1';
import Register1 from './pages/Register1';
import Register2 from './pages/Register2';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Login2 from './pages/Login2';

function App() {
  
  return (
    <>
    <Router>  
      <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login/step1" element={<Login1 />}></Route>
          <Route path="/login/step2" element={<Login2 />}></Route>
          <Route path="/register/step1" element={<Register1 />}></Route>
          <Route path="/register/step2" element={<Register2 />}></Route>
          <Route path="/about" element={<AboutUs />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
        </Routes>
      <Footer />
    </Router>
    </>
  );
}

export default App;
