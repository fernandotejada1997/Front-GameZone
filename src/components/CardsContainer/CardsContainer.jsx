import React, { useEffect } from 'react';
import Card from '../Card/Card';
import styles from "./CardsContainer.module.css";

const CardsContainer = (props) => {
  const { gameComingSoon } = props;

  if (gameComingSoon === null) {
    return <p>Loading...</p>;
  } else if (!Array.isArray(gameComingSoon)) {
    return <p>Invalid data</p>;
  } else {
    const uniqueGames = gameComingSoon
    
    return (
      <div className={styles.container}>
        {/* {console.log(uniqueGames)} */}
        {uniqueGames.map((game, index) => {

          const ratings = game.Reviews?.map(r => r.rating);
          const averageRating = ratings?.reduce((sum, rat) => sum + rat, 0) / ratings?.length;

          return (
            <Card
            key={`${game.appid}-${index}`}
            id={game.id}
            //appid={game.appid} 
            image={game.capsule_image || game.large_capsule_image} 
            name={game.name} 
            coming_soon={game.coming_soon} 
            price={(game.price_overview?.final || game.price_overview || game.final_price)}
            rating={ratings}
            averageRating={averageRating}
            />
          )
        })}
      </div>
    );
  }
};

export default CardsContainer;