import { useHistory } from 'react-router-dom';
import style from "./AboutUs.module.css";




const AboutUs = () => {
    const history = useHistory();

    const handleGoBack = () => {
        history.goBack();
      };

    return(
        <div className={style.container}>
            <br />
            <button className={`fa fa-arrow-circle-left ${style["backButton"]}`} onClick={() => handleGoBack()}></button>
            <div className={style.title}>
            <p>ABOUT US</p>
            </div>
            <div className={style.container2}>
                <div className={style.containerleft}>
                <div className={style.end}>
                        <h3>FRONT END</h3>
                    </div>
                    <div className={style.containerEmployee}>
                    <div className={style.containerImage1}>
                        
                    </div> 
                    <div className={style.containerText}>
                        <h1>Jeronimo Blanco</h1>
                        <h2>Full Stack Developer</h2>
                    </div>   
                  
                    </div> 
                    <div className={style.containerEmployee}>
                    <div className={style.containerImage2}>
                        
                    </div> 
                    <div className={style.containerText}>
                    <h1>Nicolas Campos</h1>
                        <h2>Full Stack Developer</h2>
                    </div>   
                  
                    </div> 
                    <div className={style.containerEmployee}>
                    <div className={style.containerImage3}>
                        
                    </div> 
                    <div className={style.containerText}>
                    <h1>Fernando Tejada</h1>
                        <h2>Full Stack Developer</h2>
                    </div>   
                  
                    </div> 
                    <div className={style.containerEmployee}>
                    <div className={style.containerImage4}>
                        
                    </div> 
                    <div className={style.containerText}>
                    <h1>Diogo Machado</h1>
                        <h2>Full Stack Developer</h2>
                    </div>   
                  
                    </div> 
                </div>  
                <div className={style.containerright}>

                    <div className={style.end}>
                        <h3>BACK END</h3>
                    </div>
                <div className={style.containerEmployee}>
                    <div className={style.containerImage5}>
                        
                    </div> 
                    <div className={style.containerText}>
                    <h1>Cristian Muñoz</h1>
                        <h2>Full Stack Developer</h2>
                    </div>   
                  
                    </div> 
                    <div className={style.containerEmployee}>
                    <div className={style.containerImage6}>
                        
                    </div> 
                    <div className={style.containerText}>
                    <h1>Mario Carrizosa</h1>
                        <h2>Full Stack Developer</h2>
                    </div>   
                  
                    </div>  
                    <div className={style.containerEmployee}>
                    <div className={style.containerImage7}>
                        
                    </div> 
                    <div className={style.containerText}>
                    <h1>Esteban Duque</h1>
                        <h2>Full Stack Developer</h2>
                    </div>   
                  
                    </div> 
                    <div className={style.containerEmployee}>
                    <div className={style.containerImage8}>
                        
                    </div> 
                    <div className={style.containerText}>
                    <h1>Dante Paladines</h1>
                        <h2>Full Stack Developer</h2>
                    </div>   
                  
                    </div> 
                </div>
            </div>

        </div>
        
    )

}

export default AboutUs;