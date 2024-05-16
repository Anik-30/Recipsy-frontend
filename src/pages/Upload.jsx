import React, { useState } from 'react'
import '../styles/upload.css'
import toast from "react-hot-toast";
import axios from "axios";
const Upload = () => {
  const [name,setName] = useState("");
  const [desc,setDesc] = useState("");
  const [taste,setTaste] = useState("");
  const [imagelink,setImagelink] = useState(null);

  const postedon = new Date().toISOString();



  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{
      const formData = new FormData()
      formData.append("file",imagelink)
      formData.append("upload_preset","up4ibljb")
      formData.append("cloud_name","dd1am9vxu")
      const uploadResult = await axios.post("https://api.cloudinary.com/v1_1/dd1am9vxu/image/upload",formData)
      .then(res=>{
        return res.data.secure_url;
      })
      .catch(err=>{
        console.log(err)
      })

      const res = await axios.post("https://receipe-zd4n.onrender.com/newreceipe",{
        name: name,
        desc: desc,
        taste: taste,
        postedon: postedon,
        imagelink: await uploadResult,
      })
      if(res.data.success){
      setName("");
      setDesc("");
      setTaste("");
      setImagelink(null);
        toast.success("Recipe Uploaded");
      }
    }catch(err){
      toast.error("Sorry! Try again")
      console.log(err)
    }
  }
  return (
    <div className='container1'>
      <form className='uploadform' onSubmit={handleSubmit}>
        <h1>Create Your Recipe</h1>
        <div className='form-box'>
        <input type='text' placeholder='name of the recipe' value={name} onChange={(e) => setName(e.target.value)}/>
        <input type='text' placeholder='taste' value={taste} onChange={(e) => setTaste(e.target.value)}/>
        <input type='file' accept="image/*" alt='image'value={undefined} onChange={(e)=>setImagelink(e.target.files[0])}/>
        <textarea rows='6' cols='50' placeholder='About the recipe' value={desc} onChange={(e) => setDesc(e.target.value)}/>
        <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Upload
