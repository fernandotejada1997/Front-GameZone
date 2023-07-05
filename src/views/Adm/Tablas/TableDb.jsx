import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as act from "../../../redux/actions";
import MUIDataTable from "mui-datatables";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import InfoIcon from '@mui/icons-material/Info';
import TextField from '@mui/material/TextField';
import { Switch } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import axios from 'axios';
import Swal from 'sweetalert2';
import style from "./tabla.module.css";

export const TableDb = () => {

  const dispatch = useDispatch();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteRowIndex, setDeleteRowIndex] = useState(null);
  const [showGameInfo, setShowGameInfo] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingGameId, setEditingGameId] = useState();
  
  const [isFree, setIsFree] = useState(false);
  const [comingSoon, setComingSoon] = useState(false);
  const [discounted, setDiscounted] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [age, setAge] = useState(0);
  const [description, setDescription] = useState("");
  const [support, setSupport] = useState("");
  const [price, setPrice] = useState(0);
  const [release, setRelease] = useState("");
  const [percent, setPercent] = useState(0);
  const [developersInput, setDevelopersInput] = useState("");
  const [languaguesInput, setLanguaguesInput] = useState("");
  const [genresInput, setGenresInput] = useState("");
  const [categoriesInput, setCategoriesInput] = useState("");
  const [minimumInput, setMinimumInput] = useState('');
  const [recommendedInput, setRecommendedInput] = useState('');
  
  const [selectedHeaderImage, setSelectedHeaderImage] = useState(null);
  const [selectedCapsuleImage, setSelectedCapsuleImage] = useState(null);

  const [selectedGameId, setSelectedGameId] = useState(null);

  const [isGameBlocked, setGameBlocked] = useState(false);
  const [isGameEdit, setGameEdit] = useState(false);

  const AllGamesAdmin = useSelector((state) => state.gamesAdmin);
  //console.log(AllGamesAdmin)
  const idGamesAdmin = useSelector((state) => state.gamesInfoId);
  const developers = useSelector((state) => state.developersGames);

  let capsule
  let header 

  useEffect(() => {
    dispatch(act.allGamesAdmin());
    dispatch(act.developersGames());
  }, [dispatch]);

  const handleEdit = (rowIndex) => {
    const rowData = data[rowIndex];
    const gameId = rowData.id;
    setEditingGameId(gameId); 
    openEditDialog(rowIndex);

    dispatch(act.infoGamesAdmin(gameId));
  };

  const handleInfo = (rowIndex) => {
    const rowData = data[rowIndex];
    const gameId = rowData.id;
    setSelectedGameId(gameId); 
    dispatch(act.infoGamesAdmin(gameId));
    setShowGameInfo(true);
  }

  const handleDelete = (rowIndex) => {
    setDeleteRowIndex(rowIndex);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    const newData = [...data];
    const rowData = data[deleteRowIndex];
    const gameId = rowData.id;
    newData.splice(deleteRowIndex, 1);
    dispatch(act.deleteGamesAdmin(gameId));
    setDeleteDialogOpen(false);
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  const handleBan = (rowIndex) => {
    const rowData = data[rowIndex];
    const gameId = rowData.id;
    Swal.fire({
      title: '¿Estás seguro de cambiar el estado del juego?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, lo estoy',
      cancelButtonText: 'No, lo estoy',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(act.gamesBanAdmin(gameId));
        dispatch(act.infoGamesAdmin(gameId));

        setGameBlocked(true);

        Swal.fire({
          title: '¡Juego bloqueado!',
          icon: 'success',
          text: 'El juego ha sido bloqueado exitosamente.',
        }).then(() => {
          setGameBlocked(false);
        })
      } else {
        Swal.fire({
          title: 'Acción cancelada',
          icon: 'info',
          text: 'No se realizó ningún bloqueo de juego.',
        });
      }
    });
  };

  useEffect(() => {
    if (isGameBlocked) {
      dispatch(act.allGamesAdmin());
    }
  }, [isGameBlocked, dispatch]);

  const openEditDialog = (rowIndex) => {
    setEditDialogOpen(true);
  };
  
  const closeEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleIsFreeChange = () => {
    setIsFree(!isFree);
  };

  const handleComingSoonChange = () => {
    setComingSoon(!comingSoon);
  };

  const handleDiscountedChange = () => {
    setDiscounted(!discounted);
  };

  const handlePlatformChange = (event) => {
    const platform = event.target.value;
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSupportChange = (event) => {
    setSupport(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleReleaseChange = (event) => {
    setRelease(event.target.value);
  };

  const handlePercentChange = (event) => {
    setPercent(event.target.value);
  };

  const handleDevelopersChange = (event) => {
    setDevelopersInput(event.target.value);
  };

  const handleLanguagesChange = (event) => {
    setLanguaguesInput(event.target.value);
  };

  const handleGenresChange = (event) => {
    setGenresInput(event.target.value);
  };

  const handleCategoriesChange = (event) => {
    setCategoriesInput(event.target.value);
  };

  const handleMinimumChange = (event) => {
    setMinimumInput(event.target.value);
  };

  const handleRecommendedChange = (event) => {
    setRecommendedInput(event.target.value);
  };

  const handleHeaderImageChange = (event) => {
    setSelectedHeaderImage(event.target.files[0]);
  };

  const handleCapsuleImageChange = (event) => {
    setSelectedCapsuleImage(event.target.files[0]);
  };

  const deleteImage = (type) => {
    if (type === 'header') {
      setSelectedHeaderImage(null);
    } else if (type === 'capsule') {
      setSelectedCapsuleImage(null);
    }
  };

// console.log(editingGameId)
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Handling Header Image
      if (selectedHeaderImage) {
        const formDataHeader = new FormData();
        formDataHeader.append('file', selectedHeaderImage);
        const responseHeader = await axios.put(
          `https://back-gamezone-y96h.onrender.com/uploadHeader/${editingGameId}`,
          formDataHeader,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (responseHeader.status === 200) {
          header = responseHeader.data
          console.log('Header Image URL:', responseHeader.data);
        } else {
          console.log('Error:', responseHeader.data);
        }
      }

      // Handling Capsule Image
      if (selectedCapsuleImage) {
        const formDataCapsule = new FormData();
        formDataCapsule.append('file', selectedCapsuleImage);

        const responseCapsule = await axios.put(
          `https://back-gamezone-y96h.onrender.com/uploadCapsule/${editingGameId}`,
          formDataCapsule,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (responseCapsule.status === 200) {
          capsule = responseCapsule.data
          console.log('Capsule Image URL:', responseCapsule.data);
        } else {
          console.log('Error:', responseCapsule.data);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar el juego.',
          });
        }
      }

      return (capsule, header)

    } catch (error) {
      console.log(error.message);
    }

    setSelectedHeaderImage(null);
    setSelectedCapsuleImage(null);
  }; 
  
  console.log(idGamesAdmin)
  const handleSaveClick = () => {
    const developers = developersInput.split(',').map((dev) => dev.trim());
    const languages = languaguesInput.split(',').map((dev) => dev.trim());
    const genres = genresInput.split(',').map((dev) => dev.trim());
    const categories = categoriesInput.split(',').map((dev) => dev.trim());
    const gameData = {
      name: name ? name : idGamesAdmin.name,
      type: type ? type : idGamesAdmin.type,
      required_age: age ? age : idGamesAdmin.required_age,
      release_date: release ? release : idGamesAdmin.release_date,
      detailed_description: description ? description : idGamesAdmin.detailed_description,
      coming_soon: comingSoon ? comingSoon : idGamesAdmin.coming_soon,
      controller_support: support ? support : idGamesAdmin.controller_support,
      is_free: isFree ? isFree : idGamesAdmin.is_free,
      price_overview: price ? price : idGamesAdmin.price_overview,
      discounted: discounted ? discounted : idGamesAdmin.discounted,
      discount_percent: percent ? percent : idGamesAdmin.discount_percent,
      platform: selectedPlatforms ? selectedPlatforms : idGamesAdmin.Platforms,
      developers: developers.length ? developers : idGamesAdmin.Developers,
      languages: languages.length ? languages : idGamesAdmin.Languages,
      genres: genres.length ? genres : idGamesAdmin.Genres,
      categories: categories.length ? categories : idGamesAdmin.Categories,
      pc_requirements: {
        minimum: minimumInput ? minimumInput : idGamesAdmin.pc_requirements.minimum,
        recommended: recommendedInput ? recommendedInput : idGamesAdmin.pc_requirements.recommended,
      },
      header_image: header ? header : idGamesAdmin.header_image,
      capsule_image: capsule ? capsule : idGamesAdmin.capsule_image,
    };
    // console.log(gameData)
    dispatch(act.editGamesAdmin(editingGameId, gameData));
    closeEditDialog();
  };

  const data = AllGamesAdmin;

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: false,
      },
    },
    {
      name: "name",
      label: "NAME",
      options: {
        filter: true,
        filterOptions: {
          names: [
            "A", "B", "C", "D", "E", "F",
            "G", "H", "I", "J", "K", "L", "M",
            "N", "O", "P", "Q", "R", "S", "T",
            "U", "V", "W", "X", "Y", "Z", "*/&$#0-9"
          ],
          logic: (value, filters) => {
            if (filters.length === 0) return true;
    
            const firstLetter = value.charAt(0).toUpperCase();
            if (filters.includes(firstLetter)) {
              return false;
            }
    
            if (filters.includes("*/&$#0-9")) {
              return /^[A-Z]/.test(value);
            }
    
            return true;
          },
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          if (value && value.length > 0) {
            return (
              <Button onClick={() => {
                handleInfo(tableMeta.rowIndex);
              }}>
                {value}
              </Button>
            );
          } else {
            return "No game info";
          }
        },
      },
    },
    {
      name: "Developers",
      label: "DEVELOPERS",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          if (value && value.length > 0) {
            const developers = value.map((dev) => dev.developer).join(", ");
            return developers;
          } else {
            return "No developers to show";
          }
        },
        sort: false,
        empty: true,
        customFilterValue: (value, rowData) => {
          if (value && value.length > 0) {
            return rowData.filter((data) =>
              data.developers.some((dev) => dev.developer.includes(value))
            );
          } else {
            return rowData;
          }
        },
        filterOptions: {
          names: developers.map((dev) => dev.developer),
        },
      },
    },
    {
      name: "price_overview",
      label: "PRICE",
      options: {
        filter: true,
        filterOptions: {
          names: [
            "Free",
            "0.01 - 2.00", 
            "2.01 - 5.00", 
            "5.01 - 10.00",
            "10.0 - 20.00",
            "20.00++"
          ],
          logic: (value, filters) => {
            if (filters.length === 0) return true;
    
            const price = parseFloat(value);
            const isFree = filters.includes("Free");
    
            if (isFree && price === 0) {
              return false;
            }
    
            for (const filter of filters) {
              if (filter === "Free") continue;
              const [min, max] = filter.split(" - ");
              if (filter.endsWith("++")) {
                if (price >= parseFloat(min)) {
                  return false;
                }
              } else {
                if (price >= parseFloat(min) && price <= parseFloat(max)) {
                  return false;
                }
              }
            }
            return true;
          },
        },
        customFilterList: (options, filterList, filterPos) => {
          const filters = options.filterOptions.names;
          const activeFilters = filterList[filterPos];
          return filters.map((name) => !activeFilters.includes(name));
        },
        customBodyRender: (value) => {
          return value; 
        },
      },
    },
    {
      name: "ban",
      label: "GAMES STATUS",
      options: {
        customBodyRender: (value) => {
          return value ? "Banned" : "Active";
        },
      },
    },
    {
      name: "Actions",
      options: {
        customBodyRender: (dataIndex, tableMeta, rowIndex) => {
          return (
            <div>
              <IconButton onClick={() => handleEdit(tableMeta.rowIndex)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(tableMeta.rowIndex)}>
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={() => handleBan(tableMeta.rowIndex)}>
                <BlockIcon />
              </IconButton>
              <IconButton onClick={() => handleInfo(tableMeta.rowIndex)}>
                <InfoIcon />
              </IconButton>
            </div>
          );
        },
        filter: false
      },
    },
  ];

  const options = {
    selectableRows: "multiple",
    filterType: "multiselect",
    responsive: "vertical",
  };

  useEffect(() => {
    if (!deleteDialogOpen) {
      dispatch(act.allGamesAdmin());
    }
  }, [deleteDialogOpen, dispatch]);


  return (
    <div className= {style.total} >
    
      <MUIDataTable

        title={"ALL GAMES"}
        data={AllGamesAdmin}
        columns={columns}
        options={options}
      />

<Dialog open={editDialogOpen} onClose={closeEditDialog}>
  <DialogTitle>Edit Game</DialogTitle>
  <DialogContent><br />
    <TextField
      label="NAME"
      type="text"
      value={name}
      onChange={handleNameChange}
    /><br /><br />
    <TextField
      label="TYPE"
      type="text"
      value={type}
      onChange={handleTypeChange}
    /><br /><br />
    <TextField
      label="REQUIRED AGE"
      type="number"
      value={age}
      onChange={handleAgeChange}
    /><br /><br />
    <p>IS FREE: {isFree ? 'TRUE' : 'FALSE'}</p>
    <Switch
      label="IS FREE"
      checked={isFree}
      value={isFree}
      onChange={handleIsFreeChange}
    /><br /><br />
    <TextField
      label="DETAILED DESCRIPTION"
      type="text"
      value={description}
      onChange={handleDescriptionChange}
    /><br /><br />
    <TextField
      label="CONTROLLER SUPPORT"
      type="text"
      value={support}
      onChange={handleSupportChange}
    /><br /><br />
    <TextField
      label="RELEASE DATE"
      type="text"
      value={release}
      onChange={handleReleaseChange}
    /><br /><br />
    <p>COMING SOON: {comingSoon ? 'TRUE' : 'FALSE'}</p>
    <Switch
      label="COMING SOON"
      checked={comingSoon}
      value={comingSoon}
      onChange={handleComingSoonChange}
    /><br /><br />
    <TextField
      label="PRICE OVERVIEW"
      type="number"
      value={price}
      onChange={handlePriceChange}
    /><br /><br />
    <TextField
      label="DEVELOPERS"
      type="text"
      value={developersInput}
      onChange={handleDevelopersChange}
    /><br /><br />
    PLATFORMS<br />
    <div>
      <label>
      <Checkbox
          //type="checkbox"
          value="windows"
          onChange={handlePlatformChange}
          checked={selectedPlatforms.includes("windows")}
        />
        Windows
      </label>
      <br />
      <label>
      <Checkbox
          //type="checkbox"
          value="mac"
          onChange={handlePlatformChange}
          checked={selectedPlatforms.includes("mac")}
        />
        Mac
      </label>
      <br />
      <label>
      <Checkbox
          //type="checkbox"
          value="linux"
          onChange={handlePlatformChange}
          checked={selectedPlatforms.includes("linux")}
        />
        Linux
      </label>
      <p>Plataformas seleccionadas: {selectedPlatforms.join(", ")}</p>
    </div>
    <br />
        <TextField
      label="LANGUAGES"
      type="text"
      value={languaguesInput}
      onChange={handleLanguagesChange}
    /><br /><br />
    <TextField
      label="GENRES"
      type="text"
      value={genresInput}
      onChange={handleGenresChange}
    /><br /><br />
    <TextField
      label="CATEGORIES"
      type="text"
      value={categoriesInput}
      onChange={handleCategoriesChange}
    /><br /><br />
    PC REQUIREMENTS <br />
    <TextField
      label="MINIMUM"
      type="text"
      value={minimumInput}
      onChange={handleMinimumChange}
    /><br /><br />
    <TextField
      label="RECOMMENDED"
      type="text"
      value={recommendedInput}
      onChange={handleRecommendedChange}
    /><br /><br />
    <p>DISCOUNTED: {discounted ? 'TRUE' : 'FALSE'}</p>
    <Switch
      label="DISCOUNTED"
      checked={discounted}
      value={discounted}
      onChange={handleDiscountedChange}
    /><br /><br />
    <TextField
      label="DISCOUNT PERCENT"
      type="number"
      value={percent}
      onChange={handlePercentChange}
    /><br /><br />
        <form onSubmit={handleSubmit}>
      <div>
        HEADER IMAGE<br />
        <TextField
          type="file"
          accept="image/*"
          name="file"
          onChange={handleHeaderImageChange}
        />
        <br />
        <br />
      </div>

      <div>
        CAPSULE IMAGE<br />
        <TextField
          type="file"
          accept="image/*"
          name="file"
          onChange={handleCapsuleImageChange}
        />
        <br />
        <br />
      </div>

      {selectedHeaderImage && (
        <>
          <label>{selectedHeaderImage.name}</label>
          <button onClick={() => deleteImage('header')}>Cancel</button>
        </>
      )}

      {selectedCapsuleImage && (
        <>
          <label>{selectedCapsuleImage.name}</label>
          <button onClick={() => deleteImage('capsule')}>Cancel</button>
        </>
      )}

      <div>
        <button type="submit">Subir imágenes</button>
      </div>
    </form>
  </DialogContent>
  <DialogActions>
    <Button onClick={closeEditDialog}>Cancel</Button>
    <Button onClick={handleSaveClick}>Save</Button>
  </DialogActions>
</Dialog>


      <Dialog open={deleteDialogOpen} onClose={cancelDelete}>
        <DialogTitle>Are you about to delete the {data[deleteRowIndex]?.name} game with ID {data[deleteRowIndex]?.id} are you sure?</DialogTitle>
        <DialogActions>
          <Button onClick={cancelDelete}>No, I'm not</Button>
          <Button onClick={confirmDelete}>I'm sure</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showGameInfo} onClose={() => setShowGameInfo(false)}>
        <DialogTitle>Game Information</DialogTitle>
        <DialogContent>
          ID: <br />
          {idGamesAdmin.id !== undefined && idGamesAdmin.id !== null
          ? idGamesAdmin.id
          : "No id to display"} <br /><br />

          NAME: <br />
          {idGamesAdmin.name !== undefined && idGamesAdmin.name !== null
          ? idGamesAdmin.name
          : "No display name"}<br /><br />

          {idGamesAdmin.header_image !== undefined && idGamesAdmin.header_image !== null
          ? <img src={idGamesAdmin.header_image} alt="Game Header" />
          : "NO PICTURE TO SHOW"}<br /><br />

          TYPE: <br /> 
          {idGamesAdmin.type !== undefined && idGamesAdmin.type !== null
          ? idGamesAdmin.type
          : "There is no type to show"}<br /><br />

          REQUIRED AGE: <br />
          {idGamesAdmin.required_age}<br /><br />

          IS FREE: <br /> 
          {idGamesAdmin.is_free ? "true" : "false"}<br /><br />

          DETAILED DESCRIPTION: <br />
          {idGamesAdmin.detailed_description 
          && idGamesAdmin.detailed_description
          ? idGamesAdmin.detailed_description.replace(/<(?:.|\n)*?>/gm, "") 
          : "No description to show"}<br /><br />

          CONTROLLER SUPPORT: <br />
          {idGamesAdmin.controller_support !== null
          ? idGamesAdmin.controller_support
          : "No support information to display"}<br /><br />

          RELEASE DATE: <br />
          {idGamesAdmin.release_date !== undefined && idGamesAdmin.release_date !== null
          ? idGamesAdmin.release_date
          : "There is no release date"}<br /><br />

          COMING SOON: <br />
          {idGamesAdmin.coming_soon ? "true" : "false"}<br /><br />

          PRICE: <br />
          {idGamesAdmin.price_overview}<br /><br />

          PC REQ. MIN: <br />
          {idGamesAdmin.pc_requirements 
          && idGamesAdmin.pc_requirements.minimum 
          ? idGamesAdmin.pc_requirements.minimum.replace(/<(?:.|\n)*?>/gm, '').replace("Minimum:", "") 
          : 'No minimum requirements available.'}<br /><br />

          PC REQ. RECOM: <br />
          {idGamesAdmin.pc_requirements
          && idGamesAdmin.pc_requirements.recommended
          ? idGamesAdmin.pc_requirements.recommended.replace(/<(?:.|\n)*?>/gm, '').replace("Recommended:", "")
          : 'No recommended requirements available.'}<br /><br />

          CATEGORIES: <br/>
          {Array.isArray(idGamesAdmin.Categories) && idGamesAdmin.Categories.length > 0 ? (
            idGamesAdmin.Categories.map((categoryObj) => categoryObj.category).join(', ')
          ) : (
            'There are no categories to display.'
          )}<br /><br />


          DEVELOPERS: <br/>
          {Array.isArray(idGamesAdmin.Developers) && idGamesAdmin.Developers.length > 0 ? (
            idGamesAdmin.Developers.map((categoryObj) => categoryObj.developer).join(', ')
          ) : (
            'There are no developer to display.'
          )}<br /><br />

          GENRES: <br/>
          {Array.isArray(idGamesAdmin.Genres) && idGamesAdmin.Genres.length > 0 ? (
            idGamesAdmin.Genres.map((categoryObj) => categoryObj.genre).join(', ')
          ) : (
            'There are no genre to display.'
          )}<br /><br />

          LANGUAGES: <br/>
          {Array.isArray(idGamesAdmin.Languages) && idGamesAdmin.Languages.length > 0 ? (
            idGamesAdmin.Languages.map((categoryObj) => categoryObj.language).join(', ')
          ) : (
            'There are no language to display.'
          )}<br /><br />

          PLATFORMS: <br/>
          {Array.isArray(idGamesAdmin.Platforms) && idGamesAdmin.Platforms.length > 0 ? (
            idGamesAdmin.Platforms.map((categoryObj) => categoryObj.platform).join(', ')
          ) : (
            'There are no platform to display.'
          )}<br /><br />

          DISCOUNTED: <br />
          {idGamesAdmin.discounted ? "true" : "false"}<br /><br />

          DISCOUNT PERCENT: <br />
          {`${idGamesAdmin.discount_percent}%`}<br /><br />

          USER STATUS: <br />
          {idGamesAdmin.ban ? "Banned" : "Active"}<br /><br />

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowGameInfo(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      </div>
    
  );
};