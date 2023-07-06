import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, setError } from "../../../redux/actions";
import Swal from "sweetalert2";
import styles from './change.module.css'

const ChangePassword = () => {

    const error = useSelector((state) => state.errorBack)

    const dispatch = useDispatch()
    
    const [ currentPassword, setCurrenPassword ] = useState("")
    const [ newPassword, setNewPassword ] = useState("")
    const [ confirmNewPassword, setConfirmPassword ] = useState("")

    const [ errorCurrentPassword, setErrorCurrenPassword ] = useState("")
    const [ errorNewPassword, setErrorNewPassword ] = useState("")
    const [ errorConfirmPassword, setErrorConfirmPassword ] = useState("")

    const passwordPattern = RegExp(/^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[a-zA-Z]).{8,}$/)//--

    const inputChangeCurrenPassword = (e) => {
        setCurrenPassword(e.target.value)
    }

    const inputChangeNewPassword = (e) => {
        setNewPassword(e.target.value)
    }

    const inputChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }

    const datosUser = JSON.parse(localStorage.getItem("user"));

    console.log(datosUser, "estos son datos del localStorage, componente change")

    const validateCurrentPassword = () => {
        if (!currentPassword) {
          return 'The current password is required';
        }
        return '';
    }

    const validateNewPassword = () => {
        if (!newPassword) {
            return 'The new password is required';
        }else if (!passwordPattern.test(newPassword)) {
            return 'The password must be less than 8 characters and capital letter'
        }
    }

    const validateConfirmPassword = () => {
        if (!confirmNewPassword) {
            return 'I need you to confirm the password'
        }else if (newPassword !== confirmNewPassword) {
            return 'Passwords Do Not Match'
        }
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const currentPasswordError = validateCurrentPassword()
        setErrorCurrenPassword(currentPasswordError)
        const newPasswordError = validateNewPassword()
        setErrorNewPassword(newPasswordError)
        const confirmNewPasswordError = validateConfirmPassword()
        setErrorConfirmPassword(confirmNewPasswordError)

        if ( datosUser && datosUser.id) {

            if (!datosUser.password) {
                if ( newPasswordError || confirmNewPasswordError) {
                    return; // Detener la ejecución si hay errores de validació
                }

                await dispatch(updatePassword(datosUser.id, "", newPassword, confirmNewPassword))
                await Swal.fire(
                    'Good job!',
                    'Updated Password!',
                    'success'
                )
            }else if(datosUser.password){

                if (currentPasswordError || newPasswordError || confirmNewPasswordError) {
                    return; // Detener la ejecución si hay errores de validación
                }else{
                    await dispatch(updatePassword(datosUser.id, currentPassword, newPassword, confirmNewPassword))
                    //localStorage.setItem("user", JSON.stringify({ ...datosUser, password: newPassword }));
                    await Swal.fire(
                        'Good job!',
                        'Updated Password!',
                        'success'
                    )
                }
            }

            console.log("cambios guardados")
        }else{
            console.log("el id no esta definido")
        }
    }

    useEffect(() => {
        if (error) {
            Swal.fire('Ups!', `${error}`, 'error').then(() => {
              dispatch(setError(null)); // Limpiar el error después de mostrarlo
            });
        }
    }, [error, dispatch])

    return (
        <div>

            <h3 className={styles.change_password} >
                Change Password
            </h3>

            <p className={styles.text}>
                We strongly recommend that, for your security, you choose a unique password that you do not use to connect to other accounts.
            </p>

            <div className={styles.Form}>

                <form onSubmit={(e) => handleOnSubmit(e)} >

                    {
                        datosUser.password  ? (
                            <div>
                                <label> CurrenPassword </label>
                                <input type="password" value={currentPassword} onChange={ (e) => inputChangeCurrenPassword(e)} />
                                {errorCurrentPassword && <div className={styles.error}>{errorCurrentPassword}</div>}
                            </div>
                        ) : (
                            <>
                            </>
                        )
                    }
                <div className={styles.input_group}>
                    <label> New Password </label>
                    <input className={styles.error} type="password" value={newPassword} onChange={(e) => inputChangeNewPassword(e)} />
                    {errorNewPassword && <div className={styles.erro} >{errorNewPassword}</div> }
                    <br/>
                    <label> Confirm New Password </label>
                    <input type="password" value={confirmNewPassword} onChange={(e) => inputChangeConfirmPassword(e)} />
                    {errorConfirmPassword && <div className={styles.erro}>{errorConfirmPassword}</div>}
                    
                    </div>
                    <button className={styles.button}>
                        Save
                    </button>

                </form>

            </div>

        </div>
    )
}

export default ChangePassword