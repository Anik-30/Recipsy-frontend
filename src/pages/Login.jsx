import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import "../styles/login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [auth,setAuth] = useAuth()

  const navigate = useNavigate();
  const submitForm = async (e) => {
    e.preventDefault();

    console.log(email, password);
    try {
      const res = await axios.post("https://receipe-zd4n.onrender.com/login", {
        email: email,
        password: password,
      });
      if (res.data.success) {
        toast.success("Login Successfully");
        navigate("/");
      }
      localStorage.setItem("auth",JSON.stringify(res.data));
      navigate('/');
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    }
  };
  return (
    <div className="loginform">
      <form className="formbox" action=" " onSubmit={submitForm}>
        <h1 className="text-white">Login</h1>

        <input
          type="email"
          name=""
          id="email"
          placeholder="Username"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          name=""
          placeholder="Password"
          id="password"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="submit" name="" value="Login" />
      </form>
    </div>
  );
};

export default Login;
