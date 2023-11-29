import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../styles/searchresult.css'

const Searchresult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = location.state.query;
  const [searchResults, setSearchResults] = useState([]);
  const [items,setItems] = useState([]);
  console.log("vallue recieved: ", searchQuery);
  console.log(typeof searchQuery === "string");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("vallue recieved: ", searchQuery);
        console.log(typeof searchQuery === "string");

        const res = await axios.post("https://receipe-zd4n.onrender.com/searchreceipe", {
          receipe: searchQuery,
        });

        console.log(res.data.Recipe);
        setSearchResults(res.data.Recipe);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [searchQuery]);
  useEffect(()=>{
    async function fetchdata(){
    try{
      const res = await axios.get('https://receipe-zd4n.onrender.com/receipes')

      if (Array.isArray(res.data.data)) {
        setItems(res.data.data);
        console.log('Received data (array):', res.data );
        
      } else {
        console.error('Received data ', res.data);
      }
    }catch (err) {
      console.log(err);
      
    }
  }
  fetchdata();
  },[])
  console.log(items)

  const handleClick = (itemId) =>{
    navigate('/recipedetails',{state: {value: itemId,items}})
    console.log("sent item",itemId)
  }

  
  return (
    <>
      <div className="box-container">
        {searchResults.map((item) => (
          <div className="box" key={item.id}>
            <img src={item.imagelink} alt="" />
            <h3>{item.name}</h3>
            {/* <h8>by {userData.user.firstname}</h8> */}
            <button onClick={() => handleClick(item.rid)} key={item.rid}>Read More</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Searchresult;