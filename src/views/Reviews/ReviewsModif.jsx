import React, {useState} from 'react';
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import axios from 'axios';
import style from "./Reviews.module.css"
import { withRouter, useHistory  } from 'react-router-dom';
import Swal from 'sweetalert2';


const ReviewsModif = () => {

  const history = useHistory()
  const gameRe = useSelector(state => state.review)
  console.log("asdasdasda",gameRe);
  //console.log("IIIIIIIIIIIDDDDDDDDDDD", id);
  const id = gameRe
  const IDUser = JSON.parse(localStorage.getItem("user"));
  console.log(IDUser);
  const idsGames = gameRe.idGame

  const [form, setForm] = useState({
    review: "",
    rating: 0,
    id: gameRe.id,
    name: gameRe.name,
    idGame: gameRe.id,
  });

  const handleStarClick = (rating) => {
    setForm({ ...form, rating });
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.review  || !form.rating)  {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Please, complete the form',
        showCancelButton: false,
        timer: 2000
      })
      return
    } else {
      //event.preventDefault();
      history.push(`/detail/${idsGames}`)
      axios.put("https://back-gamezone-production.up.railway.app/user/review", form, id)
      Swal.fire({
          position: "center",
          icon: "success",
          title: "editado",
          showConfirmButton: false,
          timer: 2000
      })
      .then(res => {
        setForm({
          review: "",
          rating: 0,
        });
      })
      .catch(error => {
        console.error("Error submitting review:", error);
      });
    };
  }
  
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
        key={i}
        className={i <= form.rating ? style.starFilled : style.star}
        onClick={() => handleStarClick(i)}
        />
        );
      }
      return stars;
    };
    
    console.log("gamereeeeeeeeeeee", gameRe);

    return (
      <div className={style.body_form}>
    <form onSubmit={handleSubmit}>
      <div className={style.total_container}>
        <label className={style.review}>Review:</label>
        <textarea 
          name="review"
          value={form.review}
          onChange={(event) => setForm({ ...form, review: event.target.value })}
          className={style.texto_review}
        />
      <div>
        <label className={style.rating}>Rating:</label>
        <div className={style.starContainer}>
          {renderStars()}
        </div>
      </div>
      <button className={style.button} type="submit">Editar Review</button>
      </div>
    </form>
    </div>
  );
};

export default withRouter(ReviewsModif);