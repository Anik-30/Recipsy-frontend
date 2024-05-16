import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../styles/register.css'
import { toast } from 'react-hot-toast'
const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const submitForm = async(e) =>{
    e.preventDefault();

    console.log(firstname,lastname,email,phoneno,password);
      try{
        const res = await axios.post('https://receipe-zd4n.onrender.com/register',{
          firstname: firstname,
          lastname: lastname,
          email: email,
          phoneno: phoneno,
          password: password,
        });
        if(res.data.success){
          toast.success("Registered Successfully");
          navigate('/');
        }
        localStorage.setItem("auth",JSON.stringify(res.data));
        navigate('/');
      }catch(err){
          toast.error("Something went wrong");
          console.log(err);
      }
  }
  return (

    <div className='registerform'>
    <form className ="registerformbox" action=" " onSubmit={submitForm}>
    <h1 className='text-white'>Register</h1>
    
    <input type="text" name="" id="firstname" placeholder='First Name' autoComplete='off' value={firstname} onChange={(e)=>setFirstname(e.target.value)}/>
    
    <input type="text" name="" id="lastname" placeholder='Last Name' autoComplete='off' value={lastname} onChange={(e)=>setLastname(e.target.value)}/>
    
    <input type="email" name="" id="email" placeholder='Email' autoComplete='off' value={email} onChange={(e)=>setEmail(e.target.value)}/>

    <input type="number" name="" placeholder='Phone no' id="number" autoComplete='off' value={phoneno} onChange={(e)=>setPhoneno(e.target.value)}/>
    
    <input type="password" name="" placeholder='Password' id="password" autoComplete='off' value={password} onChange={(e)=>setPassword(e.target.value)}/>
      
    

    <input type="submit" name="" value="Register"/>
    {/* <div>
          <input type='checkbox' id='acceptTerms' />
          <label htmlFor='acceptTerms'>I am accepting terms & conditions</label>
        </div> */}
    </form>
    </div>
  )
}

export default Register
