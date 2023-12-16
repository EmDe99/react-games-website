import './Guesser.css';
import { useState, useEffect } from "react";

import swe from '../../assets/countries/sweden.svg';
import nor from '../../assets/countries/norway.svg';
import fin from '../../assets/countries/finland.svg';
import fra from '../../assets/countries/france.svg';
import pol from '../../assets/countries/poland.svg';



function Guesser() {
    let [country, setCountry] = useState();
    let [guess, setGuess] = useState(); 
    let [score, setScore] = useState(0);
    let [guessed, setGuessed] = useState();
    let [startStyle, setStartStyle] = useState({display: 'flex'});
    let [guessAreaStyle, setGuessAreaStyle] = useState({display: 'none'});
    const countries = [{name: "Sweden", svg: swe, guessed: 0}, {name: "Norway", svg: nor, guessed: 0}, {name: "Finland", svg: fin, guessed: 0}, {name: "France", svg: fra, guessed: 0}, {name: "Poland", svg: pol, guessed: 0}];
    let newCountry;
    let currentCountry;

    useEffect(() => {
        currentCountry = Math.floor(Math.random() * countries.length);
        setCountry(countries[currentCountry]);
    }, [])

    const handleGuessInput = (event) => {
        setGuess(event.target.value); 
    }

    function guessLogic() {
        guess = guess.toLowerCase();
        let cName = country.name.toLowerCase();
        console.log(guess);
        console.log(cName);

        if (guess === cName) {
            setScore(score + 1);
            generateRandomCountry();
        } else {
            setScore(score - 1);
        }
    }


    function generateRandomCountry() {
        do {
            newCountry = Math.floor(Math.random() * countries.length);
        } while (newCountry === currentCountry);
        
        setCountry(countries[newCountry]);
    }

    function startGame() {
        setGuessAreaStyle({display: 'flex'});
        setStartStyle({display: 'none'});
    }

    return (
        <div className="guesser">
            <div className="guess-area" style={guessAreaStyle}>
                <h1 >Guess the country</h1>
                <h2>Score: {score}</h2>
                {country && <img id="svg" src={country.svg} alt={country.name} />}
                <input type="text" id="guess-input" placeholder="Guess the country" onChange={handleGuessInput}/>
                <button id="guess-button" onClick={() => guessLogic()}>Guess</button>
            </div>
            <div className='start-area' style={startStyle}>
                <h1 id="guess-h1">Guess The Country Instructions</h1>
                <p id='instructions-text'>Guess the country by typing in the name of the country in the input field and clicking the guess button. If you guess correctly, you will get 1 point. If you guess incorrectly, you will lose 1 point. You can only guess each country once. Good luck!
                <br /><br />Thanks to djaiss for the making the country SVGs!
</p>
                <button id="start-button" onClick={() => startGame()}>Start</button>
            </div>
        </div>
      
    );
    }

export default Guesser;