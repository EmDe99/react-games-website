import "./Geo.css";
import { useRef, useState } from "react";
import { useEffect } from "react";

function Geo() {
    const pairs = {"Sweden":"Stockholm", "Denmark":"Copenhagen", "France":"Paris",
   "Germany":"Berlin", "Japan":"Tokyo", "Spain":"Madrid", "Italy":"Rome", "Poland":"Warsaw"};
    const [highlightedCard, setHighlightedCard] = useState([]);
    const [gameAreaStyle, setGameAreaStyle] = useState({});
    const [matchedScore, setMatchedScore] = useState(1);
    const [totalTries, setTotalTries] = useState(0);
    const [cards, setCardsStatus] = useState([]);
    useEffect(() => {
        createCards();
    }, [])
    function createCards() {
        const cards = [];
        for (let [value, key] of Object.entries(pairs)) {
            cards.push({value: value, state: 'inactive'})
            cards.push({key: key, state: 'inactive'});
        }
        randomize(cards);
        setCardsStatus(cards);
      }

      function randomize(cards){
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
          }
          return cards
      }
      


    function gameLogic(cardIdentifier, source) {
        let hlCard;

        if (highlightedCard.length < 1){
            setHighlightedCard(cardIdentifier);
            hlCard = cards.map(card => {
                if (card.key === cardIdentifier || card.value === cardIdentifier) {
                  return { ...card, state: 'highlighted' };
                } else {
                  return card;
                }
              }
              );
              setCardsStatus(hlCard);
              return
        }

        for (let i in pairs) {
              if ((cardIdentifier === i && highlightedCard === pairs[i]) || (cardIdentifier === pairs[i] && highlightedCard === i)) {
                    let highlightedCardIndex = cards.findIndex(c => c.key === highlightedCard || c.value === highlightedCard);
                    if (highlightedCardIndex !== -1) {
                        cards[highlightedCardIndex].state = 'matched';
                    }
                    let mCards = cards.map(card => {
                        if (card.key === cardIdentifier || card.value === cardIdentifier) {
                          return { ...card, state: 'matched' };
                        } else {
                          return card;
                        }                  
                      }
                      );
                    setMatchedScore(matchedScore + 1);
                    setCardsStatus(mCards);
                    setHighlightedCard([]);
              }

              setTotalTries(totalTries + 1)

              console.log(matchedScore);
              if (matchedScore === 8) {
                setGameAreaStyle({pointerEvents: 'none', });
              }
            } 
        

    }  
    return (
            <>
            <div id="about-text"> 
                <p>Match the correct country with the correct capital!</p>
            </div>
            <div id="game-area" style={gameAreaStyle}>
            {cards.map((card) => {
                if (card.value != null) {
                    return (
                        <div
                            onClick={() => gameLogic(card.value, 0)}
                            className={`cards ${card.state === 'highlighted' ? 'highlighted' : card.state === 'matched' ? 'matched' : ''}`}>
                            <p>{card.value}</p>
                        </div>
                    );
                }
            })}
            {cards.map((card) => {
                if (card.key != null) {
                    return (
                        <div
                            onClick={() => gameLogic(card.key, 1)}
                            className={`cards ${card.state === 'highlighted' ? 'highlighted' : card.state === 'matched' ? 'matched' : ''}`}>
                            <p>{card.key}</p>
                        </div>
                    );
                }
            })}
        </div>
        <div id="total-tries">
            <p>You have tried {totalTries} times!</p>
        </div></>
    );
    }

export default Geo;