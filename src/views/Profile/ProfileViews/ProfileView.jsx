import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./ProfileView.module.css";
import * as act from "../../../redux/actions";
import countries from "./countries";
import ShoppingView from "./ShoppingView";

const ProfileView = (props) => {
  const dispatch = useDispatch();

  const datosUser = JSON.parse(localStorage.getItem("user"));

  const [editingName, setEditingName] = useState(false);
  const [editingUserName, setEditingUserName] = useState(false);
  const [editingCountry, setEditingCountry] = useState(false);

  const [newName, setNewName] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newCountry, setNewCountry] = useState("");

  useEffect(() => {
    dispatch(act.getUserStorage(datosUser?.id));
    dispatch(act.postLogin());
    setNewName(datosUser?.name);
    setNewUserName(datosUser?.user_name);
    setNewCountry(datosUser?.country);
    return () => {
      dispatch(act.CleanDetail());
    };
  }, [dispatch]);

  const handleEditNameClick = () => {
    setEditingName(true);
//    setEditingUserName(false);
//    setEditingCountry(false);
    setNewName(datosUser?.name);
  };

  const handleEditUserNameClick = () => {
//    setEditingName(false);
    setEditingUserName(true);
//    setEditingCountry(false);
    setNewUserName(datosUser?.user_name);
  };

  const handleEditCountryClick = () => {
//    setEditingName(false);
//    setEditingUserName(false);
    setEditingCountry(true);
    setNewCountry(datosUser?.country);
  };

  const handleSaveClick = () => {
    if (editingName) {
      dispatch(act.editName(datosUser?.id, newName));
      setEditingName(false);
      localStorage.setItem("user", JSON.stringify({ ...datosUser, name: newName }));
    }
    if (editingUserName) {
      dispatch(act.editUserName(datosUser?.id, newUserName));
      setEditingUserName(false);
      localStorage.setItem("user", JSON.stringify({ ...datosUser, user_name: newUserName }));
    }
    if (editingCountry) {
      dispatch(act.editCountry(datosUser?.id, newCountry));
      setEditingCountry(false);
      localStorage.setItem("user", JSON.stringify({ ...datosUser, country: newCountry }));
    }
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
      <h1>Profile</h1>
      <div>
        <img className={style.image} src={datosUser?.profileImage} alt="Profile" />
        <h2>
          Name:{" "}
          {editingName ? (
            <input
              type="text"
              value={newName}
              onChange={handleNameChange}
              placeholder={datosUser?.name}
            />
          ) : (
            datosUser?.name || ""
          )}
        </h2>
        <h3>
          User name:{" "}
          {!editingName ? (
            editingUserName ? (
              <input
                type="text"
                value={newUserName}
                onChange={handleUserNameChange}
                placeholder={datosUser?.user_name}
              />
            ) : (
              datosUser?.user_name || ""
            )
          ) : null}
        </h3>
        <h3>
          Country:{" "}
          {editingCountry ? (
            <select value={newCountry} onChange={handleCountryChange}>
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          ) : (
            datosUser?.country || ""
          )}
        </h3>
        {!editingName && (
        <button onClick={handleEditNameClick} className={style.button}>
          Edit Name
        </button>
        )}
        {editingName && (
          <>
            <button onClick={handleSaveClick} className={style.saveButton}>
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
            <button onClick={handleSaveClick} className={style.saveButton}>
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
            <button onClick={handleSaveClick} className={style.saveButton}>
              Save
            </button>
            <button onClick={handleCancelClick} className={style.button}>
              Cancel
            </button>
          </>
        )}
        <ShoppingView/>
      </div>
    </div>
  );
};

export default ProfileView;