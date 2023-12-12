import "./Geo.css";
import { useState } from "react";
import { useEffect } from "react";

function Geo() {
    const pairs = {"Sweden":"Stockholm", "Denmark":"Copenhagen", "France":"Paris", "Germany":"Berlin"};
    const [cards, setCardsStatus] = useState([]);
    useEffect(() => {
        createCards();
    }, [])
    function createCards() {
        const cards = [];
        for (let i = 0; i < pairs.length; i++) {
          cards.push({ value: pairs[i], state: 'hidden', key: i });
        }
        setCardsStatus(cards);
      }

    return (
        <div id="gameArea">
            <div className="cards"><p>{cards}</p></div>
        </div>
    );
    }

export default Geo;