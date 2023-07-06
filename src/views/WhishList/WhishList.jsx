import React, { useEffect } from "react";
import styles from "./WhishList.module.css";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import * as act from "../../redux/actions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const WhishList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const list = useSelector((state) => state.whishList);
  const counter = useSelector((state) => state.counter);

  useEffect(() => {
    const listStored = localStorage.getItem("whishList");
    if (listStored) {
      dispatch(act.setWhishList(JSON.parse(listStored)));
    }
  }, []);

  useEffect(() => {
    const counterStored = localStorage.getItem("counter");
    if (counterStored) {
      dispatch(act.setCounter(JSON.parse(counterStored)));
    }
  });

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className={styles.container1}>
      <div className={styles.buttonba}>
        <button
          className={`fa fa-arrow-circle-left ${styles["backButton"]}`}
          onClick={() => handleBack()}
        ></button>
        </div>
      <div className={styles.titleCarrito}>
        {counter}
      </div>
      <br />
      {list.length === 0 ? (
        <div className={styles.container}>
          <div className={styles.juegosContainer}>
            <div className={styles.cajitaItems}>
              <div className={styles.emptyCart}>
                <p> You haven't added a game to the list yet... </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.juegosContainer}>
            <div className={styles.cajitaItems}>
              {list.map((game) => {
                return (
                  <li className={styles.li} key={game.id}>
                    <Card
                      id={game.id}
                      name={game.name}
                      image={game.image}
                      price={game.price}
                    />
                  </li>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhishList;