import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Main from "./components/Main2";
import ProductList from './components/ProductList';
import Rating from './components/Rating';
import Login from './components/Login';
import Signup from './components/Signup';
import About from "./components/About";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* 👇 Route to show ALL pages on "/" */}
        <Route path="/" element={
          <>
            <Main />
            <ProductList />
            <Rating />
            <About />
          </>
        } />

        {/* 👇 Route to show ONLY login page */}
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;

