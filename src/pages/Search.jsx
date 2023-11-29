import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/search.css";
import axios from "axios";


const Search = () => {

  const [values, setValues] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    // Navigate to the Searchresult component with the search data as a URL parameter
    console.log('value sent: ',values)
    navigate('/searchresult', { state: { query: values } });
  };

  
  return (
      <div className="search">
        <div className="search_wrap">
          <div className="search_box">
            <input type="text" className="input" placeholder="Search..." value={values} onChange={(e)=>setValues(e.target.value)}/>
            <div className="btn btn_common">
              <i type="submit" className="fas fa-search" onClick={handleSearch}></i>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Search;
