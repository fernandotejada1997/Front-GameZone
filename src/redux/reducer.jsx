import Swal from "sweetalert2";
import * as act from "./actions"

const initialState = {
    games: [],
    search: [],
    searchcopy: [],
    total: 0,
    counter: 0,
    cart: [],
    whishList: [],
    gameDetail: null,
    gameComingSoon: null,
    gameOffer: null,
    gamesTopSellers: null,
    gamesNewReleases: null,
    gamesFiltered: null,
    createAccount : [],
    user : null,
    // userGoogle : null,
    orderCreated: false,
    error: null,
    gamesPlatforms: [],
    languagesGames: [],
    categoriesGames: [],
    developersGames: [],
    genresGames: [],
    userStorage: null,
    gameReview: [],
    library: [],
    review: [],
    deleteReview: null,
    gamesAdmin: [],
    errorBack : null,
    gamesAdmin: [],
    gamesInfoId: {},
    gamesDeleteAdmin: {},
    editGamesAdmin: [],
    banGames: {},  
    allusers: [],
    users: [],
    ban: {}
};

const rootReducer=(state = initialState, action) => {
    switch(action.type) {


        //adm
        case act.ALLGAMESADMIN:
                return {
                    ...state,
                    gamesAdmin: action.payload
                }
        
            case act.INFOGAMES:
                return {
                    ...state,
                    gamesInfoId: action.payload
                }

            case act.BANGAMES:
                return {
                    ...state,
                    banGames: action.payload
                }

            case act.DELETEGAME:
                return {
                    ...state,
                    gamesDeleteAdmin: action.payload
                }
                
            case act.EDITGAMESADMIN:
                return {
                    ...state,
                    editGamesAdmin: action.payload
                }

        //? CASOS DE LA BIBLIOTECA

        case act.GET_MYGAMES:
          return {
              ...state,
              library: action.payload
          }
        //? CASO ADMIN ***
        case act.GETALLUSERS:
          return {
              ...state,
              allusers: action.payload
          }
        
        case act.EDITDATAUSER:
          return {
              ...state,
              user: {
                  ...state.user,
                  ...action.payload,
              },
          }
        
        case act.SET_USERS:
          return {
              ...state,
              users: action.payload,
          };
        
        case act.DELETEDATAUSER:
          return {
              ...state,
              // Puedes realizar otras actualizaciones del estado aquí si es necesario
          };
        

        // case act.BAN_USER:
        //   const { userId, banStatus } = action.payload;
        //   console.log('Información de la acción BAN_USER:', userId, banStatus);
        //   const updatedUsers = state.users.map((user) => {
        //       if (user.id === userId) {
        //           return {
        //               ...user,
        //               ban: banStatus,
        //           };
        //       }
        //       return user;
        //   });
        //   return {
        //       ...state,
        //       users: updatedUsers,
        //   };


        case act.BAN_USER:
                return {
                    ...state,
                    ban: action.payload
                }

        //filtros combinadosconst combtype = "COMBTYPE"
        
        
        //case error
        case act.ERROR:
                return {
                    ...state,
                    errorBack : action.payload
                }
        //filtros de busqueda

        case act.FILTER_LANGUAGES:
            const language = action.payload.toLowerCase();
            const filteredSea = state.search.filter(game =>
              game.Languages && game.Languages.some(lang => lang.language.toLowerCase().includes(language))
            );
            return {
              ...state,
              search: filteredSea
            };
          

        case act.FILTER_GENRES:
            const genre = action.payload;
          
            const filteredSearchsssssss = state.search.filter(game =>
              game.Genres && game.Genres.some(categor => categor.genre === genre)
            );
          
            return {
              ...state,
              search: filteredSearchsssssss
            };
          
        case act.FILTER_CATEGORIES:
            const category = action.payload;
          
            const filteredSearchssssss = state.search.filter(game =>
              game.Categories && game.Categories.some(categor => categor.category === category)
            );
          
            return {
              ...state,
              search: filteredSearchssssss
            };
          


            case act.FILTER_PLATFORMS:
                const platform = action.payload;
                let filteredSearchhhh;
              
                if (platform === "windows") {
                    filteredSearchhhh = state.search.filter(game =>
                    game.Platforms.some(platformObj => platformObj.platform === "windows")
                  );
                } else if (platform === "linux") {
                    filteredSearchhhh = state.search.filter(game =>
                    game.Platforms.some(platformObj => platformObj.platform === "linux")
                  );
                } else if (platform === "mac") {
                    filteredSearchhhh = state.search.filter(game =>
                    game.Platforms.some(platformObj => platformObj.platform === "mac")
                  );
                }
              
                return {
                  ...state,
                  search: filteredSearchhhh
                };
              



            case act.FILTER_FREE:
                let filteredSearchsssss;
                if (action.payload === "false") {
                  filteredSearchsssss = state.search.filter(game => game.is_free === true && game.release_date.coming_soon !== true);
                } else {
                  filteredSearchsssss = state.search.filter(game => game.is_free === false && game.release_date.coming_soon !== true);
                }
                return {
                  ...state,
                  search: filteredSearchsssss
                };
              

        case act.FILTER_TYPE:
            const typess = action.payload;
            const typesearchss = state.search.filter(game => game.type === typess);

            return {
                ...state,
                search: typesearchss
            };

            case act.FILTER_AGE:
                const types = action.payload;
                const typesearchs = state.search.filter(game => game.required_age === types);
    
                return {
                    ...state,
                    search: typesearchs
                };

            case act.FILTER_CONTROLLER:
                const CONTROLLER = action.payload;
                const typesearc = state.search.filter(game => game.controller_support === CONTROLLER);
    
                return {
                    ...state,
                    search: typesearc
                };
            

                case act.ORDER_BY:
                    const orderBy = action.payload;
                    let sortedSearch = [...state.search];
                  
                    if (orderBy === "des") {
                      sortedSearch.sort((a, b) => {
                        if (!a.coming_soon && !b.coming_soon) {
                          if (a.is_free && b.is_free) {
                            return a.price_overview - b.price_overview;
                          } else if (a.is_free && !b.is_free) {
                            return -1;
                          } else if (!a.is_free && b.is_free) {
                            return 1;
                          } else {
                            return a.price_overview - b.price_overview;
                          }
                        } else if (!a.coming_soon && b.coming_soon) {
                          return -1;
                        } else if (a.coming_soon && !b.coming_soon) {
                          return 1;
                        } else {
                          return 0;
                        }
                      });
                    } else if (orderBy === "asc") {
                      sortedSearch.sort((a, b) => {
                        if (!a.coming_soon && !b.coming_soon) {
                          if (a.is_free && b.is_free) {
                            return a.price_overview - b.price_overview;
                          } else if (a.is_free && !b.is_free) {
                            return 1;
                          } else if (!a.is_free && b.is_free) {
                            return -1;
                          } else {
                            return b.price_overview - a.price_overview;
                          }
                        } else if (!a.coming_soon && b.coming_soon) {
                          return -1;
                        } else if (a.coming_soon && !b.coming_soon) {
                          return 1;
                        } else {
                          return 0;
                        }
                      });
                    }
                  
                    const filteredSearch = sortedSearch.filter(game => !game.coming_soon);
                  
                    return {
                      ...state,
                      search: filteredSearch
                    };
                  
                  case act.RESET_FILTERS:
                    return {
                      ...state,
                      search: state.searchcopy
                    }
                  
            
            case act.GET_BY_NAME:
                return {
                    ...state,
                    search: action.payload,
                    searchcopy: action.payload
                }

//? CASOS DE PETICIONES

        case act.GET_GAMES:
            return {
                ...state,
                games: action.payload
            }
        

        case act.GET_DETAIL:
            return {
                ...state,
                gameDetail: action.payload
            }

        case act.CLEAR_DETAIL:
            return {
                ...state,
                gameDetail: null
            }
        case act.CLEAR_SEARCH:
            return {
                ...state,
                search: []
            }

        case act.GET_GAMES_OFFER:
            return {
                ...state,
                gameOffer: action.payload
            }

        case act.GET_GAMES_COMING_SOON:
            return {
                ...state,
                gameComingSoon: action.payload
            }
        
        case act.GET_GAMES_NEW_RELEASES:
            return {
                ...state,
                gamesNewReleases: action.payload
            }

        case act.GET_GAMES_TOP_SELLERS:
            return {
                ...state,
                gamesTopSellers: action.payload
            }

//?CASOS DEL CARRITO
case act.SET_TOTALPRICE:
      console.log(action.payload);
      return {
        ...state,
        total: action.payload,
      };

    case act.SET_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case act.ADD_TO_CART:
      const addGame = action.payload;
      const existingGame = state.cart.find((game) => game.id === addGame.id);
      if (existingGame) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "the game is already in the cart",
          showConfirmButton: false,
          timer: 2000,
        });
        return state;
      }
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Game added successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      const updateCart = [...state.cart, addGame];
      const updatePrice =
        state.total + (addGame.price === "free" ? 0 : addGame.price);
      return {
        ...state,
        cart: updateCart,
        total: updatePrice,
      };

    case act.REMOVE_TO_CART:
      const removeGameId = action.payload;
      const updateGameRemoveCart = state.cart.filter(
        (game) => game.id !== removeGameId
      );
      const gameRemoved = state.cart.find((game) => game.id === removeGameId);
      const updateTotalPrice = state.total - gameRemoved.price;
      return {
        ...state,
        cart: updateGameRemoveCart,
        total: updateTotalPrice,
      };

    case act.CLEAR_CART:
      return {
        ...state,
        cart: [],
        total: 0,
      };

    case act.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        orderCreated: true,
        error: null,
      };

    case act.CREATE_ORDER_FAILURE:
      return {
        ...state,
        orderCreated: false,
        error: action.payload,
      };

    case act.FREE_ORDER:
      console.log(action.payload);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Thanks for your purchase",
        showConfirmButton: false,
        timer: 2000,
      });
      console.log(action.payload);
      return {
        ...state,
        orderCreated: true,
        error: null,
      };
//? CASOS DE LA LISTA DE DESEADOS
        case act.SET_COUNTER:
              console.log(action.payload);
              return {
                ...state,
                counter: action.payload,
              };
            
        case act.SET_WHISH_LIST:
          console.log(action.payload);
          return {
            ...state,
            whishList: action.payload,
      };
        case act.ADD_TO_WHISH_LIST:
            const addList = action.payload
            const gameInWhishList = state.whishList.find(game => game.id === addList.id);
            if (gameInWhishList) {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'the game is already in the list',
                showConfirmButton: false,
                timer: 2000
            });
            return state;
            }   
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Game added successfully",
                showConfirmButton: false,
                timer: 2000
            })
            return {
                ...state,
                whishList: [...state.whishList, addList],
                counter: ++ state.counter,
            }

        case act.REMOVE_TO_WHISH_LIST:
            return{
                ...state,
                whishList: state.whishList.filter( game => game.id !== action.payload),
                counter: -- state.counter,
            }

        case act.CLEAR_WHISH_LIST:
            return {
                ...state,
                whishList: [],
                counter: 0
            }
// CASOS DEL USUARIO 
        case act.CREATE_USER: 
            return {
                ...state,
                createAccount : action.payload
            }
        case act.LOGIN_USER:
            return {
                ...state,
                user : action.payload
            }
        case act.DATA_GOOGLE:
            //console.log(userGoogle)
            return {
                ...state,
                user : action.payload
            }

        case act.LOGOUT_USER:{
            return{
                ...state,
                user : null
            }
        }

        case act.LOGOUT_USERGOOGLE:
            return {
                ...state,
                user : null
            }

        case act.PLATFORMS:
            return {
                ...state,
                gamesPlatforms: action.payload
            }

        case act.LANGUAGES:
            return {
                ...state,
                languagesGames: action.payload
            }

        case act.CATEGORIES:
            return {
                ...state,
                categoriesGames: action.payload
            }

        case act.DEVELOPERS:
            return {
                ...state,
                developersGames: action.payload
            }

        case act.GENRES:
            return {
                ...state,
                genresGames: action.payload
            }


        case act.CLEANDETAIL:
            return {
                ...state,
                user: null,
            };

            case act.EDITNAME:
                return {
                  ...state,
                  user: {
                    ...state.user,
                    name: action.payload.name,
                  },
                };

            case act.EDITUSERNAME:
                return {
                    ...state,
                    user: {
                    ...state.user,
                    user_name: action.payload.user_name,
                      },
                    };

            case act.EDITCOUNTRY:
                return {
                    ...state,
                    user: {
                    ...state.user,
                    country: action.payload.country,
                        },
                    };
            //  case act.EDITPROFILEIMAGE:
            //     return {
            //         ...state,
            //         user: {
            //         ...state.user,
            //         profileImage: action.payload.profileImage,
            //           },
            //         };

            case act.GETUSERSTORAGE:
                return {
                    ...state,
                    userStorage: action.payload
            }


//? CASOS DE LA BIBLIOTECA

            case act.GET_MYGAMES:
                return {
                    ...state,
                    library: action.payload
                }

                case act.MANDARREVIEW:
                    const game = action.payload;
                    return {
                        ...state,
                        review: game,
                    };

    case act.DELETEREVIEW:
                        //console.log(action.payload);
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Review removed successfuly",
            showConfirmButton: false,
            timer: 2000,
        }).then(() => {
        window.location.reload();
        });
        return {
            ...state,
            deleteReview: action.payload,
        };
        case act.GETGAMEREVIEW:
            //console.log(action.payload);
            return {
                ...state,
                review: action.payload,
            };
            case act.SET_GAMES:
            return {
                ...state,
                games: action.payload,
            }
            
        default:
            return {...state};
    }
};

export default rootReducer;