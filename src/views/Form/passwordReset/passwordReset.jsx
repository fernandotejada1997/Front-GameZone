import React from "react";
import { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useHistory } from "react-router-dom/cjs/react-router-dom";
import {
  verifyToken,
  resetPasswordBack,
  setError,
} from "../../../redux/actions";
import Error from "../../Error/error";
import Swal from "sweetalert2";

const PasswordReset = () => {
  const error = useSelector((state) => state.errorBack);
  const history = useHistory()
  const dispatch = useDispatch();

  const [validateUrl, setValidateUrl] = useState(false);
  const [password, setResetPassword] = useState("");
  const [confirmPassword, setConfirmResetPassword] = useState("");

  const [ errorPassword, setErrorPassword ] = useState("")
  const [ errorConfirmPassword, setErrorConfirmPassword ] = useState("")

  const params = useParams();

  let id = params.id;
  let token = params.token;

  // const passwordPattern = RegExp(/^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[a-zA-Z]).{8,}$/)//--

  //console.log({id, token})

  //console.log(params, "estos son los params")

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        await dispatch(verifyToken(id, token)); // ya esta funcionando
        setValidateUrl(true);
      } catch (error) {
        console.log(error);
        setValidateUrl(false);
      }
    };
    checkTokenValidity();

    //const dispararDispatch = async () => {
    //    try {
    //        await dispatch(verifyToken(id, token)) // ya esta funcionando
    //        setValidateUrl(true)
    //    } catch (error) {
    //        console.log(error)
    //    }
    //}

    //dispararDispatch()
  }, [id, token, dispatch]);

  const validatePassword = (e) => {
    e.preventDefault();

    setResetPassword(e.target.value);
  };

  const validateConfirmPassword = (e) => {
    e.preventDefault();

    setConfirmResetPassword(e.target.value);
  };

const validateResetPassword = () => {
    if (!password) {
        return 'The new password is required';
    // }else if (!passwordPattern.test(password)) {
        // return 'The password must be less than 8 characters and capital letter'
    }
}

  const validateResetConfirmPassword = () => {
    if (!confirmPassword) {
      return "I need you to confirm the password";
    } else if (password !== confirmPassword) {
      return "Passwords Do Not Match";
    }
  };

  const handleSubmitResetPassword = async (e) => {
    e.preventDefault()

    const passwordError = validateResetPassword()
    setErrorPassword(passwordError)
    const confirmNewPasswordError = validateResetConfirmPassword()
    setErrorConfirmPassword(confirmNewPasswordError)

    if (validateUrl) {
        if (passwordError || confirmNewPasswordError) {
            return;
        }else{
            await dispatch(resetPasswordBack(id,token,password,confirmPassword))
            console.log("cuenta recuperada")
            Swal.fire(
                'Good job!',
                'Recovered Account!',
                'success'
            )
            await history.push("/login")
        }
    }
}

  useEffect(() => {
    if (error) {
      Swal.fire("Ups!", `${error}`, "error").then(() => {
        dispatch(setError(null)); // Limpiar el error después de mostrarlo
      });
    }
  }, [error, dispatch]);

  return (
    <div>
      <Fragment>
        {validateUrl ? (
          <div>
            <h2 style={{ color: "white" }}> Add New Password </h2>

            {/* {/<h3 style={{"color" : "white"}} >Esta validacion acaba en 5 minutos</h3>/} */}

            <div>
              <form onSubmit={(e) => handleSubmitResetPassword(e)}>
                <label style={{ color: "white" }}> Password </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => validatePassword(e)}
                />
                {/* {errorPassword && <div style={{"color" : "red"}}>{errorPassword}</div>} */}

                <label style={{ color: "white" }}>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => validateConfirmPassword(e)}
                />
                {/* {errorConfirmPassword && <div style={{"color" : "red"}}>{errorConfirmPassword}</div>} */}

                <button>reset</button>
              </form>
            </div>
          </div>
        ) : (
          //<h1 style={{"color" : "white"}} > 404 Not Found </h1>
          <Error />
        )}
      </Fragment>
    </div>
  );
};

export default PasswordReset;