import axios from "axios";
export const ADD_TO_CART = "ADD_TO_CART"
export const REMOVE_TO_CART = "REMOVE_TO_CART"
export const CLEAR_CART = "CLEAR_CART"
export const CLEAR_SEARCH = "CLEAR_SEARCH"
export const GET_GAMES = "GET_GAMES"
export const GET_DETAIL = "GET_DETAIL"
export const CLEAR_DETAIL = "CLEAR_DETAIL"
export const GET_GAMES_OFFER = "GET_GAMES_OFFER"
export const GET_GAMES_COMING_SOON = "GET_GAMES_COMING_SOON"
export const GET_GAMES_TOP_SELLERS = "GET_GAMES_TOP_SELLERS"
export const GET_GAMES_NEW_RELEASES = "GET_GAMES_NEW_RELEASES"
export const GET_BY_NAME = "GET_BY_NAME"
export const ADD_TO_WHISH_LIST = "ADD_TO_WHISH_LIST"
export const REMOVE_TO_WHISH_LIST = "REMOVE_TO_WHISH_LIST"
export const CLEAR_WHISH_LIST = "CLEAR_WHISH_LIST"
export const CREATE_USER = "CREATE_USER"
export const LOGIN_USER = "LOGIN_USER"
export const LOGOUT_USER = "LOGOUT_USER"
export const DATA_GOOGLE = "DATA_GOOGLE"
export const LOGOUT_USERGOOGLE = "LOGOUT_USERGOOGLE"
export const CREATE_ORDER_FAILURE = "CREATE_ORDER_FAILURE"
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS"
export const PLATFORMS = "PLATFORMS"
export const LANGUAGES = "LANGUAGES"
export const CATEGORIES = "CATEGORIES"
export const DEVELOPERS = "DEVELOPERS"
export const GENRES = "GENRES"
export const ORDER_BY = "ORDER_BY"
export const FILTER_TYPE = "FILTER_TYPE"
export const FILTER_AGE = "FILTER_AGE"
export const FILTER_FREE = "FILTER_FREE"
export const RESET_FILTERS = "RESET_FILTERS"
export const FILTER_PLATFORMS = "FILTER_PLATFORMS"
export const FILTER_CATEGORIES = "FILTER_CATEGORIES"
export const FILTER_LANGUAGES = "FILTER_LANGUAGES"
export const FILTER_GENRES = "FILTER_GENRES"
export const FILTER_CONTROLLER = "FILTER_CONTROLLER"
export const USER_PROFILE = "USER_PROFILE"
export const CLEANDETAIL = "CLEANDETAIL";
export const EDITNAME = "EDITNAME";
export const EDITUSERNAME = "EDITUSERNAME";
export const EDITCOUNTRY = "EDITCOUNTRY";
export const EDIT_PROFILE_IMAGE = "EDIT_PROFILE_IMAGE";
export const GETUSERSTORAGE = "GETUSERSTORAGE";
export const GET_MYGAMES = "GET_MYGAMES";
export const GETGAMEREVIEW = "GETGAMEREVIEW";
export const MANDARREVIEW = "MANDARREVIEW";
export const DELETEREVIEW = "DELETEREVIEW";
export const FREE_ORDER = "FREE_ORDER";
export const ERROR = "ERROR";
export const SET_CART = "SET_CART";
export const SET_TOTALPRICE = "SET_TOTALPRICE";
export const SET_WHISH_LIST = "SET_WHISH_LIST";
export const SET_COUNTER = "SET_COUNTER";
export const ALLGAMESADMIN = "ALLGAMESADMIN";
export const EDITGAMESADMIN = "EDITGAMESADMIN"
export const INFOGAMES = "INFOGAMES";
export const BANGAMES = "BANGAMES";
export const DELETEGAME = "DELETEGAME";
export const GETALLUSERS = "GETALLUSERS";
export const EDITDATAUSER = "EDITDATAUSER";
export const DELETEDATAUSER = "CLEANDATAUSER";
export const SET_USERS = "SET_USERS";
export const DELETE_USER = "DELETE_USER";
export const BAN_USER = "BAN_USER";
export const SET_GAMES = "SET_GAMES";

//adm
export const allGamesAdmin = () => {
    const endpoint = `allGamesAdmin`;
    return async (dispatch) => {
        const {data} = await axios.get(endpoint);
        return dispatch({
            type: ALLGAMESADMIN,
            payload: data
        })
    }
}


export const gamesBanAdmin = (id) => {
    const endpoint = `/games/${id}/ban`;
    return async (dispatch) => {
        const {data} = await axios.put(endpoint);
        return dispatch({
            type: BANGAMES,
            payload: data
        })
    }
}



export const infoGamesAdmin = (id) => {
    const endpoint = `games/${id}`;
    return async (dispatch) => {
        const {data} = await axios.get(endpoint);
        return dispatch({
            type: INFOGAMES,
            payload: data
        })
    }
}



//userlist
export const getUsers = () => {
    const endpoint = `https://back-gamezone-production.up.railway.app/users`;
    return async (dispatch) => {
        const {data} = await axios.get(endpoint);
        return dispatch({
            type: GETALLUSERS,
            payload: data
        })
    }
}

export const editUser = (id, updatedUser) => {
    return async (dispatch) => {
      try {
        const endpoint = `https://back-gamezone-production.up.railway.app/users/${id}`;
        const response = await axios.put(endpoint, updatedUser);
  
        dispatch(getUsers());
      } catch (error) {
        console.log(error.message);
      }
    };
  };
  

  export const setUsers = (users) => {
    return { type: SET_USERS, payload: users };
  };
  
  export const deleteUser = (id) => {
    return async function(dispatch) {
      try {
        const endpoint = `https://back-gamezone-production.up.railway.app/users/${id}`;
        await axios.delete(endpoint);
        dispatch({ type: 'DELETEDATAUSER' });
      } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        
      }
    };
  };
  
//   export const banUser = (userId, banStatus) => {
//     return (dispatch) => {
    
//       fetch(`https://back-gamezone-production.up.railway.app/users/${userId}/ban`, { 
//         method: 'PUT',
//         body: JSON.stringify({ ban: banStatus }),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//         .then((response) => response.json())
//         .then((data) => {
         
//           dispatch({ type: 'BAN_USER', payload: { userId, banStatus } });
//         })
//         .catch((error) => {
         
//           console.error('Error al banear el usuario:', error);
         
//         });
//     };
//   };
export const banUser = (id) => {
    const endpoint = `/users/${id}/ban`;
    return async (dispatch) => {
        const {data} = await axios.put(endpoint);
        return dispatch({
            type: BAN_USER,
            payload: data
        })
    }
}



export const editGamesAdmin = (id, gameData) => {
    const endpoint = `games/${id}`;
    return async (dispatch) => {
        const {data} = await axios.put(endpoint, gameData);
        return dispatch({
            type: EDITGAMESADMIN,
            payload: data
        })
    }
}



export const deleteGamesAdmin = (id) => {
    const endpoint = `games/${id}`;
    return async (dispatch) => {
        const {data} = await axios.delete(endpoint);
        return dispatch({
            type: DELETEGAME,
            payload: data
        })
    }
}

//google
export const loginGoogleFirebase = (datosGoogle) => {
    return async function (dispatch) {
        try {
            const login = await axios.post("https://back-gamezone-production.up.railway.app/firebaseGoogle", datosGoogle)
            //console.log(login)
            console.log(login.data)
            return dispatch({
                type : DATA_GOOGLE,
                payload : login.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
// ACTION DE ACTUALIZAR CONTRASEÑA 

export const updatePassword = (id, currentPassword, newPassword, confirmNewPassword) => {
    return async function (dispatch) {
        try {
            const update = await axios.put(`/updatePassword/${id}`, {currentPassword, newPassword, confirmNewPassword})
            console.log(update.data)
            //dispatch({
            //    type: EDITPASSWORD,
            //    payload: update.data,
            //});
        } catch (error) {
            console.log(error)
            return dispatch({
                type : ERROR,
                payload : error.response.data
            })
        }
    }
}

//ACTION DE RECUPERAR CUENTA

export const submitEmail = (email) => {
    return async function (dispatch) {
        try {

            const emailDos = { email : email}

            const responseEmail = await axios.post("/forgot-password", emailDos)
            console.log(responseEmail.data)
        } catch (error) {
            console.log(error.response.data)
            return dispatch({
                type : ERROR,
                payload : error.response.data
            })
            //alert(error.response.data)
        }
    }
}

export const verifyToken = (id, token) => {
    return async function (dispatch) {
        try {
            const verify = await axios.get(`/verify-url/${id}/${token}`)
            console.log(verify.data)
        } catch (error) {
            console.log(error)
            //alert(error.response.data)
        }
    }
}

export const resetPasswordBack = (id, token, passwordReset, passwordConfirmReset) => {
    return async function (dispatch) {
        try {
            //const password = { password : passwordReset }
            const reset = await axios.put(`/reset-password/${id}/${token}`, {passwordReset, passwordConfirmReset})
            console.log(reset.data)
        } catch (error) {
            console.log(error)
            return dispatch({// esto es de tokens invalidos
                type : ERROR,
                payload : error.response.data
            })
            //alert(error.data.message)
        }
    }
}

export const setError = (error) => {
    return {
      type: ERROR,
      payload: error,
    };
};



//! ARREGLAR TODAS LAS RUTAS Y REDUCER DEL RAILWAY
//? FUNCIONES DE PETICIONES
export const resetfilters = () => {
    return {
            type: "RESET_FILTERS",
        
    }
}
export const filterplatforms = (payload) => {
    return {
            
            type: "FILTER_PLATFORMS",
            payload: payload
        
    }
}
export const filterlanguages = (payload) => {
    return {
            
            type: "FILTER_LANGUAGES",
            payload: payload
        
    }
}
export const filtercontroller = (payload) => {
    return {
            
            type: "FILTER_CONTROLLER",
            payload: payload
        
    }
}
export const filtergenres = (payload) => {
    return {
            type: "FILTER_GENRES",
            payload: payload
        
    }
}
export const filtercategories = (payload) => {
    return {
            
            type: "FILTER_CATEGORIES",
            payload: payload
        
    }
}
export const filterage = (payload) => {
    return {
            
            type: "FILTER_AGE",
            payload: payload
        
    }
}
export const orderBy = (payload) => {
    return {
            
            type: "ORDER_BY",
            payload: payload
        
    }
}
export const filtertype = (payload) => {
    return {
            type: "FILTER_TYPE",
            payload: payload
    }
}
export const filterfree = (payload) => {
    return {
            type: "FILTER_FREE",
            payload: payload
    }
}
// export const getGames = () => {
    
//     return async function (dispatch) {
//         try {
//             console.log("esto es all games")
//             const response = await axios.get(`allGames`)
//             console.log(response);
//             const game = response.data
//             dispatch({
//                 type: GET_GAMES,
//                 payload: game
//             })
//         } catch (error) {
//             console.log(error.message);            
//         }
//     }
// }
    //GAMES
export const getGames = () => {
    return async function (dispatch) {
      try {
        const response = await axios.get(`allGames`);
        const games = response.data;
  
        dispatch({
          type: GET_GAMES,
          payload: games,
        });
  
        localStorage.setItem("games", JSON.stringify(games)); // Guardar los juegos en el almacenamiento local
      } catch (error) {
        console.log(error.message);
      }
    };
  };
  export const setGames = () => {
    return function (dispatch) {
      try {
        const storedGames = localStorage.getItem("games");
  
        if (storedGames) {
          const games = JSON.parse(storedGames);
         return dispatch({
            type: SET_GAMES,
            payload: games,
          });
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  };

export const gameDetail = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`search/${id}`)
            console.log(response);
            dispatch({
                type: GET_DETAIL,
                payload: response.data
            })
        } catch (error) {
            console.log(error.message);
        }
        
    }
}

// export const preload = () => {
//     return async (dispatch) => {
//         try {
//             await axios.get('http://localhost:3001/preload');
//             console.log("base de datos cargada")
//         } catch (error) {
//         dispatch(console.log(error));
//         }
//     };
// };

export const getByName = (name) => {
    return async function(dispatch, getState) {
    try {
        const storedGames = await JSON.parse(localStorage.getItem("games"));
        const filteredResults = storedGames.filter((game) =>
        game.name.toLowerCase().includes(name.toLowerCase()))
        // const lol = getState().games
        // localStorage.setItem(`games`, JSON.stringify(lol))
        dispatch({
            type: GET_BY_NAME,
            payload: filteredResults
        });
        } catch (error) {
            console.log(error.message);
        }
    };
};
// export const getByName = (name) => {
//     return async function(dispatch) {
//     try {
//         const response = await axios.get(`nameGames?name=${name}`);

//         const sortedResponse = response.data

//         dispatch({
//             type: GET_BY_NAME,
//             payload: sortedResponse
//         });
//         } catch (error) {
//             console.log(error.message);
//         }
//     };
// };


export const clearDetail = () => {
    return function (dispatch){
        dispatch({
            type: CLEAR_DETAIL
        })
    }
}

export const clearSearch = () => {
    return function (dispatch){
        dispatch({
            type: CLEAR_SEARCH
        })
    }
}

export const getGamesOffer = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`specials`)
            //console.log(response);
            dispatch({
                type: GET_GAMES_OFFER,
                payload: response.data
            })
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const getGamesComingSoon = () => {
    return async function (dispatch) {
    try {
        const response = await axios.get(`coming`);
        
        const games = response.data;

        // Eliminar objetos duplicados
        const uniqueGames = games.filter((game, index, self) => {
            return (
            index ===
            self.findIndex((g) => g.id === game.id)
            );
        });

        dispatch({
            type: GET_GAMES_COMING_SOON,
            payload: uniqueGames
        });
    } catch (error) {
        console.log(error.message);
    }
    };
};

export const getGamesTopSellers = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`sellers`)
            //console.log(response);
            dispatch({
                type: GET_GAMES_TOP_SELLERS,
                payload: response.data
            })
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const getGamesNewReleases = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`releases`)
            //console.log(response);
            dispatch({
                type: GET_GAMES_NEW_RELEASES,
                payload: response.data
            })
        } catch (error) {
            console.log(error.message);
        }
        
    }
}

//? FUNCIONES DEL CARRITO
export const setTotalPrice = (totalPrice) => {
    console.log(totalPrice);
    return function (dispatch, getState) {
        dispatch({
            type: SET_TOTALPRICE,
            payload: totalPrice
        })

        const total = getState().total;
        localStorage.setItem("total", JSON.stringify(total));
    }
}

export const setCart = (cart) => {
    return function (dispatch) {
        dispatch({
            type: SET_CART,
            payload: cart
        })
    }
}

export const addCart = (game) => {
    return function(dispatch, getState) {
        dispatch({
            type: ADD_TO_CART,
            payload: game,
        })

         //! revisar si funca YA
         const cart = getState().cart;
         localStorage.setItem("cart", JSON.stringify(cart));
         const total = getState().total;
         localStorage.setItem("total", JSON.stringify(total));
    }
}

export const removeCart = (id) => {
    //console.log(id);
    return function(dispatch, getState) {
        dispatch({
            type: REMOVE_TO_CART,
            payload: id,
        })

        //! revisar si funca YA
        const cart = getState().cart;
        localStorage.setItem("cart", JSON.stringify(cart));
        const total = getState().total;
        localStorage.setItem("total", JSON.stringify(total));
    }
}

export const clearCart = ()  => {
    return function(dispatch, getState) {
        dispatch({
            type: CLEAR_CART 
        })
           
         //! revisar si funca YA
     const cart = getState().cart;
     localStorage.setItem("cart", JSON.stringify(cart));
     const total = getState().total;
     localStorage.setItem("total", JSON.stringify(total));
    }  
}

export const createOrder = (totalPrice, cartGames, dataUser) => {
    console.log(totalPrice, cartGames, dataUser);
    return async function (dispatch) {
        try {
            const response = await axios.post("/createOrder", {totalPrice, cartGames, dataUser})
            if (response.status === 200) {
                dispatch({
                    type: CREATE_ORDER_SUCCESS,
                    payload: response.data
                })
                const data = response.data
                const paymentLink = data.links[1].href
                window.location.href = paymentLink
            } else {
                dispatch(createOrderFailure('Error creating order'));
            }
        } catch (error) {
            dispatch(createOrderFailure('Error creating order'));
            console.error('Error creating order:', error.message);
        }
    }
}

export const createOrderFailure = (errorMessage) => {
    return {
        type: CREATE_ORDER_FAILURE,
        payload: errorMessage
    }
}

export const freeOrder = (totalPrice, cartGames, dataUser) => {
    console.log(totalPrice, cartGames, dataUser);
    return async function (dispatch) {
      try {
        const response = await axios.post('/freeOrder', {totalPrice, cartGames, dataUser});
        
        if (response.status === 200) {
          dispatch({
            type: FREE_ORDER,
            payload: response.data
          });
        } else {
          dispatch(createOrderFailure('Error creating order'));
        }
      } catch (error) {
        console.error(error.message);
      }
    };
  };

//? FUNCIONES DE LA LISTA DE DESEADOS

export const setCounter = (c) => {
    return function (dispatch, getState) {
      dispatch({
        type: SET_COUNTER,
        payload: c,
      });
  
      const counter = getState().counter;
      localStorage.setItem("counter", JSON.stringify(counter));
    };
  };
  
  export const setWhishList = (list) => {
    return function (dispatch, getState) {
      dispatch({
        type: SET_WHISH_LIST,
        payload: list,
      });
  
      const lists = getState().whishList;
      localStorage.setItem("whishList", JSON.stringify(lists));
    };
  };
  
  export const addWhishList = (game) => {
    return function (dispatch, getState) {
      //console.log(game);
      dispatch({
        type: ADD_TO_WHISH_LIST,
        payload: game,
      });
  
      const lists = getState().whishList;
      localStorage.setItem("whishList", JSON.stringify(lists));
      const counter = getState().counter;
      localStorage.setItem("counter", JSON.stringify(counter));
    };
  };
  
  export const removeWhishList = (id) => {
    return function (dispatch, getState) {
      dispatch({
        type: REMOVE_TO_WHISH_LIST,
        payload: id,
      });
  
      const lists = getState().whishList;
      localStorage.setItem("whishList", JSON.stringify(lists));
      const counter = getState().counter;
      localStorage.setItem("counter", JSON.stringify(counter));
    };
  };

//? Action de Create User

// export const postCreateUser = (props) => {
//     return async function (dispatch) {
//         try {
//            const user = await axios.post("crearCuenta",props)
//            console.log(user.props)
//             return dispatch({
//                 type : CREATE_USER,
//                 payload : user.props
//             })
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }
export const postCreateUser = (props) => {
    return async function (dispatch) {
      try {
        const user = await axios.post("/crearCuenta", props);
        console.log(user.data);
        return dispatch({
          type: CREATE_USER,
          payload: user.props,
        });
      } catch (error) {
        console.log(error);
        return dispatch({
          type: ERROR,
          payload: error.response.data,
        });
      }
    };
  };

//? Accion de Loguear Usuario

// export const postLogin = (datos) =>{
//     return async function (dispatch) {
//         try {
//             const userTwo = await axios.post("iniciarSesion",datos)
//             console.log(userTwo.data, "estos son de las actions")
//             return dispatch({
//                 type : LOGIN_USER,
//                 payload : userTwo.data
//             })
//         } catch (error) {
//             console.log(error?.response?.data)
//             //return dispatch({
//             //    type : LOGIN_USER,
//             //    payload : error.response.data
//             //})
//         }
//     }
// }

export const postLogin = (datos) => {
    return async function (dispatch) {
      try {
        const userTwo = await axios.post("iniciarSesion", datos);
        console.log(userTwo.data, "estos son de las actions");
        return dispatch({
          type: LOGIN_USER,
          payload: userTwo.data,
        });
      } catch (error) {
        console.log(error?.response?.data);
        return dispatch({
          type: ERROR,
          payload: error.response.data,
        });
      }
    };
  };

//? Action de Logout Usuario

export const logoutUser = () => {
    return async function (dispatch) {
        try {
            const logout = axios.post("cerrarSesion")
            console.log(logout)
            return dispatch({
                type : LOGOUT_USER
            })
        } catch (error) {
            console.log(error)
        }

    }
}

//Action de login with Google

export const loginGoogle = () => {
    return function (dispatch) {
        try {
            const login = window.open("https://back-gamezone-production.up.railway.app/auth/google", "_self")
            console.log(login)
        } catch (error) {
            console.log(error)
        }
    }
}

export const getDataGoogle = () => {
    return async (dispatch) => {
        try {
            const dataGoogle = await axios.get("/auth/user", {
                withCredentials : true,
                headers : {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Credential' : true
                }
            })
            if (dataGoogle.status === 200) {
                console.log(dataGoogle.data, "datos desde la action")
                return dispatch({
                    type : DATA_GOOGLE,
                    payload : dataGoogle.data
                })
                //setUser(dato.data.user);
            }else {
                throw new Error("Authentication has failed!")
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const logoutGoogle = () => {
    return async (dispatch) => {
        try {
            const logoutTwo = await window.open("https://back-gamezone-production.up.railway.app/auth/logout", "_self")
            console.log(logoutTwo)
            return dispatch({
                type : LOGOUT_USERGOOGLE
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const clearWhishList = () => {
    return function (dispatch) {
        dispatch({
            type: CLEAR_WHISH_LIST,
        })
    }
}


export const platformsAll = () => {
    const endpoint = `platformGames`;
    return async (dispatch) => {
        const {data} = await axios.get(endpoint);
        return dispatch({
            type: PLATFORMS,
            payload: data
        })
    }
}



export const languagesGames = () => {
    const endpoint = `languagesGames`;
    return async (dispatch) => {
        const {data} = await axios.get(endpoint);
        return dispatch({
            type: LANGUAGES,
            payload: data
        })
    }
}

export const categoriesGames = () => {
    const endpoint = `categoriesGames`;
    return async (dispatch) => {
        const {data} = await axios.get(endpoint);
        return dispatch({
            type: CATEGORIES,
            payload: data
        })
    }
}

export const developersGames = () => {
    const endpoint = `developersGames`;
    return async (dispatch) => {
        const {data} = await axios.get(endpoint);
        return dispatch({
            type: DEVELOPERS,
            payload: data
        })
    }
}

export const genresGames = () => {
    const endpoint = `genresGames`;
    return async (dispatch) => {
        const {data} = await axios.get(endpoint);
        return dispatch({
            type: GENRES,
            payload: data
        })
    }
}

export const CleanDetail = () => {
    return function(dispatch){
        dispatch({ type: CLEANDETAIL })
    }   
};

export const editName = (id, newName) => {
    const endpoint = `/users/${id}`;
    return async (dispatch) => {
      try {
        const response = await axios.put(endpoint, { name: newName });
        dispatch({
          type: EDITNAME,
          payload: response.data,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
  };

  export const editUserName = (id, newUserName) => {
    const endpoint = `/users/${id}`;
    return async (dispatch) => {
      try {
        const response = await axios.put(endpoint, { user_name: newUserName });
        dispatch({
          type: EDITUSERNAME,
          payload: response.data,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
  };

  export const editCountry = (id, newCountry) => {
    const endpoint = `/users/${id}`;
    return async (dispatch) => {
      try {
        const response = await axios.put(endpoint, { country: newCountry });
        dispatch({
          type: EDITCOUNTRY,
          payload: response.data,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
  };

//   export const editProfileImage = () => {
//     return async function () {
//         try {
//             const formData = new FormData();
//             formData.append('file', selectedImage);
//             const response = await axios.post('http://localhost:3001/upload', formData, {
//               headers: {
//                 'Content-Type': 'multipart/form-data',
//                 datosUser: JSON.stringify(datosUser.id),
//               },
//             });
      
//             if (response.status === 200) {
//               console.log(response.data); // URL de la imagen en Cloudinary
//             } else {
//               console.log(response.data); // Mensaje de error
//             }
//           } catch (error) {
//             console.log(error.message);
//           }
//     }
// };

export const getUserStorage = (id) => {
    const endpoint = `/profile/${id}`;
    return async (dispatch) => {
        const {data} = await axios.get(endpoint);
        return dispatch({
            type: GETUSERSTORAGE,
            payload: data
        })
    }
}


// export const getGameReview = (id) => {

//     const endpoint = `/reviewsDemo/${id}`;

//     return async (dispatch) => {
//         const {data} = await axios.get(endpoint);
//         return dispatch({
//             type: GETGAMEREVIEW,
//             payload: data
//         })
//     }

// }

//? ACCIONES DE MI BIBLIOTECA

export const getMyGames = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`/user/games?id=${id}`);
        console.log(response);
        const games = response.data
        dispatch({
            type: GET_MYGAMES,
            payload: games.Games
        })
        //console.log(games.Games);
        } catch (error) {
            console.error(error.message);    
        }
    }
}

//REVIEW

export const getGameReview = (game) => {
    console.log(game);
    return (dispatch) => {
      try {
        return dispatch({
          type: GETGAMEREVIEW,
          payload: game,
        });
      } catch (error) {
        console.error(error.message);
      }
    };
  };

export const getDeleteReview = (idRev) => {
    return async function (dispatch) {
      try {
        const response = await axios.delete(`/user/deleteReview/${idRev}`);
        //console.log("RESPONSEEEE",response);
        console.log("IIIIIID", idRev);
        const game = response.data;
        dispatch({
          type: DELETEREVIEW,
          payload: game,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
  };

  export const mandarAReview = (game) => {
    console.log(game);
    return {
      type: MANDARREVIEW,
      payload: game,
    };
  };
  


