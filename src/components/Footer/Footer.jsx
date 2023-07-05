import React from "react";
import { Link } from "react-router-dom";
import style from "./Footer.module.css";

import {faLinkedin,faGithub,faTwitter,faInstagram,faFacebook, faSearchengin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Footer = () => {
    return(
        <div className={style.container}>

            <div className={style.containerImage}>

            </div>

            <div className={style.section}>
            
                    <a href="/terms">
                        <p>Terms and conditions</p>
                    </a>
                    <a href="/aboutus">
                        <p>About us</p>
                    </a>
                    <div className={style.socialMediaIcons}>
                        <p>Follow us</p>
                        <a href="https://twitter.com/GameZone2023" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitter} size="xl" />
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=100094378233290" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} size="xl" />
                        </a>
                        <a href="https://www.instagram.com/gamezonecorporation/" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} size="xl"/>
                        </a>

                    </div>

                    

            
        </div>


        </div>
        
    );
}


export default Footer;