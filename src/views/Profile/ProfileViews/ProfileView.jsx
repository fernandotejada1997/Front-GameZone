import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import style from "./ProfileView.module.css";
import * as act from "../../../redux/actions";
import countries from "./countries";
import ShoppingView from "./ShoppingView";
import { save } from "redux-localstorage-simple";
import Swal from "sweetalert2";

const ProfileView = (props) => {
  const dispatch = useDispatch();

  const [datosUser, setDatosUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [editingName, setEditingName] = useState(false);
  const [editingUserName, setEditingUserName] = useState(false);
  const [editingCountry, setEditingCountry] = useState(false);
  const [newName, setNewName] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newCountry, setNewCountry] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setDatosUser(storedUser);
      setNewName(storedUser.name);
      setNewUserName(storedUser.user_name);
      setNewCountry(storedUser.country);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let info;
        const data = await dispatch(act.getUserStorage(datosUser.id));
        info = data.payload;
        localStorage.setItem("user", JSON.stringify(info));
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [editingName, editingUserName, editingCountry]);

  const handleEditNameClick = () => {
    setEditingName(true);
    setNewName(datosUser?.name);
  };

  const handleEditUserNameClick = () => {
    setEditingUserName(true);
    setNewUserName(datosUser?.user_name);
  };

  const handleEditCountryClick = () => {
    setEditingCountry(true);
    setNewCountry(datosUser?.country);
  };

  const handleSaveClick = () => {
    let updatedUser = { ...datosUser };
    if (editingName) {
      dispatch(act.editName(datosUser?.id, newName));
      updatedUser = { ...datosUser, name: newName };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setDatosUser(updatedUser);
      setEditingName(false);
    }
    if (editingUserName) {
      dispatch(act.editUserName(datosUser?.id, newUserName));
      updatedUser = { ...datosUser, user_name: newUserName };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setDatosUser(updatedUser);
      setEditingUserName(false);
    }
    if (editingCountry) {
      dispatch(act.editCountry(datosUser?.id, newCountry));
      updatedUser = { ...datosUser, country: newCountry };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setDatosUser(updatedUser);
      setEditingCountry(false);
    }
    save({ user: updatedUser });
    Swal.fire({
      title:
        "cambios guardados, se veran reflejados luego de su proximo inicio de sesion",
      icon: "success",
      position: "center",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const handleCancelClick = () => {
    setEditingName(false);
    setEditingUserName(false);
    setEditingCountry(false);
    setNewName(datosUser?.name);
    setNewUserName(datosUser?.user_name);
    setNewCountry(datosUser?.country);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setNewUserName(e.target.value);
  };

  const handleCountryChange = (e) => {
    setNewCountry(e.target.value);
  };

  return (
    <div className={style.container}>
      <br />
      <h1 className={style.text}>Profile</h1>
      <br />
      <br />
      <img
        className={style.image}
        src={datosUser?.profileImage}
        alt="Profile"
      />
      <ShoppingView />
      <div>
        <br />
        <br />
        <h3 className={style.textProfile}> Name: </h3>
        <h3 className={style.textP}>
          {editingName ? (
            <input
              className={style.input}
              type="text"
              value={newName}
              onChange={handleNameChange}
              placeholder={datosUser?.name}
            />
          ) : (
            datosUser?.name
          )}
        </h3>
        <h3 className={style.textProfile}> User Name: </h3>
        <h3 className={style.textP}>
          {editingUserName ? (
            <input
              className={style.input}
              type="text"
              value={newUserName}
              onChange={handleUserNameChange}
              placeholder={datosUser?.user_name}
            />
          ) : (
            datosUser?.user_name
          )}
        </h3>
        <h3 className={style.textProfile}> Country: </h3>
        <h3 className={style.textP}>
          {editingCountry ? (
            <select
              value={newCountry}
              onChange={handleCountryChange}
              className={style.select}
            >
              <option value="" className={style.holder}>
                Select a country
              </option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          ) : (
            datosUser?.country
          )}
        </h3>
        {!editingName && (
          <button onClick={handleEditNameClick} className={style.button}>
            Edit Name
          </button>
        )}
        {editingName && (
          <>
            <button onClick={handleSaveClick} className={style.button}>
              Save
            </button>
            <button onClick={handleCancelClick} className={style.button}>
              Cancel
            </button>
          </>
        )}
        {!editingUserName && (
          <button onClick={handleEditUserNameClick} className={style.button}>
            Edit User Name
          </button>
        )}
        {editingUserName && (
          <>
            <button onClick={handleSaveClick} className={style.button}>
              Save
            </button>
            <button onClick={handleCancelClick} className={style.button}>
              Cancel
            </button>
          </>
        )}
        {!editingCountry && (
          <button onClick={handleEditCountryClick} className={style.button}>
            Edit Country
          </button>
        )}
        {editingCountry && (
          <>
            <button onClick={handleSaveClick} className={style.button}>
              Save
            </button>
            <button onClick={handleCancelClick} className={style.button}>
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileView;