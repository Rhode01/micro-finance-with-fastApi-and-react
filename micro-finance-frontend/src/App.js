import "./style.css"
import { Routes, Route } from "react-router-dom";
import Login from "./components/Pages/Login/Login";
import Home from "./components/Pages/Home/Home";
import Signup from "./components/Pages/Signup/Signup";
import "./app.css"
import Loan from "./components/Pages/Loan/Loan";
function App() {
  return (
    <Routes>
         <Route exact path="/"element={<Login/>} />
         <Route exact path="/home"element={<Home/>} />
         <Route exact path="/signup"element={<Signup/>} />
         <Route path="/loan" element={<Loan />} />
    </Routes>
  );
}

export default App;
