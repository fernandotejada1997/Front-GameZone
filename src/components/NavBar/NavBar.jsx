import React, { useState, useEffect } from "react";
import style from "./NavBar.module.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logoImage from "../../assets/LOGOGAMEZONE2.png";
import usuario from "../../assets/usuario.png";
import { logoutUser, getDataGoogle, logoutGoogle } from "../../redux/actions";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const NavBar = () => {

    const cart = useSelector(state => state.cart)
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const [isNavbarFixed, setIsNavbarFixed] = useState(false);
    const [carItem, setCarItem] = useState(0);

    const handleSubMenuToggle = () => {
        setIsSubMenuOpen(!isSubMenuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            const isFixed = window.pageYOffset > 0;
            setIsNavbarFixed(isFixed);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const history = useHistory()
    const dispatch = useDispatch()

    const usuario = useSelector((state) => state.user)

    const [ conteo, setConteo ] = useState(0)
    const [ conteoTwo, setConteoTwo ] = useState(0)


    //console.log(conteoTwo, "esto es de google")

    console.log(conteo)

    useEffect(() => {
        //validateData()

        if (usuario) {
            localStorage.setItem("user", JSON.stringify(usuario));
            setConteo(1)
        }else{
            setConteo(0)
        }

    }, [usuario])

    const datosUser = JSON.parse(localStorage.getItem("user"));

    //console.log(datosUser, "datos del local")

    useEffect(() => {

        if (datosUser) {
            setConteo(1)
        }else{
            setConteo(0)
        }
        
    }, [datosUser])

    const removerDatos = async () => {

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Closed session'
        })

        await localStorage.removeItem("user");
        //await Cookies.remove("token")
        await dispatch(logoutUser())
        await dispatch(logoutGoogle())

        history.push("/")

        console.log("datos removidos")
    }

    function peticionData() {
        dispatch(getDataGoogle())
        console.log("peticones de datos")
    }

    useEffect(() => {
        if (datosUser) {
            console.log("hay datos")
        }else{
            peticionData()
        }

    }, [])

    useEffect(() => {
        setCarItem(cart.length);
    }, [cart]);

    return (
        <div className={`custom-navbar ${isNavbarFixed ? style.fixedNavbar : ""}`}>
            <Link to="/home">
                <img className={style.img} src={logoImage} width="300px" alt="Logo" />
            </Link>
            <ul className={style.NaV}>
                <li className={style["submenu-item"]}>
                    <Link to="/home" className={style["submenu-link"]}>
                        <i className={`fa fa-home ${style["cart_icon"]}`}></i>
                    </Link>
                </li>
                <li className={style["submenu__item"]}>
                    <Link to="/cart" className={style["submenu_link"]}>
                        {carItem > 0 && <div className={style["cart_count"]}>{carItem}</div>}
                        <i className={`fa fa-shopping-cart ${style["cart_icon"]}`}></i>
                    </Link>
                </li>

                {conteo > 0 ? (
                    <li>
                        <div className={style.usuarioContainer}>
                            <img
                                src={datosUser?.profileImage}
                                className={style.usuario}
                                alt={datosUser?.name}
                                title={datosUser?.name}
                                onClick={handleSubMenuToggle}
                            />
                            {isSubMenuOpen && (
                                <ul className={style.submenu}>
                                    <li className={style["submenu_item"]}>
                                        <Link to="#">{datosUser?.user_name}</Link>
                                    </li>
                                    <li className={style["submenu_item"]}>
                                        <Link to="/user">Perfil</Link>
                                    </li>
                                    <li className={style["submenu_item"]}>
                                        <Link to="/whishlist">Wish List</Link>
                                    </li>
                                    <li className={style["submenu_item"]}>
                                        <a onClick={removerDatos}>Logout</a>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </li>
                ) : (
                    <Link to="/login">
                        <button className={style.login_button}>Login</button>
                    </Link>
                )}
            </ul>
        </div>
    );
};

export default NavBar;