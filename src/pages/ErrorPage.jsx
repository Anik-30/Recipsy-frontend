import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/errorpage.css'
import image from "../image/error.jpg"

const ErrorPage = () => {
  return (
    <div class="container2">
    <a href="/" className="brand"><img src={image} width="300" height="auto"/></a>

    <h2 className='ep1'>404</h2>
    <h1 className='ep2'>Page not found.</h1>

    <p className='ep3'>We’re sorry but it appears that we can’t find the page you were looking for. Usually this occurs because of a page that previously existed was removed or you’ve mistyped the address.</p>

    <span className="go-back"><a href="/">Go back</a></span>
  </div>

  )
}

export default ErrorPage
