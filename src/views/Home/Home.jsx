import React, { useEffect, useState } from "react";
import Carousel from "../../components/Carousel/Carousel";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useDispatch, useSelector } from "react-redux";
import style from "./Home.module.css";
import * as act from "../../redux/actions";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import { PacmanLoader } from "react-spinners";

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const games = useSelector((state) => state.games);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true); // Estado para controlar la carga



  useEffect(() => {
    const storedGames = localStorage.getItem("games");
  
    if (storedGames) {
      dispatch(act.setGames(JSON.parse(storedGames)));
      setLoading(false);
    } else {
      const loadData = async () => {
        setLoading(true); // Establecer en 'true' antes de cargar los juegos
        await dispatch(act.getGames());
        await dispatch(act.clearSearch());
        setLoading(false);
      };
  
      loadData();
    }
  }, [dispatch]);
  


  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleButton = (e) => {
    if (name.trim() !== "") {
      dispatch(act.getByName(name));
      history.push(`/search?name=${encodeURIComponent(name)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleButton();
    }
  };

  // Verificar si el array de juegos tiene al menos 14 elementos
  const selectedGames = games.length >= 18 ? games.slice(0, 12) : games;
  const frees = games.filter(
    (game) => game.is_free === true && game.price_overview >= 0
  );
  const type = games.filter(
    (game) => game.type === "demo" || game.type === "dlc"
  );
  const controllerSupport = games.filter(
    (game) => game.controller_support === "full"
  );

  const frees2 = frees.slice(0, 6);
  const type2 = type.slice(0, 6);
  const controllerSupport2 = controllerSupport.slice(0, 6);

    if (loading) {
      return (
      <div className={style.loading}>
        <PacmanLoader color="blue" size={80} speedMultiplier={1} />
      </div>// Muestra el mensaje de carga mientras loadinges true
    )}

  return (
    <div className={style.homeContainer}>
      <Carousel />
      <div>
        <div className={style.searchcontainer}>
          <input
            className={style.search}
            placeholder="search..."
            type="text"
            onChange={(e) => handleChange(e)}
            onKeyDown={handleKeyDown}
          />
          <FontAwesomeIcon
            className={style.buttonsearch1}
            onClick={name.trim() !== "" ? handleButton : undefined}
            icon={faSearchengin}
            size="xl"
          />
        </div>

        <h3 className={style.title}>All Games</h3>
        <CardsContainer gameComingSoon={selectedGames} />
      </div>
      <h3 className={style.title}>Free</h3>
      <CardsContainer gameComingSoon={frees2} />
      <h3 className={style.title}>Demos and DLCs</h3>
      <CardsContainer gameComingSoon={type2} />
      <h3 className={style.title}>Controllers</h3>
      <CardsContainer gameComingSoon={controllerSupport2} />
    </div>
  );
};

export default Home;
// import React, { useEffect, useState } from "react";
// import Carousel from "../../components/Carousel/Carousel";
// import CardsContainer from "../../components/CardsContainer/CardsContainer";
// import { useDispatch, useSelector } from "react-redux";
// import style from "./Home.module.css";
// import * as act from "../../redux/actions";
// import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useHistory } from "react-router-dom";
// import { PacmanLoader } from "react-spinners";

// const Home = () => {
//   const history = useHistory();
//   const dispatch = useDispatch();
//   const search = useSelector((state) => state.search);
//   const games = useSelector((state) => state.games);
//   const [name, setName] = useState("");
//   const [loading, setLoading] = useState(true); // Estado para controlar la carga



// useEffect(() => {
//     const storedGames = localStorage.getItem("games");

//     if (storedGames) {
//       dispatch(act.setGames(JSON.parse(storedGames)));
//       setLoading(false);
//     } else {
//       const loadData = async () => {
//         await dispatch(act.getGames());
//         await dispatch(act.clearSearch());
//         setLoading(false);
//       };
      
//        loadData();
//     }
//     setLoading(false);
//   }, [dispatch]);

//   useEffect(() => {
//     localStorage.setItem("games", JSON.stringify(games));
//   }, [games]);

  


//   const handleChange = (e) => {
//     e.preventDefault();
//     setName(e.target.value);
//   };

//   const handleButton = (e) => {
//     if (name.trim() !== "") {
//       dispatch(act.getByName(name));
//       history.push(`/search?name=${encodeURIComponent(name)}`);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       handleButton();
//     }
//   };

//   // Verificar si el array de juegos tiene al menos 14 elementos
//   const selectedGames = games.length >= 18 ? games.slice(0, 12) : games;
//   const frees = games.filter(
//     (game) => game.is_free === true && game.price_overview >= 0
//   );
//   const type = games.filter(
//     (game) => game.type === "demo" || game.type === "dlc"
//   );
//   const controllerSupport = games.filter(
//     (game) => game.controller_support === "full"
//   );

//   const frees2 = frees.slice(0, 6);
//   const type2 = type.slice(0, 6);
//   const controllerSupport2 = controllerSupport.slice(0, 6);

//     if (loading) {
//       return (
//       <div className={style.loading}>
//         <PacmanLoader color="blue" size={80} speedMultiplier={1} />
//       </div>// Muestra el mensaje de carga mientras loadinges true
//     )}

//   return (
//     <div className={style.homeContainer}>
//       <Carousel />
//       <div>
//         <div className={style.searchcontainer}>
//           <input
//             className={style.search}
//             placeholder="search..."
//             type="text"
//             onChange={(e) => handleChange(e)}
//             onKeyDown={handleKeyDown}
//           />
//           <FontAwesomeIcon
//             className={style.buttonsearch1}
//             onClick={name.trim() !== "" ? handleButton : undefined}
//             icon={faSearchengin}
//             size="xl"
//           />
//         </div>

//         <h3 className={style.title}>All Games</h3>
//         <CardsContainer gameComingSoon={selectedGames} />
//       </div>
//       <h3 className={style.title}>Free</h3>
//       <CardsContainer gameComingSoon={frees2} />
//       <h3 className={style.title}>Demos and DLCs</h3>
//       <CardsContainer gameComingSoon={type2} />
//       <h3 className={style.title}>Controllers</h3>
//       <CardsContainer gameComingSoon={controllerSupport2} />
//     </div>
//   );
// };

// export default Home;