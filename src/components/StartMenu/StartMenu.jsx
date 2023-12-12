import React from "react";
import "./StartMenu.css";
import { Link } from 'react-router-dom';


function StartMenu() {
  return (
    <div id="startbuttons">
      <h1>Welcome to the game corner!</h1>
      <p>
        Pick a game from the list below and have <span style={{ fontWeight: 1000 }}>fun!</span>
      </p>
      <nav className="menubuttons">
        <Link id="home" className="menu-item" to="/" ><p className='hoverP'>Home</p></Link>
        <Link id="memory" className="menu-item" to="/Memory" ><p className='hoverP'>Memory</p></Link>
        <Link id="geo" className="menu-item" to="/Geo" ><p className='hoverP'>Geography Pairing</p></Link>
        <Link id="math" className="menu-item" to="/Math" ><p className='hoverP'>Math Game</p></Link>
        <Link id="outlineGuess" className="menu-item" to="/Guesser"><p className='hoverP'>Guesser</p></Link>
      </nav>
    </div>
  );
}

export default StartMenu;
