import "./Math.css";
import { useState, useEffect } from "react";

function MathGame() {
    const mathModifiers = ["+", "-", "*", "/"];
    const [number1, setNumber1] = useState();
    const [number2, setNumber2] = useState();
    const [numberModifier, setNumberModifier] = useState();
    const [answer, setAnswer] = useState();
    const [userAnswer, setUserAnswer] = useState();
    const [time, setTime] = useState();
    const [pStyle, setPStyle] = useState();
    const [gameAreaStyle, setGameAreaStyle] = useState({})
    const [preGame, setPreGameStyle] = useState()

    useEffect(() => {
        generateRandomMathNumbers();
    }, [])

    useEffect(() => {
        if (time > 0) {
            const timerId = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
            return () => clearTimeout(timerId); 
        }
    }, [time]);


    function generateRandomMathNumbers() {
        let num1 = Math.floor((Math.random() * 11) + 1);
        let num2 = Math.floor((Math.random() * 11) + 1);
        let modifier = mathModifiers[Math.floor(Math.random() * 4)];
        let answer;

        switch(modifier) {
            case "+":
                answer = num1 + num2;
                break;
            case "-":
                answer = num1 - num2;
                break;
            case "*":
                answer = num1 * num2;
                break;
            case "/":
                answer = num1 / num2;
                break;
        }
        setNumber1(num1);
        setNumber2(num2);
        setNumberModifier(modifier);
    }

    function gameLogic() {
        setPreGameStyle({display: 'none'})
        setGameAreaStyle({display: 'block'})
        setTime(30);
    }




    return (
        <div id="overlay">
            <div id="pre-game" style={preGame}>
            <p id="about-text">Welcome to the Math game! This game will test your math quick thinking.<br />
            You will have 30 seconds to answer as many math problems as possible. When you click the <br />
            start button, the game will immediately. Good luck!</p>
            <button id="start-button" onClick={() => gameLogic()}>Start</button>
            </div>
            <div id="math-game-area" style={gameAreaStyle}>
                <p>What is {number1}{numberModifier}{number2}?</p>
                <input />
                <button>Enter</button>
                <p id="timer">{time} Seconds Left</p>
            </div>
        </div>
    );
    }

export default MathGame;