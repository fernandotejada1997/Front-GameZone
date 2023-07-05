import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitEmail, setError } from "../../../redux/actions";
import Swal from "sweetalert2";

const ForgotPassword = () => {

    const error = useSelector((state) => state.errorBack)

    console.log(error)

    const dispatch = useDispatch()

    const [ email, setEmail ] = useState("")
    const [ errorEmail, setErrorEmail ] = useState("")

    const emailPattern = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)

    const validateEmailError = () => {
        if (!email) {
          return 'Mail is required';
        }
        if (!emailPattern.test(email)) {
          return 'The email is invalid';
        }
        return '';
      }

    const validateEmail = (e) => {
        setEmail(e.target.value)
    }

    const onSubmitEmail = async (e) => {
        e.preventDefault()

        const emailError = validateEmailError()
        setErrorEmail(emailError)

        if (emailError) {
            return; // Detener la ejecución si hay errores de validación
        }else{
            await dispatch(submitEmail(email))

            Swal.fire('Good job!', 'Email sent successfully!', 'success');

            //if (error) {
            //    return await Swal.fire(
            //        'Ups!',
            //        `${error}`,
            //        'error'
            //    )
            //}else{
            //    await Swal.fire(
            //        'Good job!',
            //        'Email sent successfully!',
            //        'success'
            //    )
            //}
        }
    }

    useEffect(() => {
        if (error) {
            Swal.fire('Ups!', `${error}`, 'error').then(() => {
              dispatch(setError(null)); // Limpiar el error después de mostrarlo
            });
        }
    }, [error, dispatch])

    return(
        <div>

            <h2 style={{"color" : "white"}} >Recover your Account</h2>

            <form onSubmit={(e) => onSubmitEmail(e)}>

                <label style={{"color" : "white"}} >Email</label>
                <input type="text" value={email} onChange={(e) => validateEmail(e)} />
                {errorEmail && <div style={{"color" : "red"}}>{errorEmail}</div>}

                <button>
                    submit
                </button>

            </form>

        </div>
    )
}

export default ForgotPassword