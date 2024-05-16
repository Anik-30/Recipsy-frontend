import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";
import ErrorPage from "./pages/ErrorPage";
import Upload from "./pages/Upload";
import { Toaster } from 'react-hot-toast';
import Dashboard from "./pages/Dashboard";
import RecipeDetails from './pages/RecipeDetails'
import Searchresult from "./pages/Searchresult";
const App = () => {

  setInterval(()=>{
    document.title = 'Recipsy - Make your food delicious'
  },2500)
  setInterval(()=>{
    document.title = 'Enjoy every bite'
  },2000)
  return (
    <div>
      <Navbar/>
      <Toaster/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/upload' element={<Upload/>}/>
        <Route path='*' element={<ErrorPage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path="/recipedetails" element={<RecipeDetails/>}/>
        <Route path="/searchresult" element={<Searchresult/>}/>
      </Routes>
    </div>
  );
};

export default App;
