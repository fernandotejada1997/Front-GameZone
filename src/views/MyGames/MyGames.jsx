import React, { useEffect } from "react";
import style from "./MyGames.module.css";
import * as act from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const MyGames = () => {
  const history = useHistory();
  const games = useSelector((state) => state.library);
  //console.log(games);
  const dataUser = JSON.parse(localStorage.getItem("user"));
  const ids = dataUser.id;
  const user = dataUser.name;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(act.getMyGames(ids));
  }, [ids]);

  const handleSend = (game) => {
    const hasReviewed = game.Reviews.some((r) => r.Users[0]?.name === user);
    //console.log(hasReviewed);
    if (hasReviewed) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "You have already reviewed this game.",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    } else {
      history.push("/review");
      dispatch(act.mandarAReview(game));
    }
  };

  const handleEdit = (game) => {
    const gameEdit = game;
    //console.log(gameEdit);
    if (gameEdit.Reviews.length === 0) {
      Swal.fire({
        position: "center",
        icon: "question",
        title: "You haven´t reviewed this game.",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    } else {
      for (let i = 0; i < gameEdit.Reviews.length; i++) {
        let userEdit = gameEdit.Reviews[i]?.Users[0]?.name;
        if (userEdit === user) {
          const review = gameEdit.Reviews[i]?.reviews;
          const rating = gameEdit.Reviews[i]?.rating;
          const id = gameEdit.Reviews[i]?.id;
          const idGame = gameEdit?.id;
          dispatch(act.getGameReview({ review, rating, id, idGame }));
          history.push(`/detail/reviews/${game.idGame}`);
        }
      }
    }
  };

  const handleDelete = (game) => {
    const gameDelete = game;
    if (gameDelete) {
      for (let i = 0; i < gameDelete.Reviews.length; i++) {
        let userD = gameDelete.Reviews[i]?.Users[0]?.name;
        if (userD === user) {
          let idD = gameDelete.Reviews[i]?.id;
          dispatch(act.getDeleteReview(idD));
        }
      }
      Swal.fire({
        position: "center",
        icon: "question",
        title: "No reviews added",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
  };

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className={style.container}>
      <button
        className={`fa fa-arrow-circle-left ${style["backButton"]}`}
        onClick={() => handleBack()}
      ></button>
      <div className={style.cardContainer}>
        {!games.length ? (
          <h2 className={style.title}>The library is empty...</h2>
        ) : (
          games.map((game) => (
            <div className={style.card} key={game.id}>
              <Link to={`detail/${game.id}`}>
                <img
                  className={style.image}
                  src={game.header_image}
                  alt={game.name}
                />
              </Link>
              <h4 className={style.titleName}>{game.name}</h4>
              <p className={style.titleName}>{game.release_date}</p>
              <div className={style.buttons}>
                <button
                  className={style.buttonNew}
                  onClick={() => {
                    handleSend(game);
                  }}
                >
                  New Review
                </button>
                <button
                  className={style.buttonEdit}
                  onClick={() => {
                    handleEdit(game);
                  }}
                >
                  Edit Review
                </button>
                <button
                  className={style.buttonBorrar}
                  onClick={() => handleDelete(game)}
                >
                  x
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className={style}></div>
    </div>
  );
};

export default MyGames;