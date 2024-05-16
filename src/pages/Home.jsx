import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/home.css'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import image1 from '../image/home1.jpg'

const Home = () => {
  const [items,setItems] = useState([]);
  const [limit,setLimit] = useState(6);
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("auth"));

  useEffect(()=>{
    async function fetchdata(){
    try{
      const res = await axios.get('https://receipe-zd4n.onrender.com/receipes')

      if (Array.isArray(res.data.data)) {
        const updatedItems = res.data.data.map(item => ({
          ...item,
          rating: item.rating || 0, // Set rating to 0 if undefined
        }));
        setItems(updatedItems);
        // setItems(res.data.data);
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

  const loadMore = () =>{
    setLimit((value)=> value + 6 )
  }

  const handleClick = (itemId) =>{
    navigate('/recipedetails',{state: {value: itemId,items}})
    console.log("sending id",itemId)
  }

  const generateStarRating = (rating) => {
    const filledStars = '★'.repeat(rating || 0);
    const emptyStars = '☆'.repeat(5 - (rating || 0));
    const starRating =  filledStars + emptyStars;
    return starRating.padEnd(5, '☆');
  };

  

  return (
    <>
      <section className='home' id='home'>
        <div className='content'>
          <h3>
            Get Your <span>favourite</span>Recipe
          </h3>
          <p>Discover a World of Flavors with Our Delectable Recipes</p>
          {/* <Link to=''>Explore now</Link> */}
        </div>
      </section>

      {/* cards */}
      <section className='menu'id='menu'>
        <h1 className='heading'>
          Our <span>Recipes</span> 
        </h1>
        <div className='box-container'>
        {items.length === 0 ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
        items.slice(0,limit).map((item)=>(
          <div className='box' key={item.id}>
            <img src={item.imagelink} alt=''/>
            <h3>{item.name}</h3>
            <div className='like-dislike'>
                  <div>
                    <FontAwesomeIcon icon={faThumbsUp} className='like-icon' />
                    <span>{item.likes}</span>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faThumbsDown} className='dislike-icon' />
                    <span>{item.dislikes}</span>
                  </div>
                </div>
                <div className='star-rating'>{generateStarRating(item.rating)}</div>
            {/* <h8>by {userData.user.firstname}</h8> */}
            <button onClick={() => handleClick(item.rid)} key={item.rid}>Read More</button>
          </div>
          ))
        )}
        </div>
          <div className='loadcontainer'>
            <div className='btnload' onClick={loadMore}>Load More</div>
          </div>
      </section>
<section className='review'>
<h1 className='heading'>
        App <span>Review</span> 
</h1>

    <div className='container-fluid'>
<div id="carouselExampleCaptions" className="carousel slide">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
    <img src={image1} class="d-block w-100 h-25" alt="..."/>
      <div className="carousel-caption d-none d-md-block" style={{'top': '20%'}}>

        <div class="profile-header-container">   
    		<div class="profile-header-img">
                <img class="img-circle" src="https://static.vecteezy.com/system/resources/previews/028/597/534/original/young-cartoon-female-avatar-student-character-wearing-eyeglasses-file-no-background-ai-generated-png.png" />
                          </div>
        </div> 

        <h1 className="display-1" style={{'color': 'white'}}>Anwesha Panja</h1>
        <p>Recipsy has made my cooking experience so much easier with its concise and easy-to-follow recipes. The Rasmalai recipe turned out to be a hit at my family dinner, and I appreciate the simplicity and clarity of the instructions. It's now my go-to platform for cooking inspiration!</p>
      </div>
    </div>
    <div className="carousel-item active">
    <img src={image1} class="d-block w-100 h-25" alt="..."/>
      <div className="carousel-caption d-none d-md-block" style={{'top': '20%'}}>

        <div class="profile-header-container">   
    		<div class="profile-header-img">
                <img class="img-circle" src="https://cdn2.vectorstock.com/i/1000x1000/94/86/indian-boy-face-avatar-cartoon-vector-25919486.jpg" />
                          </div>
        </div> 

        <h1 className="display-1" style={{'color': 'white'}}>Arunangshu Das</h1>
        <p>I'm relatively new to cooking, and Recipsy has been a game-changer for me. The Dahi recipe was perfect for a beginner like me – straightforward and with minimal ingredients. The step-by-step instructions made the process smooth, and the end result was a delicious homemade yogurt. Thanks, Recipsy</p>
      </div>
    </div>
    <div className="carousel-item active">
    <img src={image1} class="d-block w-100 h-25" alt="..."/>
      <div className="carousel-caption d-none d-md-block" style={{'top': '20%'}}>

        <div class="profile-header-container">   
    		<div class="profile-header-img">
                <img class="img-circle" src="https://img.freepik.com/premium-vector/cartoon-young-man-glasses-vector-person-illustration-cute-male-portrait_641602-613.jpg?w=2000" />
                          </div>
        </div> 

        <h1 className="display-1" style={{'color': 'white'}}>Suprio Samanta</h1>
        <p>As someone with dietary restrictions, finding recipes that suit my needs can be challenging. Recipsy impressed me with its versatility. The substitution options provided in the recipes allow me to customize dishes according to my preferences. The variety of recipes caters to different tastes, making it an inclusive platform for everyone.</p>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
</div>
</section>

<section className='contact'>
  <div className='contact-container'>
    <h1 className='heading'><span>Connect</span> with us</h1>
    <div className='contact-box'>
     <div className="contact-left">
      <h3>Send your request</h3>
      <form action="https://formspree.io/f/xayreboo" method="POST">
        <div className="input_row">
          <div className="input-group">
            <label>Name</label>
            <input type='text' name='name' placeholder='Enter your Name' autoComplete = "off" required/>
          </div>
          <div className="input-group">
            <label>Phone</label>
            <input type='number' name='phone' placeholder='Enter your Phone No.' autoComplete = "off" required/>
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type='email' name='email' placeholder='Enter your email' autoComplete = "off" required/>
          </div>
          <div className="input-group">
            <label>Your Query</label>
            <textarea name='message' rows='5' placeholder='Your Query! ' autoComplete = "off" required/>
          </div>
        </div>
        <button type="submit" className='contact-btn'>Send</button>
      </form>
     </div>
     <div className="contact-right">
      <h3>Reach Us</h3>
      <table>
        <tr>
          <td>Email</td>
          <td>anikarunangshu@gmail.com</td>
        </tr>
        <tr>
          <td>Phone</td>
          <td>+91 6296248589</td>
        </tr>
        <tr>
          <td>Address</td>
          <td>Kolkata, West Bengal</td>
        </tr>
      </table>
     </div>
    </div>
  </div>
</section>
<div className='footer'>
          <div className="socialIcons">
            <Link to='#'><i className="fa-brands fa-facebook"></i></Link>
            <Link to='#'><i className="fa-brands fa-instagram"></i></Link>
            <Link to='#'><i className="fa-brands fa-linkedin"></i></Link>
            <Link to='#'><i className="fa-brands fa-github"></i></Link>

          </div>
          <div className="footerNav">
            <ul>
              <li><Link to='#'>Home</Link></li>
              <li><Link to='/upload'>Upload</Link></li>
              <li><Link to='/search'>Search</Link></li>
              <li><Link to='#'>Contact us</Link></li>
            </ul>
          </div>
          <div className="footerBottom">
            <p>Copyright &copy;2023; All rights reserved By <span className="company">Recipesy</span></p>
        </div>

</div>

  </>
  )
}

export default Home;
