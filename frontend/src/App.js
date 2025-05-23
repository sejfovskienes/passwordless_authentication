import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Buffer } from "buffer";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login1 from './pages/Login1';
import Login2 from './pages/Login2';
import Register1 from './pages/Register1';
import Register2 from './pages/Register2';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import FaceScan from './services/FaceScan';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './components/context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
window.Buffer = Buffer;


function App() {
  
  return (
    <>
      <AuthProvider>
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
              <Route path="/face-scan" element={<FaceScan />} />
              <Route element={< PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
            </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
