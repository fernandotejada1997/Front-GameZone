import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import * as act from '../../redux/actions';
import style from './Card.module.css';
import { useHistory } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Card = (props) => {
  //console.log(props);
  let { coming_soon, id ,price, name, image, averageRating } = props;
  price = parseFloat(isNaN(price) ? 0 : price) ?? 0;
  //console.log(price)
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const isShoppCartRoute = location.pathname === "/cart";
  const isWhishListRoute = location.pathname === "/whishlist";
  const dataUser = JSON.parse(localStorage.getItem("user"));
  const renderStars = () => {
    const rating = Math.round(averageRating);
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<FaStar key={i} className={style.starIcon} />);
    }
    return stars;
  };

  const handleAdd = () => {
      dispatch(act.addCart({ id, price: price, name, image }));
  };

  const handleAddWhish = () => {
    if (!dataUser) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'please register or log in to be able to add to the list',
        showConfirmButton: false,
        timer: 2000
      })
      return;
    }
      dispatch(act.addWhishList({ id, price: price, name, image }));
  };

  const handleRemove = () => {
    dispatch(act.removeCart(id));
  };

  const handelRemoveWhishList = () => {
    dispatch(act.removeWhishList(id));
  };

  const handleClick = (id) => {
    history.push(`/detail/${id}`);
  };

  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      const titleElement = titleRef.current;
      const maxTitleLength = 35;
      const title = titleElement.innerText;
      if (title.length > maxTitleLength) {
        titleElement.innerText = title.slice(0, maxTitleLength) + '...';
      }
    }
  }, []);

  //console.log(appid);

  return (
    <li className={style.box} key={id}>
      <div className={style.imagecontainer} onClick={() => { handleClick(id) }}>
        <img className={style.image} src={image} alt={name}></img>
        <h1 ref={titleRef} className={style.name}>{name}</h1>
      {averageRating > 0 && (
        <div className={style.rating}>{renderStars()}</div>
      )}
      </div>
      <h3 className={style.price}> {coming_soon ? "coming soon" : (price !== undefined && price !== 0 ? `$ ${price}` : 'Free')}</h3>
      {!isShoppCartRoute && !isWhishListRoute && (
        <div>
          <button className={style.button} onClick={() => { handleAddWhish() }}>Add to WhishList</button>
          <button className={style.buttonadd} onClick={() => { handleAdd() }}>Add to cart</button>
        </div>
      )}
      {isWhishListRoute && (
        <div>
          <button className={style.buttonadd} onClick={() => { handleAdd() }}>Add to cart</button>
          <button className={style.botonBorrar} onClick={() => { handelRemoveWhishList() }}>Take out</button>
        </div>
      )}
      {isShoppCartRoute && (
        <button className={style.botonBorrar} onClick={() => { handleRemove() }}>Take out</button>
      )}
    </li>
  );
};

export default Card;