import { useState } from "react";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import axios from 'axios';
import style from "./Reviews.module.css"
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

//! agregar alerta de swift
const Review = () => {

  const history = useHistory()
  const gameRe = useSelector(state => state.review)
  const { id, name } = gameRe
  //console.log(gameRe);
  const IDUser = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    review: "",
    rating: 0,
    id: IDUser?.id,
    name: gameRe.name,
    idGame: gameRe.id,
  });

  const handleStarClick = (rating) => {
    setForm({ ...form, rating });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.review || !form.rating)  {
      console.log("no lo hicisteeeeeee");
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Please, complete the form',
        showCancelButton: false,
        timer: 2000
      })
      return
    } 

    history.push(`/detail/${gameRe.id}`)
    axios.post("https://back-gamezone-production.up.railway.app/user/review", form, IDUser, name, id)
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Review added successfully",
        showConfirmButton: false,
        timer: 2000
      })
      .then(res => {
        setForm({
          review: "",
          rating: 0,
        });
        setTimeout(() => {
          history.push(`/detail/${gameRe.id}`);
          window.location.reload(); // Recargar la página
        }, 200);
      })
      .catch(error => {
        console.error("Error submitting review:", error);
      });
  };

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
      <button className={style.button} type="submit">Create Review</button>
      </div>
    </form>
    </div>

  );
};

export default Review;