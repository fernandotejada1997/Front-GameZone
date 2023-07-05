import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Carousel.module.css";
import * as act from "../../redux/actions";
import arrow from "../../assets/arrow.png";
import punto from "../../assets/punto.png";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Carousel = () => {
    const games2 = useSelector(state => state.games);
    const gamesfiltered = games2.filter(games => games.coming_soon === true)
    const games = gamesfiltered.slice(0, 9);
const dispatch = useDispatch();
useEffect(() => {
    dispatch(act.getGames());
    // dispatch(act.clearSearch());
  }, [dispatch]);



const [currentCard, setCurrentCard] = useState(1);
const [charactersPerPage, setCharacterPerPage] = useState(1);

const totalCards = games && Math.ceil(games.length / charactersPerPage);

const handleNextCard = () => {
    if (currentCard < totalCards) {
    setCurrentCard(currentCard + 1);
    } else {
      setCurrentCard(1); // Vuelve a la primera posición
    }
};

const handlePrevCard = () => {
    if (currentCard > 1) {
    setCurrentCard(currentCard - 1);
    } else {
      setCurrentCard(totalCards); // Vuelve a la última posición
    }
};

const handleGoToCard = (cardNumber) => {
    setCurrentCard(cardNumber);
};

useEffect(() => {
    if (games && games.length > 0) {
        const interval = setInterval(() => {
            handleNextCard();
        }, 4000);

        return () => {
            clearInterval(interval);
        };
    }
}, [currentCard, games]);

    const indexOfLastCharacter = currentCard * charactersPerPage;
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
    const currentCharacters = games
    ? games.slice(indexOfFirstCharacter, indexOfLastCharacter)
    : [];

    const history = useHistory()

    const handleClick = (id) => {
        history.push(`/detail/${id}`);
    }

return (
    <div className={style.container}>
        <h2 className={style.principaltitle}>Games coming soon</h2>
        <div className={style.containerimage} >
            {currentCharacters.map((character, index) => (


        <div key={index} className={style.tarjeta} onClick={() => {handleClick(character.id)}} >
            <h3 className={style.name}>{character.name}</h3>
            <img className={style.image} src={character.header_image} alt={character.name} />
            

        </div>
        ))}
    </div>
    <div className={style.paginado}>
        <img
            className={style.arrowprev}
            src={arrow}
            onClick={handlePrevCard}
            disabled={currentCard === 1}
        />
        {[...Array(totalCards)].map((_, index) => (
        <img
            src={punto}
            className={`${style.punto} ${currentCard === index + 1 ? style.selected : ""}`}
            key={index}
            onClick={() => handleGoToCard(index + 1)}
            disabled={currentCard === index + 1}
        />
        ))}
        <img
            className={style.arrownext}
            src={arrow}
            onClick={handleNextCard}
            disabled={currentCard === totalCards}
        />
    </div>
    </div>
);
};

export default Carousel;