import { stack as Menu } from 'react-burger-menu'
import './Nav.css';
import { Link } from 'react-router-dom';


 function Nav () {
    return ( 
      <Menu>
        <Link id="home" className="menu-item" to="/" ><p className='hoverP'>Home</p></Link>
        <Link id="memory" className="menu-item" to="/Memory" ><p className='hoverP'>Memory</p></Link>
        <Link id="geo" className="menu-item" to="/Geo" ><p className='hoverP'>Geography Pairing</p></Link>
        <Link id="math" className="menu-item" to="/Math" ><p className='hoverP'>Math Game</p></Link>
        <Link id="outlineGuess" className="menu-item" to="/Guesser"><p className='hoverP'>Guesser</p></Link>
      </Menu>
    );
  }


export default Nav;