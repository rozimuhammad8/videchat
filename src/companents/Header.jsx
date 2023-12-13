import React from 'react'
import x3 from "../3x3.jpg"

function Header() {
  function fn(){
    var allElements = document.querySelectorAll('*');
    var root = document.getElementById("root")
    var mode = document.getElementById("mode")
    if(root.classList == "dark"){
      root.classList.toggle("dark")
      for (var i = 0; i < allElements.length; i++) {
        allElements[i].style.color = 'rgb(43, 43, 43)';
      }
      mode.style.background = "rgb(43, 43, 43)"
      mode.style.color = "rgb(235, 235, 235)"
    }else{
      root.classList.toggle("dark")
      for (var i = 0; i < allElements.length; i++) {
        allElements[i].style.color = 'rgb(235, 235, 235)';
      }
      mode.style.background = "rgb(235, 235, 235)"
      mode.style.color = "rgb(43, 43, 43)"
    }
  }
  return (
    <div className='header'>
        <img src={x3} alt="" className='img' />
        <div className="alar">
            <a href="#">Product</a>
            <a href="#">About</a>
            <a href="#">Contacts</a>
        </div>
        <button onClick={fn} id='mode'>Mode</button>
    </div>
  )
}

export default Header