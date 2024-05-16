import React,{useEffect, useState} from 'react'
import '../styles/dashboard.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const Dashboard = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("auth"));

  useEffect(()=>{
    
    if(userData){
    const {firstname,lastname,email,phoneno}=userData.user
    setFirstname(firstname)
    setLastname(lastname)
    setEmail(email)
    setPhoneno(phoneno)
    }
  },[])

  const submitForm = async(e) =>{
    e.preventDefault();

    console.log(firstname,lastname,email,phoneno,password);
    try {
      const { data } = await axios.put('https://receipe-zd4n.onrender.com/update', {
        firstname: firstname,
        lastname: lastname,
        email: email,
        phoneno: phoneno,
        password: password,
      });
  
      if (data?.error) {
        toast.error(data?.error);
      } else {

        const updatedUserData = {
          user: {
            firstname: firstname,
            lastname: lastname,
            email: email,
            phoneno: phoneno,
          },
        };
  
        localStorage.setItem("auth", JSON.stringify(updatedUserData));
  
        toast.success("Profile Updated");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    }
  }
  return (
    <div className='registerform'>
    <form className ="registerformbox" action=" " onSubmit={submitForm}>
    <h1 className='text-white'>User Profile</h1>
    
    <input type="text" name="" id="firstname" placeholder='First Name' autoComplete='off' value={firstname} onChange={(e)=>setFirstname(e.target.value)}/>
    
    <input type="text" name="" id="lastname" placeholder='Last Name' autoComplete='off' value={lastname} onChange={(e)=>setLastname(e.target.value)}/>
    
    <input type="email" name="" id="email" placeholder='Email' autoComplete='off' value={email} onChange={(e)=>setEmail(e.target.value)} disabled/>

    <input type="number" name="" placeholder='Phone no' id="number" autoComplete='off' value={phoneno} onChange={(e)=>setPhoneno(e.target.value)}/>
    
    <input type="password" name="" placeholder='Password' id="password" autoComplete='off' value={password} onChange={(e)=>setPassword(e.target.value)}/>
      
    

    <input type="submit" name="" value="Update"/>
    </form>
    </div>
  )
}

export default Dashboard
