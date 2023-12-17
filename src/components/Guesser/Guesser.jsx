import './Guesser.css';
import { useState, useEffect, useRef } from "react";

import swe from '../../assets/countries/sweden.svg';
import nor from '../../assets/countries/norway.svg';
import fin from '../../assets/countries/finland.svg';
import fra from '../../assets/countries/france.svg';
import pol from '../../assets/countries/poland.svg';
import irq from '../../assets/countries/iraq.svg';
import jpn from '../../assets/countries/japan.svg';
import aus from '../../assets/countries/australia.svg';
import can from '../../assets/countries/canada.svg';
import den from '../../assets/countries/denmark.svg';
import ger from '../../assets/countries/germany.svg';
import gre from '../../assets/countries/greece.svg';
import ita from '../../assets/countries/italy.svg';
import bra from '../../assets/countries/brazil.svg';
import usa from '../../assets/countries/usa.svg';
import hrt from '../../assets/hearts/heart.svg';

function Guesser() {
    let [country, setCountry] = useState();
    let [guess, setGuess] = useState(); 
    let [score, setScore] = useState(0);
    let [currentCountryIndex, setCurrentCountryIndex] = useState();
    let [startStyle, setStartStyle] = useState({display: 'flex'});
    let [guessAreaStyle, setGuessAreaStyle] = useState({display: 'none'});
    let [guessedCountries, setGuessedCountries] = useState([]);
    let [lives, setLives] = useState(3);
    const click = useRef(null);
    const countries = [{name: "Sweden", svg: swe}, {name: "Norway", svg: nor}, {name: "Finland", svg: fin}, {name: "France", svg: fra}, {name: "Poland", svg: pol}, 
                       {name: "Iraq", svg: irq}, {name: "Japan", svg: jpn}, {name: "Australia", svg: aus}, {name: "Canada", svg: can}, {name: "Denmark", svg: den}, 
                       {name: "Germany", svg: ger}, {name: "Greece", svg: gre}, {name: "Italy", svg: ita}, {name: "Brazil", svg: bra}, {name: "USA", svg: usa}];
    let newCountry;
    let currentCountry;


    useEffect(() => {
        let randomIndex = Math.floor(Math.random() * countries.length);
        setCurrentCountryIndex(randomIndex);
        setCountry(countries[randomIndex]);
    }, []);

    const handleGuessInput = (event) => {
        setGuess(event.target.value); 
    }

    function guessLogic() {
        if (guess === undefined){
            alert("You need to guess a country!")
            return
        }
        guess = guess.toLowerCase();
        let cName = country.name.toLowerCase();

        if (guess === cName) {
            setScore(score + 1);
            if (guessedCountries.length === countries.length - 1) {
                alert("You have guessed all the countries!");
                setGuessAreaStyle({display: 'none'});
                setStartStyle({display: 'flex'});
                setGuessedCountries([]);
                setLives(3)
                setScore(0);
                return;
            }
            generateRandomCountry();
        } else {
            setLives(lives - 1);

            if (lives < 2) {
                alert("You have no more lives! Try again!");
                setGuessAreaStyle({display: 'none'});
                setStartStyle({display: 'flex'});
                setGuessedCountries([]);
                setLives(3)
                setScore(0);
                return;
            }
        }
    }


    function generateRandomCountry() {
        setGuessedCountries([...guessedCountries, {id: currentCountryIndex}]);
        console.log(currentCountryIndex);
        console.log(guessedCountries);

        do {
            newCountry = Math.floor(Math.random() * countries.length);
        } while (newCountry === currentCountryIndex || guessedCountries.some((country) => country.id === newCountry));
        setCurrentCountryIndex(newCountry);
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
                <h2>Country: {score}/{countries.length - 1}</h2>
                {country && <img id="svg" src={country.svg} alt={country.name} />}
                <div id="heart-container">
                {Array.from({length: lives }, (_, i) => (
                    <img key={i} id="heart" src={hrt} alt="heart" />
                ))}
                </div>
                <input type="text" id="guess-input" placeholder="Guess the country" onChange={handleGuessInput} ref={click} />
                <button id="guess-button" onClick={guessLogic}>Guess</button>
            </div>
            <div className='start-area' style={startStyle}>
                <h1 id="guess-h1">Guess The Country</h1>
                <p id='instructions-text'>Guess the country by typing in the name of the country in the input field and clicking the guess button. 
                                          There is 15 countries to guess and you have a total of 3 lives.  Good luck!
                    <br /><br />Thanks to djaiss for the making the country SVGs!
                </p>
                <button id="start-button" onClick={startGame}>Start</button>
            </div>
        </div>
      
    );
    }

export default Guesser;