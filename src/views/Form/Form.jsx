// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional


// import React from "react";
// import styles from "./Form.module.css";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { postCreateUser, postLogin, loginGoogle, setError, loginGoogleFirebase } from "../../redux/actions";
// import countries from "./countries";
// import { useHistory } from "react-router-dom";
// import Swal from "sweetalert2";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// const Form = () => {

//   const firebaseConfig = {
//     apiKey: "AIzaSyB9HpNHx06I-JPN-3GO8iCB5LpDXKLuxhY",
//     authDomain: "gamezone-390702.firebaseapp.com",
//     projectId: "gamezone-390702",
//     storageBucket: "gamezone-390702.appspot.com",
//     messagingSenderId: "1054056983919",
//     appId: "1:1054056983919:web:db940a6c001f776f5a8c9a",
//     measurementId: "G-Y4Y2HDDGDL"
//   };
  
//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);
//   const provider = new GoogleAuthProvider();
//   const auth = getAuth(app)

//   const history = useHistory()
//   const dispatch = useDispatch()

//   const error = useSelector((state) => state.errorBack)

//   const [ name, setName ] = useState("")
//   const [ user_name, setUser_name ] = useState("")
//   const [ email, setEmail ] = useState("")
//   const [ password, setPassword ] = useState("")
//   const [ confirmPassword, setConfirmPassword ] = useState("")
//   const [ country, setCountry ] = useState(null)

//   //const [selectedCountry, setSelectedCountry] = React.useState(null);
//   //const [password, setPassword] = React.useState("");
//   //const [confirmPassword, setConfirmPassword] = React.useState("");
//   //const [passwordError, setPasswordError] = React.useState("");

//   const [ errorName, setErrorName ] = useState("")
//   const [ errorUser_name, setErrorUser_name ] = useState("")
//   const [ errorEmail, setErrorEmail ] = useState("")
//   const [ errorPassword, setErrorPassword ] = useState("")
//   const [ errorConfirmPassword, setErrorConfirmPassword ] = useState("")
//   const [ errorCountry, setErrorCountry ] = useState("")

//   // Captura de datos login
//   const [ emailLogin, setEmailLogin ] = useState("")
//   const [ passwordLogin, setPasswordLogin ] = useState("")
//   const [ errorEmailLogin, setErrorEmailLogin ] = useState("")
//   const [ errorPasswordLogin, setErrorPasswordLogin ] = useState("")

//   const namePattern = RegExp(/^[A-Za-z\s]+$/)//--
//   //const lastPattern = RegExp(/^[A-Za-z\s]+$/)
//   const userNamePattern = RegExp(/^[a-zA-Z0-9_]{3,16}$/)
//   const emailPattern = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
//   const passwordPattern = RegExp(/^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[a-zA-Z]).{8,}$/)//--

//   const handleNameChange = (e) => {
//     setName(e.target.value)
//   }

//   const handleUserNameChange = (e) => {
//     setUser_name(e.target.value)
//   }

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value)
//   }

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value)
//   }

//   const handleConfirmPasswordChange = (e) => {
//     setConfirmPassword(e.target.value)
//   }

//   const handleCountry = (e) => {
//     setCountry(e.target.value)
//   }

//   const handleEmailLoginChange = (e) => {
//     setEmailLogin(e.target.value)
//   }

//   const handlePasswordLoginChange = (e) => {
//     setPasswordLogin(e.target.value)
//   }

//   const validateName = () => {
//     if (!name) {
//       return 'The name is required';
//     }
//     if (!namePattern.test(name)) {
//       return 'The name is invalid';
//     }
//     return ''
//   }

//   const validateUserName = () => {
//     if (!user_name) {
//       return 'Username is required';
//     }
//     if (!userNamePattern.test(user_name)) {
//       return 'Minimum of 3 characters and maximum of 16, accept (_)';
//     }
//     return ''
//   }

//   const validateEmail = () => {
//     if (!email) {
//       return 'Mail is required';
//     }
//     if (!emailPattern.test(email)) {
//       return 'The email is invalid';
//     }
//     return '';
//   }

//   const validatePassword = () => {
//     if (!password) {
//       return 'Password is required';
//     }
//     if (!passwordPattern.test(password)) {
//       return 'The password must be less than 8 characters and capital letter';
//     }
//     return '';
//   }

//   // validacion de email y password de Inicio de Sesion

//   const validateEmailLogin = () => {
//     if (!emailLogin) {
//       return 'Mail is required';
//     }
//     if (!emailPattern.test(emailLogin)) {
//       return 'The email is invalid';
//     }
//     return '';
//   }

//   const validatePasswordLogin = () => {
//     if (!passwordLogin) {
//       return 'Password is required';
//     }
//     if (!passwordPattern.test(passwordLogin)) {
//       return 'The password must be less than 8 characters and capital letter';
//     }
//     return '';
//   }

//   const handleSignIn = () => {
//     const container = document.querySelector(`.${styles.container}`);
//     container.classList.remove(styles["right-panel-active"]);
//   };

//   const handleSignUp = () => {
//     const container = document.querySelector(`.${styles.container}`);
//     container.classList.add(styles["right-panel-active"]);
//   };

//   const handleForm1Submit = async (e) => {
//     e.preventDefault();

//     const nameError = validateName()
//     const userNameError = validateUserName()
//     const emailError = validateEmail()
//     const passwordError = validatePassword()
//     setErrorName(nameError)
//     setErrorUser_name(userNameError)
//     setErrorEmail(emailError)
//     setErrorPassword(passwordError);
//     // Restante da lógica de envio do formulário

//     if (password !== confirmPassword) {
//       setErrorConfirmPassword("Passwords Do Not Match");
//       return;
//     }else if (password === confirmPassword) {
//       setErrorConfirmPassword('')
//     }

//     if (country === "" || country === null) {
//       setErrorCountry("Country is required")
//     }else if (typeof country === "string" ) {
//       setErrorCountry("")
//     }

//     const datos = {
//       name, 
//       user_name, 
//       email, 
//       password,
//       country, 
//       confirmPassword
//     }

//     if (!datos.name || !datos.user_name || !datos.password || !datos.country || !datos.confirmPassword || !datos.email) {
//       return; // Detener la ejecución si hay errores de validación
//     }else{
//       Swal.fire(
//         'Create Account',
//         'Congratulations you are part of GameZone',
//         'success'
//       )
//       await dispatch(postCreateUser(datos))
//       //history.push("/login") ESTO ESTA EN PAUSA
//     }
//   };

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     if (error) {
//         Swal.fire('Ups!', `${error}`, 'error').then(() => {
//           dispatch(setError(null)); // Limpiar el error después de mostrarlo
//         });
//     }
//   }, [error, dispatch])

//   const handleForm2Submit = async (e) => {
//     e.preventDefault();

//     const emailErrorLogin = validateEmailLogin()
//     const passwordErrorLogin = validatePasswordLogin()
//     setErrorEmailLogin(emailErrorLogin)
//     setErrorPasswordLogin(passwordErrorLogin)

//     const datosTwo = {
//       emailLogin, 
//       passwordLogin,
//     }

//     if (!datosTwo.emailLogin || !datosTwo.passwordLogin) {
//       return;

//     }else if (emailErrorLogin || passwordErrorLogin) {
//       return;
//     }else {

//       const Toast = Swal.mixin({
//         toast: true,
//         position: 'top-start',
//         showConfirmButton: false,
//         timer: 3000,
//         timerProgressBar: true,
//         didOpen: (toast) => {
//           toast.addEventListener('mouseenter', Swal.stopTimer)
//           toast.addEventListener('mouseleave', Swal.resumeTimer)
//         }
//       })
      
//       Toast.fire({
//         icon: 'success',
//         title: 'Signed in successfully'
//       })

//       await dispatch(postLogin(datosTwo))
//       await history.push("/home")
//       //await submitValidation(datosTwo)// ESTA FUNCION CREO QUE OMITIRA
//     }
//   };

//   // INICIO DE SESION CON GOOGLE

//   const continueGoogle = async () => {  

//     const Toast = Swal.mixin({
//       toast: true,
//       position: 'top-start',
//       showConfirmButton: false,
//       timer: 5000,
//       timerProgressBar: true,
//       didOpen: (toast) => {
//         toast.addEventListener('mouseenter', Swal.stopTimer)
//         toast.addEventListener('mouseleave', Swal.resumeTimer)
//       }
//     })

//     Toast.fire({
//       icon: 'success',
//       title: 'Signed in successfully'
//     })

//     signInWithPopup(auth, provider)
//     .then((result) => {
//       // El usuario ha iniciado sesión con éxito
//       const user = result.user;

//       console.log(user)

//       const userTwo = {
//         name : user.displayName, 
//         email : user.email,
//         profileImage : user.photoURL,
//         user_name : user.displayName
//       }
//       console.log(userTwo);

//       dispatch(loginGoogleFirebase(userTwo))
//       console.log("redirige a home")
//       history.push("/home")

//     })
//     .catch((error) => {
//       // Ha ocurrido un error durante el inicio de sesión
//       console.log(error);
//     });
//     //const google = new GoogleAuthProvider()
//     //return await signInWithPopup(auth, google)
//     //console.log(loginWithRedirect)  
//     //await dispatch(loginGoogle()) 
//     console.log("iniciado sesion con google")
//   }

//   return (
    
//     <div className={styles.body_form}>
//       <div className={`${styles.container} ${styles["right-panel-active"]}`}>
//         {/* Sign Up */}
//         <div className={`${styles.container__form} ${styles["container--signup"]}`}>
//           <form action="#" className={styles.form} id="form1" onSubmit={handleForm1Submit}>
//             <h2 className={styles["form__title"]}>Create Account</h2>
//             <input
//               type="text"
//               placeholder="Name"
//               className={styles.input}
//               value={name}
//               onChange={(e) => handleNameChange(e)}
//             />
//             {errorName && <div style={{"color" : "red"}}>{errorName}</div>}
//             <input
//               type="text"
//               placeholder="User Name"
//               className={styles.input}
//               value={user_name}
//               onChange={(e) => handleUserNameChange(e)}
//             />
//             {errorUser_name && <div style={{"color" : "red"}}>{errorUser_name}</div>}
//             <input
//               type="text"
//               placeholder="Email"
//               className={styles.input}
//               value={email}
//               onChange={(e) => handleEmailChange(e)}
//             />
//             {errorEmail && <div style={{"color" : "red"}}>{errorEmail}</div>}
//             <input
//               type="password"
//               placeholder="Password"
//               className={styles.input}
//               value={password}
//               onChange={(e) => handlePasswordChange(e)}
//             />
//             {errorPassword && <span className={styles.errorMessage}>{errorPassword}</span>}
//             <input
//               type="password"
//               placeholder="Confirm Password"
//               className={`${styles.input} ${errorPassword && styles.error}`}
//               value={confirmPassword}
//               onChange={(e) => handleConfirmPasswordChange(e)}
//             />
//             {errorConfirmPassword && <span className={styles.errorMessage}>{errorConfirmPassword}</span>}

//             <select className={styles.input} name="country" onChange={(e) => handleCountry(e)} >

//               <option value="" >Select a country</option>
//               {
//                 countries.map((e) => {
//                   return (
//                     <option key={e.id} value={e.label}>{e.label}</option>
//                   )
//                 })
//               }
//             </select>
//             {errorCountry && <span className={styles.errorMessage}>{errorCountry}</span>}
//             <button className={styles.btn}>Sign Up</button>
//           </form>
//         </div>

//         {/* Sign In */}
//         <div className={`${styles.container__form} ${styles["container--signin"]}`}>
//           <form action="#" className={styles.form} id="form2" onSubmit={handleForm2Submit}>
//             <h2 className={styles["form__title"]}>Sign In</h2>
//             <input
//               type="text"
//               placeholder="Email"
//               className={styles.input}
//               value={emailLogin}
//               onChange={(e) => handleEmailLoginChange(e)}
//             />
//             {errorEmailLogin && <span className={styles.errorMessage}>{errorEmailLogin}</span>}
//             <input
//               type="password"
//               placeholder="Password"
//               className={styles.input}
//               value={passwordLogin}
//               onChange={(e) => handlePasswordLoginChange(e)}
//             />
//             {errorPasswordLogin && <span className={styles.errorMessage}>{errorPasswordLogin}</span>}
//             <p className={styles.form__title} > OR </p>
//             <li>
//               <a onClick={continueGoogle}>
//                 <i className={`fa fa-google-plus-square ${styles["btnTwo"]}`} aria-hidden="true" > Continue with Google</i>
//               </a>
//             </li>
//             <a href="/forgotPassword" className={styles.link}>Forgot your password?</a>
//             <button className={styles.btn}>Sign In</button>
//           </form>
//         </div>

//         {/* Overlay */}
//         <div className={styles.container__overlay}>
//           <div className={styles.overlay}>
//             <div className={`${styles.overlay__panel} ${styles["overlay--left"]}`}>
//               <button className={styles.btn} id="signIn" onClick={handleSignIn}>Sign In</button>
//             </div>
//             <div className={`${styles.overlay__panel} ${styles["overlay--right"]}`}>
//               <button className={styles.btn} id="signUp" onClick={handleSignUp}>Sign Up</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Form;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import React from "react";
import styles from "./Form.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postCreateUser,
  postLogin,
  loginGoogle,
  setError,
  loginGoogleFirebase,
} from "../../redux/actions";
import countries from "./countries";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Form = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyB9HpNHx06I-JPN-3GO8iCB5LpDXKLuxhY",
    authDomain: "gamezone-390702.firebaseapp.com",
    projectId: "gamezone-390702",
    storageBucket: "gamezone-390702.appspot.com",
    messagingSenderId: "1054056983919",
    appId: "1:1054056983919:web:db940a6c001f776f5a8c9a",
    measurementId: "G-Y4Y2HDDGDL",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);

  const history = useHistory();
  const dispatch = useDispatch();

  const error = useSelector((state) => state.errorBack);

  const [name, setName] = useState("");
  const [user_name, setUser_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState(null);

  //const [selectedCountry, setSelectedCountry] = React.useState(null);
  //const [password, setPassword] = React.useState("");
  //const [confirmPassword, setConfirmPassword] = React.useState("");
  //const [passwordError, setPasswordError] = React.useState("");

  const [errorName, setErrorName] = useState("");
  const [errorUser_name, setErrorUser_name] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [errorCountry, setErrorCountry] = useState("");

  // Captura de datos login
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [errorEmailLogin, setErrorEmailLogin] = useState("");
  const [errorPasswordLogin, setErrorPasswordLogin] = useState("");

  const namePattern = RegExp(/^[A-Za-z\s]+$/); //--
  //const lastPattern = RegExp(/^[A-Za-z\s]+$/)
  const userNamePattern = RegExp(/^[a-zA-Z0-9_]{3,16}$/);
  const emailPattern = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const passwordPattern = RegExp(
    /^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[a-zA-Z]).{8,}$/
  ); //--

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setUser_name(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleCountry = (e) => {
    setCountry(e.target.value);
  };

  const handleEmailLoginChange = (e) => {
    setEmailLogin(e.target.value);
  };

  const handlePasswordLoginChange = (e) => {
    setPasswordLogin(e.target.value);
  };

  const validateName = () => {
    if (!name) {
      return "The name is required";
    }
    if (!namePattern.test(name)) {
      return "The name is invalid";
    }
    return "";
  };

  const validateUserName = () => {
    if (!user_name) {
      return "Username is required";
    }
    if (!userNamePattern.test(user_name)) {
      return "Minimum of 3 characters and maximum of 16, accept (_)";
    }
    return "";
  };

  const validateEmail = () => {
    if (!email) {
      return "Mail is required";
    }
    if (!emailPattern.test(email)) {
      return "The email is invalid";
    }
    return "";
  };

  const validatePassword = () => {
    if (!password) {
      return "Password is required";
    }
    // if (!passwordPattern.test(password)) {
    //   return "The password must be less than 8 characters and capital letter";
    // }
    return "";
  };

  // validacion de email y password de Inicio de Sesion

  const validateEmailLogin = () => {
    if (!emailLogin) {
      return "Mail is required";
    }
    //if (!emailPattern.test(emailLogin)) { // MODIFIQUE ESTO HOY
    //  return 'The email is invalid';
    //}
    return "";
  };

  const validatePasswordLogin = () => {
    if (!passwordLogin) {
      return "Password is required";
    }
    //if (!passwordPattern.test(passwordLogin)) { // MODIFIQUE ESTO HOY
    //  return 'The password must be less than 8 characters and capital letter';
    //}
    return "";
  };

  const handleSignIn = () => {
    const container = document.querySelector(`.${styles.container}`);
    container.classList.remove(styles["right-panel-active"]);
  };

  const handleSignUp = () => {
    const container = document.querySelector(`.${styles.container}`);
    container.classList.add(styles["right-panel-active"]);
  };

  const handleForm1Submit = async (e) => {
    e.preventDefault();

    const nameError = validateName();
    const userNameError = validateUserName();
    const emailError = validateEmail();
    const passwordError = validatePassword();
    setErrorName(nameError);
    setErrorUser_name(userNameError);
    setErrorEmail(emailError);
    setErrorPassword(passwordError);
    // Restante da lógica de envio do formulário

    if (password !== confirmPassword) {
      setErrorConfirmPassword("Passwords Do Not Match");
      return;
    } else if (password === confirmPassword) {
      setErrorConfirmPassword("");
    }

    if (country === "" || country === null) {
      setErrorCountry("Country is required");
    } else if (typeof country === "string") {
      setErrorCountry("");
    }

    const datos = {
      name,
      user_name,
      email,
      password,
      country,
      confirmPassword,
    };

    if (
      !datos.name ||
      !datos.user_name ||
      !datos.password ||
      !datos.country ||
      !datos.confirmPassword ||
      !datos.email
    ) {
      return; // Detener la ejecución si hay errores de validación
    } else {
      Swal.fire(
        "Create Account",
        "Congratulations you are part of GameZone",
        "success"
      );
      await dispatch(postCreateUser(datos));
      //history.push("/login") ESTO ESTA EN PAUSA
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (error) {
      Swal.fire("Ups!", `${error}`, "error").then(() => {
        dispatch(setError(null)); // Limpiar el error después de mostrarlo
      });
    }
  }, [error, dispatch]);

  const handleForm2Submit = async (e) => {
    e.preventDefault();

    const emailErrorLogin = validateEmailLogin();
    const passwordErrorLogin = validatePasswordLogin();
    setErrorEmailLogin(emailErrorLogin);
    setErrorPasswordLogin(passwordErrorLogin);

    const datosTwo = {
      emailLogin,
      passwordLogin,
    };

    if (!datosTwo.emailLogin || !datosTwo.passwordLogin) {
      return;
    } else if (emailErrorLogin || passwordErrorLogin) {
      return;
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-start",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });

      await dispatch(postLogin(datosTwo));
      await history.push("/home");
      //await submitValidation(datosTwo)// ESTA FUNCION CREO QUE OMITIRA
    }
  };

  // INICIO DE SESION CON GOOGLE

  const continueGoogle = async () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-start",
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: "Signed in successfully",
    });

    signInWithPopup(auth, provider)
      .then((result) => {
        // El usuario ha iniciado sesión con éxito
        const user = result.user;

        console.log(user);

        const userTwo = {
          name: user.displayName,
          email: user.email,
          profileImage: user.photoURL,
          user_name: user.displayName,
        };
        console.log(userTwo);

        dispatch(loginGoogleFirebase(userTwo));
        console.log("redirige a home");
        history.push("/home");
      })
      .catch((error) => {
        // Ha ocurrido un error durante el inicio de sesión
        console.log(error);
      });
    //const google = new GoogleAuthProvider()
    //return await signInWithPopup(auth, google)
    //console.log(loginWithRedirect)
    //await dispatch(loginGoogle())
    console.log("iniciado sesion con google");
  };

  return (
    <div className={styles.body_form}>
      <div className={`${styles.container} ${styles["right-panel-active"]}`}>
        {/* Sign Up */}
        <div
          className={`${styles.container__form} ${styles["container--signup"]}`}
        >
          <form
            action="#"
            className={styles.form}
            id="form1"
            onSubmit={handleForm1Submit}
          >
            <h2 className={styles["form__title"]}>Create Account</h2>
            <input
              type="text"
              placeholder="Name"
              className={styles.input}
              value={name}
              onChange={(e) => handleNameChange(e)}
            />
            {errorName && <div style={{ color: "red" }}>{errorName}</div>}
            <input
              type="text"
              placeholder="User Name"
              className={styles.input}
              value={user_name}
              onChange={(e) => handleUserNameChange(e)}
            />
            {errorUser_name && (
              <div style={{ color: "red" }}>{errorUser_name}</div>
            )}
            <input
              type="text"
              placeholder="Email"
              className={styles.input}
              value={email}
              onChange={(e) => handleEmailChange(e)}
            />
            {errorEmail && <div style={{ color: "red" }}>{errorEmail}</div>}
            <input
              type="password"
              placeholder="Password"
              className={styles.input}
              value={password}
              onChange={(e) => handlePasswordChange(e)}
            />
            {errorPassword && (
              <span className={styles.errorMessage}>{errorPassword}</span>
            )}
            <input
              type="password"
              placeholder="Confirm Password"
              className={`${styles.input} ${errorPassword && styles.error}`}
              value={confirmPassword}
              onChange={(e) => handleConfirmPasswordChange(e)}
            />
            {errorConfirmPassword && (
              <span className={styles.errorMessage}>
                {errorConfirmPassword}
              </span>
            )}

            <select
              className={styles.input}
              name="country"
              onChange={(e) => handleCountry(e)}
            >
              <option value="">Select a country</option>
              {countries.map((e) => {
                return (
                  <option key={e.id} value={e.label}>
                    {e.label}
                  </option>
                );
              })}
            </select>
            {errorCountry && (
              <span className={styles.errorMessage}>{errorCountry}</span>
            )}
            <button className={styles.btn}>Sign Up</button>
          </form>
        </div>

        {/* Sign In */}
        <div
          className={`${styles.container__form} ${styles["container--signin"]}`}
        >
          <form
            action="#"
            className={styles.form}
            id="form2"
            onSubmit={handleForm2Submit}
          >
            <h2 className={styles["form__title"]}>Sign In</h2>
            <input
              type="text"
              placeholder="Email"
              className={styles.input}
              value={emailLogin}
              onChange={(e) => handleEmailLoginChange(e)}
            />
            {errorEmailLogin && (
              <span className={styles.errorMessage}>{errorEmailLogin}</span>
            )}
            <input
              type="password"
              placeholder="Password"
              className={styles.input}
              value={passwordLogin}
              onChange={(e) => handlePasswordLoginChange(e)}
            />
            {errorPasswordLogin && (
              <span className={styles.errorMessage}>{errorPasswordLogin}</span>
            )}
            <p className={styles.form__title}> OR </p>
            <li>
              <a onClick={continueGoogle}>
                <i
                  className={`fa fa-google-plus-square ${styles["btnTwo"]}`}
                  aria-hidden="true"
                >
                  {" "}
                  Continue with Google
                </i>
              </a>
            </li>
            <a href="/forgotPassword" className={styles.link}>
              Forgot your password?
            </a>
            <button className={styles.btn}>Sign In</button>
          </form>
        </div>

        {/* Overlay */}
        <div className={styles.container__overlay}>
          <div className={styles.overlay}>
            <div
              className={`${styles.overlay__panel} ${styles["overlay--left"]}`}
            >
              <button className={styles.btn} id="signIn" onClick={handleSignIn}>
                Sign In
              </button>
            </div>
            <div
              className={`${styles.overlay__panel} ${styles["overlay--right"]}`}
            >
              <button className={styles.btn} id="signUp" onClick={handleSignUp}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;