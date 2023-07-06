// import './App.css';
// import React from 'react';
// import { Route, useLocation, Switch } from 'react-router-dom';
// import { Landing, Home, ShoppingCart, Detail, Whishlist , Form} from "./views";
// import Footer from './components/Footer/Footer';
// import NavBar from './components/NavBar/NavBar';
// import Dashboard from './views/Adm/adm';
// import Search from "./views/Search/Search"
// import Review from './views/Reviews/Reviews';
// import Profile from './views/Profile/Profile';
// import MyGames from './views/MyGames/MyGames';
// import ReviewsModif from './views/Reviews/ReviewsModif';
// import ShoppingView from './views/Profile/ProfileViews/ShoppingView';
// import Terms from './views/FooterViews/Terms and conditions/Terms';
// import AboutUs from './views/FooterViews/About us/AboutUs';
// import Contact from './views/FooterViews/Contact/Contact';
// import {TableDb} from './views/Adm/Tablas/TableGames';
// import ChangePassword from './views/Profile/ProfileViews/changePassword.jsx';
// import ForgotPassword from './views/Form/ForgotPassword/forgotPassword';
// import PasswordReset from './views/Form/passwordReset/passwordReset';
// import Error from './views/Error/error';

// function App() {

//   const location = useLocation()

// return (
//   <div className="App">
//     <head>
//       <script src="https://kit.fontawesome.com/5c35a66fab.js" crossorigin="anonymous"></script>
//     </head>
//     <>
//     {location.pathname !== "/" && location.pathname !== "/dashboard" && location.pathname !== "/TABLA" && <NavBar />}
//     <Switch>
//         <Route exact path="/" render={() => <Landing/>} />
//         <Route path="/home" render={() => <Home/>}/>
//         <Route path="/cart" render={() => <ShoppingCart/>} /> 
//         <Route path="/login" render={() => <Form/>} /> 
//         <Route exact path="/detail/:id" render={(routeProps) => <Detail {...routeProps} />} />
//         <Route path="/whishlist" render={() => <Whishlist />} />
//         <Route path="/dashboard" render={() => <Dashboard />} />
//         <Route path="/search" render={() => <Search />} />
//         <Route path="/review" render={() => <Review />} />
//         <Route path="/library" render={() => <MyGames />}/>
//         {/* <Route path="/pruebas" render={() => <ShoppingView />}/> */}
//         <Route path="/detail/reviews/:id" render={() => <ReviewsModif />} />
//           <Route path="/segurity" render={() => <ChangePassword/>} />
//           <Route path="/forgotPassword" render={() => <ForgotPassword/>} />
//           <Route exact path="/reset-password/:id/:token" render={() => <PasswordReset/>} />
//           <Route path="*" render={() => <Error/>} />
//         <Route path="/user" render={(routeProps) => <Profile {...routeProps} />} />
//         <Route path="/terms" render={() => <Terms />} />
//         <Route path="/aboutus" render={() => <AboutUs />} />
//         <Route path="/contact" render={() => <Contact />} />
//         <Route path="/TABLA" render={() => <TableDb />}/>
//       </Switch>
//       {location.pathname !== "/dashboard" && <Footer/>}
//     </>
//   </div>
// );}


// export default App;
import './App.css';
import React from 'react';
import { Route, useLocation, Switch, Redirect } from 'react-router-dom';
import { Landing, Home, ShoppingCart, Detail, Whishlist , Form} from "./views";
import Footer from './components/Footer/Footer';
import NavBar from './components/NavBar/NavBar';
import Dashboard from './views/Adm/adm';
import Search from "./views/Search/Search"
import Review from './views/Reviews/Reviews';
import Profile from './views/Profile/Profile';
import MyGames from './views/MyGames/MyGames';
import ReviewsModif from './views/Reviews/ReviewsModif';
import ShoppingView from './views/Profile/ProfileViews/ShoppingView';
import Terms from './views/FooterViews/Terms and conditions/Terms';
import AboutUs from './views/FooterViews/About us/AboutUs';
import Contact from './views/FooterViews/Contact/Contact';
import ChangePassword from './views/Profile/ProfileViews/changePassword';
import ForgotPassword from './views/Form/ForgotPassword/forgotPassword';
import PasswordReset from './views/Form/passwordReset/passwordReset';
import Error from './views/Error/error';
import AllReviews from './views/Adm/Tablas/allReviews';




// //   if (isAuthenticated) {
// //     if (isAuthenticated.role === "admin") {
// //       return (
// //         <Route
// //           {...rest}
// //           render={(routeProps) => <Component {...routeProps} />}
// //         />
// //       );
// //     } else {
// //       // Redirige al usuario a una página de acceso denegado o muestra un mensaje de error
// //       return <Redirect to="/home" />;      
// //     }
// //   }
// //   // Redirige al usuario a la página de inicio de sesión
// //   return <Redirect to="/login" />;
// // }
function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = JSON.parse(localStorage.getItem("user"));

  if (isAuthenticated && isAuthenticated.role === "admin") {
    return (
      <Route
        {...rest}
        render={(routeProps) => <Component {...routeProps} />}
      />
    );
  } else {
    return <Redirect to="/home" />;
  }
}

function App() {

  const location = useLocation()

return (
  <div className="App">
    <head>
      <script src="https://kit.fontawesome.com/5c35a66fab.js" crossorigin="anonymous"></script>
    </head>
    <>
      {location.pathname !== "/" && location.pathname !== "/dashboard" && <NavBar/>}
      <Switch>

        <Route exact path="/" render={() => <Landing/>} />
        <Route path="/home" render={() => <Home/>}/>
        <Route path="/cart" render={() => <ShoppingCart/>} /> 
        <Route path="/login" render={() => <Form/>} /> 
        <Route exact path="/detail/:id" render={(routeProps) => <Detail {...routeProps} />} />
        <Route path="/whishlist" render={() => <Whishlist />} />
        {/* <PrivateRoute path="/dashboard" render={() => <Dashboard /> }/> */}
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route path="/search" render={() => <Search />} />
        <Route path="/review" render={() => <Review />} />
        <Route path="/allreview" render={() => <AllReviews />}/>
        <Route path="/library" render={() => <MyGames />}/>
        <Route path="/pruebas" render={() => <ShoppingView />}/>
        <Route path="/detail/reviews/:id" render={() => <ReviewsModif />} />
        <Route path="/segurity" render={() => <ChangePassword/>} />
        <Route path="/terms" render={() => <Terms />} />
        <Route path="/aboutus" render={() => <AboutUs />} />
        <Route path="/contact" render={() => <Contact />} />
        <Route path="/forgotPassword" render={() => <ForgotPassword/>} />
        <Route exact path="/reset-password/:id/:token" render={() => <PasswordReset/>} />
        <Route path="/user" render={(routeProps) => <Profile {...routeProps} />} />
        <Route path="*" render={() => <Error/>} />

      </Switch>
      {location.pathname !== "/dashboard" && <Footer/>}
    </>
  </div>
);}

export default App;
// import './App.css';
// import React from 'react';
// import { Route, useLocation, Switch, Redirect } from 'react-router-dom';
// import { Landing, Home, ShoppingCart, Detail, Whishlist , Form} from "./views";
// import Footer from './components/Footer/Footer';
// import NavBar from './components/NavBar/NavBar';
// import Dashboard from './views/Adm/adm';
// import Search from "./views/Search/Search"
// import Review from './views/Reviews/Reviews';
// import Profile from './views/Profile/Profile';
// import MyGames from './views/MyGames/MyGames';
// import ReviewsModif from './views/Reviews/ReviewsModif';
// import ShoppingView from './views/Profile/ProfileViews/ShoppingView';
// import Terms from './views/FooterViews/Terms and conditions/Terms';
// import AboutUs from './views/FooterViews/About us/AboutUs';
// import Contact from './views/FooterViews/Contact/Contact';
// import ChangePassword from './views/Profile/ProfileViews/changePassword';
// import ForgotPassword from './views/Form/ForgotPassword/forgotPassword';
// import PasswordReset from './views/Form/passwordReset/passwordReset';
// import Error from './views/Error/error';
// import AllReviews from './views/Adm/Tablas/allReviews';

// // function PrivateRoute({ component: Component, ...rest }) {
// //   const isAuthenticated = JSON.parse(localStorage.getItem("user"));
// //   console.log(isAuthenticated);
// //   if (isAuthenticated) {
// //     if (isAuthenticated.role === "admin") {
// //       return (
// //         <Route
// //           {...rest}
// //           render={(routeProps) => <Component {...routeProps} />}
// //         />
// //       );
// //     } else {
// //       // Redirige al usuario a una página de acceso denegado o muestra un mensaje de error
// //       return <Redirect to="/home" />;      
// //     }
// //   }
// //   // Redirige al usuario a la página de inicio de sesión
// //   return <Redirect to="/login" />;
// // }


// function App() {

//   const location = useLocation()

// return (
//   <div className="App">
//     <head>
//       <script src="https://kit.fontawesome.com/5c35a66fab.js" crossorigin="anonymous"></script>
//     </head>
//     <>
//       {location.pathname !== "/" && location.pathname !== "/dashboard" && <NavBar/>}
//       <Switch>

//         <Route exact path="/" render={() => <Landing/>} />
//         <Route path="/home" render={() => <Home/>}/>
//         <Route path="/cart" render={() => <ShoppingCart/>} /> 
//         <Route path="/login" render={() => <Form/>} /> 
//         <Route exact path="/detail/:id" render={(routeProps) => <Detail {...routeProps} />} />
//         <Route path="/whishlist" render={() => <Whishlist />} />
//         {/* <PrivateRoute path="/dashboard" render={() => <Dashboard /> }/> */}
//         <Route path="/dashboard" render={() => <Dashboard /> }/>
//         <Route path="/search" render={() => <Search />} />
//         <Route path="/review" render={() => <Review />} />
//         <Route path="/allreview" render={() => <AllReviews />}/>
//         <Route path="/library" render={() => <MyGames />}/>
//         <Route path="/pruebas" render={() => <ShoppingView />}/>
//         <Route path="/detail/reviews/:id" render={() => <ReviewsModif />} />
//         <Route path="/segurity" render={() => <ChangePassword/>} />
//         <Route path="/terms" render={() => <Terms />} />
//         <Route path="/aboutus" render={() => <AboutUs />} />
//         <Route path="/contact" render={() => <Contact />} />
//         <Route path="/forgotPassword" render={() => <ForgotPassword/>} />
//         <Route exact path="/reset-password/:id/:token" render={() => <PasswordReset/>} />
//         <Route path="/user" render={(routeProps) => <Profile {...routeProps} />} />
//         <Route path="*" render={() => <Error/>} />

//       </Switch>
//       {location.pathname !== "/dashboard" && <Footer/>}
//     </>
//   </div>
// );}

// export default App;