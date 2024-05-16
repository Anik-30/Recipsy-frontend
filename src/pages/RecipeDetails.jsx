import React, { useState , useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/recipedetails.css";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const RecipeDetails = () => {
  //for get the selected data
  // const location = useLocation();
  // const itemId = location.state && location.state.value;
  // const items = location.state && location.state.items;
  // console.log(itemId);
  const [steps, setSteps] = useState([]);
  const location = useLocation();
  const itemId = location.state && location.state.value;
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("auth"));
      
        const uid = user.user.uid;
        if (itemId && itemId.length > 0) {
          const response = await axios.post(`https://receipe-zd4n.onrender.com/getreceipe`,{
            'rid': itemId,
            'uid': uid,
          });
          const foundItem = response.data; 

          if (foundItem) {
            console.log('received data', foundItem);
            setSelectedItem(foundItem.recipe);

            setSteps(paragraphToList(foundItem.recipe.desc));

            // Check if the recipe is liked or disliked
            setLikeStatus(foundItem.like);
            setDislikeStatus(foundItem.dislike);
            console.log("rating",Math.floor(foundItem.recipe.rating))
            setRating(Math.floor(foundItem.recipe.rating) || 0);
            // Set the active button based on the initial state
            if (foundItem.like) {
              setActiveBtn("like");
            } else if (foundItem.dislike) {
              setActiveBtn("dislike");
            }
          }
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
        // Handle the error as needed
      }
    };
  
    fetchData(); // Call the async function
  
  }, [itemId]);

 


  //like and dislike buton

  const [activeBtn, setActiveBtn] = useState("none");
  const [likeStatus, setLikeStatus] = useState(false);
  const [dislikeStatus, setDislikeStatus] = useState(false);

  //set review

  const [rating, setRating] = useState(null);
  const [review, setReview] = useState("");

  const userData = JSON.parse(localStorage.getItem("auth"));

  //like button
  const handleLikeClick = async () => {
    if (activeBtn === "none") {
      setActiveBtn("like");
      setLikeStatus(true);
    }

    if (dislikeStatus) {
      setDislikeStatus(false);
    }

    try {
      const res = await axios.post(
        "https://receipe-zd4n.onrender.com/addlike",
        {
          rid: selectedItem.rid,
          uid: userData.user.uid,
        }
      );
      // console.log("likecount: ",res.data);
    } catch (err) {
      console.log(err);
    }
  };

  

  const paragraphToList = (paragraph) => {
    var sentences = paragraph.split(/[.!?]/);

  // Remove any leading or trailing whitespace from each sentence.
  sentences = sentences.map(function (sentence) {
    return sentence.trim();
  });

  // Filter out any empty sentences (caused by consecutive punctuation marks).
  sentences = sentences.filter(function (sentence) {
    return sentence.length > 0;
  });

  return sentences;
  }

  //dislike button
  const handleDisikeClick = async () => {
    if (activeBtn === "none") {
      setActiveBtn("dislike");
      setDislikeStatus(true);
    }

    if (likeStatus) {
      setLikeStatus(false);
    }

    try {
      const res = await axios.post(
        "https://receipe-zd4n.onrender.com/adddislike",
        {
          rid: selectedItem.rid,
          uid: userData.user.uid,
        }
      );
      console.log("dislikecount: ", res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Send rating value
  const sendRatingToBackend = async (ratingValue) => {
    try {
      const res = await axios.post(
        "https://receipe-zd4n.onrender.com/updateratereceipe",
        {
          rid: selectedItem.rid,
          uid: userData.user.uid,
          newRating: ratingValue,
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (!selectedItem) {
    return <div>Loading...</div>; // Or any other appropriate message or loading state
  }


  return (
    <>
    <div className="container">
      <div className="containerdetails">
        <div className="left">
          <img src={selectedItem.imagelink} className = "imga img-thumbnail"alt="" />
          <div className="btn-container">
            <button
              onClick={handleLikeClick}
              className={`btn ${activeBtn === "like" ? "like-active" : ""}`}
              style={{ backgroundColor: likeStatus ? "#c1690c" : " " }}
            >
              Like
            </button>

            <button
              onClick={handleDisikeClick}
              className={`btn ${
                activeBtn === "dislike" ? "dislike-active" : ""
              }`}

              style={{ backgroundColor: dislikeStatus ? "#ffc107" : " " }}
            >
              Dislike
            </button>

            {/* star rating */}
            <div className="starrating">
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => {
                        setRating(ratingValue);
                        console.log("Rating set to:", ratingValue);
                        sendRatingToBackend(ratingValue);
                      }}
                    />
                    
                    <FaStar
                      className="star"
                      color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                      size={25}
                    />
                  </label>
                );
              })}
            </div>

          </div>
        </div>
        <div className="right">
          <h1>{selectedItem.name}</h1>
          <br />
          <h4>Taste : {selectedItem.taste}</h4>
          <br />
          <h4>Steps</h4>
          {steps.map((step)=>(
          <p className="w-75 steps">{step}</p>
          ))}
          <input
            type="textarea"
            name="review"
            value={review}
            onChange={() => setReview(review)}
          />
        </div>
      </div>
      </div>
    </>
  );
};

export default RecipeDetails;
