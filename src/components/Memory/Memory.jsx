import "./Memory.css";
import { useState, useEffect } from "react";

function Memory() {
    const pairs = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
    const [lastCard, setLastCard] = useState([]);
    const [cards, setCardsStatus] = useState([]);
    const [score, setScore] = useState(0);
    const [turnScore, setTurnScore] = useState(0)
    const [gameAreaStyle, setGameAreaStyle] = useState({})
    useEffect(() => {
        createCards();
    }, [])

    function createCards() {
        const cards = [];
        for (let i = 0; i < pairs.length; i++) {
          cards.push({ value: pairs[i], state: 'hidden', key: i });
        }
        randomize(cards)
        setCardsStatus(cards);
      }
    
    function gameLogic(cardKey) {
        const clickedCard = cards.find(card => card.key === cardKey);
        let flippedCards;
        console.log(lastCard)

        if (lastCard.length < 1){
            setLastCard(clickedCard);
            flippedCards = cards.map(card => {
                if (card.key === cardKey) {
                  return { ...card, state: 'flipped' };
                } else {
                  return card;
                }
              }
              );
              setCardsStatus(flippedCards);
        } else {
            setTurnScore(turnScore + 1)
            if (lastCard.value === clickedCard.value){
                const matchedCards = cards.map(card => {
                    if (card.key === cardKey || card.key === lastCard.key) {
                      return { ...card, state: 'matched', pointerEvents : 'none'};
                    } else {
                      return card;
                    }
                  });
                  setCardsStatus(matchedCards);
                  setScore(score + 1)
                  setTurnScore(turnScore + 1)
                  setLastCard([])
            } else {

            const flippedCards = cards.map(card => {
              if (card.key === cardKey || card.key === lastCard.key) {
                return { ...card, state: 'flipped' };
              } else {
                return card;
              }
            });
            setCardsStatus(flippedCards);
            setGameAreaStyle({pointerEvents: 'none'});

            setTimeout(() => {
              const newCards = cards.map(card => {
                if (card.key === cardKey || card.key === lastCard.key) {
                  return { ...card, state: 'hidden' };
                } else {
                  return card;
                }
              });
              setCardsStatus(newCards);
              setLastCard([]);
              setGameAreaStyle({})
            }, 1000); 
          }   
        } 

        if (score === 8){
          setGameAreaStyle({pointerEvents: 'none'})
        }
    }

    return (
        <>
        <div id="about-text"> 
                <p>Find the matching card numbers!</p>
            </div>
          <div id="game-area" style={gameAreaStyle}>
              {cards.map((card) => (
                  <div
                      className={`card ${card.state === 'flipped' ? "flipped" : card.state === 'matched' ? 'flipped' : ''}`}
                      key={card.key}
                      onClick={() => gameLogic(card.key)}
                  >
                      {card.state === 'flipped' || card.state === 'matched' ? <p>{card.value}</p> : null}
                  </div>
              ))}
              </div>
              <div>
                  <p id="tScore">You have attempted {turnScore} times!</p>
              </div>
            </>

      );
}

export default Memory;

function randomize(cards){
  //Fisher-Yates Shuffle
  let currentIndex = cards.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }

  return cards;
}