import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import * as act from "../../redux/actions";
import Card from "../../components/Card/Card";
import styles from "./ShoppingCart.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const totalPrice = useSelector((state) => state.total);
  const totalPrices = parseFloat(totalPrice).toFixed(2);
  const history = useHistory();
  const dataUser = JSON.parse(localStorage.getItem("user"));

  //? IMPLEMENTACION DEL USEEFFECT
  useEffect(() => {
    //json.stringfile guardar, json.parse obtengo
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      dispatch(act.setCart(JSON.parse(storedCart)));
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("total");
    if (stored) {
      dispatch(act.setTotalPrice(JSON.parse(stored)));
    }
  }, [totalPrices]);

  const handleRemove = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your cart has been deleted.", "success");
        dispatch(act.clearCart());
        localStorage.removeItem("cart");
        localStorage.removeItem("total");
        window.location.reload();
      }
    });
  };

  const handleBuy = async () => {
    try {
      if (!dataUser) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Please register or log in to make a purchase",
          showConfirmButton: false,
          timer: 2000,
        });
        dispatch(act.clearCart());
        history.push("/login");
        return;
      }
      if (cart.length === 0) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "The cart is empty",
          showConfirmButton: false,
          timer: 2000,
        });
      } else if (totalPrices == 0.0) {
        dispatch(act.freeOrder(totalPrices, cart, dataUser));
        localStorage.removeItem("cart");
        dispatch(act.clearCart());
        localStorage.removeItem("total");
        history.push("/user");
      } else if (totalPrice > 0.0) {
        localStorage.removeItem("cart");
        dispatch(act.createOrder(totalPrices, cart, dataUser));
        localStorage.removeItem("total");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div>
      <br />
      <br />
      {cart.length === 0 ? (
        <div className={styles.container}>
          <button
            className={`fa fa-arrow-circle-left ${styles["backButton"]}`}
            onClick={() => handleBack()}
          ></button>
          <div className={styles.juegosContainer}>
            <div className={styles.cajitaItems}>
              <div className={styles.emptyCart}>
                <p> There are no games in the cart... </p>
              </div>
            </div>
          </div>
          <div className={styles.cajitaResumen}>
            <div className={styles.cajitaTotal}>
              <h4 className={styles.titleCarrito}>TOTAL: $ {totalPrices} </h4>
            </div>
            <div className={styles.botones}>
              <button
                className={styles.botonBorrar}
                onClick={() => {
                  handleRemove();
                }}
                disabled={cart.length === 0}
              >
                {/* poner icono para borrar todo del carrito */}Delete
              </button>
              <button
                className={styles.botonComprar}
                onClick={() => {
                  handleBuy();
                }}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.juegosContainer}>
            <div className={styles.cajitaItems}>
              {cart.map((game, i) => {
                return (
                  <li className={styles.li} key={`${game.id} - ${i}`}>
                    <Card
                      key={game.id}
                      id={game.id}
                      name={game.name}
                      image={game.image || game.capsule_image}
                      price={
                        game.price_overview ||
                        parseFloat(game.price) ||
                        parseFloat(game.final_price)
                      }
                    />
                  </li>
                );
              })}
            </div>
          </div>
          <div className={styles.cajitaResumen}>
            <div className={styles.cajitaTotal}>
              <h4 className={styles.titleCarrito}>TOTAL: ${totalPrices}</h4>
            </div>
            <div className={styles.botones}>
              <button
                className={styles.botonBorrar}
                onClick={() => {
                  handleRemove();
                }}
                disabled={cart.length === 0}
              >
                {/* poner icono para borrar todo del carrito */}Delete
              </button>
              <button
                className={styles.botonComprar}
                onClick={() => {
                  handleBuy();
                }}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;