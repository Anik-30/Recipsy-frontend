import React, { useState , useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/recipedetails.css";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const RecipeDetails = () => {
  //for get the selected data
  const location = useLocation();
  const itemId = location.state && location.state.value;
  const items = location.state && location.state.items;
  console.log(items);
  const [steps, setSteps] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);
  useEffect( () => {
    // Check if items is defined and contains data
    if (itemId && itemId.length > 0) {
      // Use the itemId to find the selected item
      const foundItem = items.find((item) => item.rid === itemId);
      if (foundItem) {
        console.log('recieved id',foundItem)
        setSelectedItem(foundItem);
        setSteps(paragraphToList(foundItem.desc));
      }
    }

  }, [items, itemId]);

  // const selectedItem = items.find((item) => item.rid === itemId);
  // console.log(selectedItem);

  //like and dislike buton

  const [activeBtn, setActiveBtn] = useState("none");

  //set review

  const [rating, setRating] = useState(null);
  const [review, setReview] = useState("");

  const userData = JSON.parse(localStorage.getItem("auth"));

  //like button
  const handleLikeClick = async () => {
    if (activeBtn === "none") {
      setActiveBtn("like");
      return;
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
      return;
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
    <div className="container mt-5">
      <div className="containerdetails">
        <div className="left">
          <img src={selectedItem.imagelink} className = "img-thumbnail"alt="" />
          <div className="btn-container">
            <button
              onClick={handleLikeClick}
              className={`btn ${activeBtn === "like" ? "like-active" : ""}`}
            >
              Like
            </button>

            <button
              className={`btn ${
                activeBtn === "dislike" ? "dislike-active" : ""
              }`}
              onClick={handleDisikeClick}
            >
              Dislike
            </button>
            {/* star rating */}
            <div>
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
