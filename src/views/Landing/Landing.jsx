import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";
import logoImage from "../../assets/LOGOGAMEZONE.png";

const Landing = () => {
    return(
        <div className={styles.container}>
        <img src={logoImage} alt="GAME ZONE" className={`${styles.logo} ${styles.enlarged}`} />
        <Link to="/home">
            <button className={styles.button}>start</button>
        </Link>
        <div className={styles.subHeading}>
            <p className={styles.subHeading2}>Discover the excitement in GAME ZONE. Get the best games in our online store. Dive into unforgettable adventures and challenge your skills!</p>
        </div>
        
        </div>
    );
}

export default Landing;