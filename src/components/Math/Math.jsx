import "./Math.css";
import { useState, useEffect } from "react";

function MathGame() {
    const mathModifiers = ["+", "-", "*"];
    const [number1, setNumber1] = useState();
    const [number2, setNumber2] = useState();
    const [numberModifier, setNumberModifier] = useState();
    const [time, setTime] = useState();
    const [gameAreaStyle, setGameAreaStyle] = useState({});
    const [preGame, setPreGameStyle] = useState();
    const [mathOptions, setMathOptions] = useState([]);
    const [mathAnswer, setAnswer] = useState();
    const [mathScore, setMathScore] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [scoreText, setScoreText] = useState({});
    const [timeText, setTimeText] = useState({});
    const [cardStyle, setCardStyle] = useState();
    let answer;

    useEffect(() => {
        generateRandomMathQuestion();
    }, [])

    useEffect(() => {
        if (time > 0) {
            const timerId = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
            return () => clearTimeout(timerId); 
        }

        if (time === 0) {
            setGameAreaStyle({display: 'none'})
            setScoreText({display: 'block'});
            setTimeText({display: 'none'})
        }
    }, [time]);


    function generateRandomMathQuestion() {
        let num1 = Math.floor((Math.random() * 15) + 10);
        let num2 = Math.floor((Math.random() * 11) + 1);
        let modifier = mathModifiers[Math.floor(Math.random() * 3)];

        switch(modifier) {
            case "+":
                answer = num1 + num2;
                setAnswer(num1 + num2);
                break;
            case "-":
                answer = num1 - num2;
                setAnswer(num1 - num2);
                break;
            case "*":
                answer = num1 * num2;
                setAnswer(num1 * num2);
                break;
        }
        setNumber1(num1);
        setNumber2(num2);
        setNumberModifier(modifier);
        setAnswer(answer);
        generateRandomOptions(answer);
    }

    function generateRandomOptions(answer) {
        let option1, option2, option3;

        do {
            option1 = answer + Math.floor(Math.random() * 2);
            option2 = answer + Math.floor(Math.random() * 6);
            option3 = answer - Math.floor(Math.random() * 10);
        } while (option1 === option2 || option1 === option3 || option2 === option3 || option1 === answer || option2 === answer || option3 === answer);

        const mathOptions = [];
        mathOptions.push({value: option1, key: 1}, {value: option2, key: 2}, {value: option3, key: 3}, {value: answer, key: 4});
        randomize(mathOptions);
        setMathOptions(mathOptions);
    }

    function gameLogic(value) {
        console.log(value)
        console.log(mathAnswer)
        
        if (value === mathAnswer) {
            // TODO: Show the user if their answer is correct or not 
            setMathScore(mathScore + 1);
        } 
        setAttempts(attempts + 1);
        generateRandomMathQuestion();
        
    }

    function startGame() {
        setPreGameStyle({display: 'none'})
        setGameAreaStyle({display: 'block'})
        setTime(30);
        setTimeText({display: 'block'})
    }

    return (
        <div id="overlay">
            <div id="pre-game" style={preGame}>
                <h1 id="about-title">Math Game Instructions</h1>
                <p id="instruct-text">Welcome to the Math game! This game will test your math quick thinking.
                You will have 30 seconds to answer as many math problems as possible. When you click the
                start button, the game will immediately. Good luck!</p>
                <button id="start-button" onClick={() => startGame()}>Start</button>
            </div>
            <div id="math-game-area" style={gameAreaStyle}>
                <p id="pQuestion">What is {number1}{numberModifier}{number2}?</p>
                <div id="options">
                    {mathOptions.map((option)=> {
                        return ( 
                        <div onClick={() => gameLogic(option.value)}
                             className="mathOptions">
                             style={}   
                                <p>{option.value}</p>
                         </div>
                        )
                    })}
                </div>
            </div>
            <p id="timer" style={timeText}>{time} Seconds Left</p>
            <div id="score" style={scoreText}>
                <p id="score-text" >You answered {mathScore} out of {attempts} correctly!</p>
            </div>
        </div>
    );
}

function randomize(options){
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      return options
  }

export default MathGame;