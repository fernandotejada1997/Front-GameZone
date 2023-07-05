// import React, { useState } from 'react';
// import axios from 'axios';
// import style from "./ProfileView.module.css";

// const ShoppingView = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const datosUser =  JSON.parse(localStorage.getItem("user"));

//   const handleImageChange = (event) => {
//     setSelectedImage(event.target.files[0]);
//   };
//   console.log(selectedImage?.name);

//   const deleteImage = () =>{
//     setSelectedImage(null)
//   }

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append('file', selectedImage);
//       console.log(selectedImage);

//       const response = await axios.post('https://back-gamezone-production.up.railway.app/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           datosUser: JSON.stringify(datosUser.id),
//         },
//       });

//       if (response.status === 200) {
//         console.log(response.data); // URL de la imagen en Cloudinary
//       } else {
//         console.log(response.data); // Mensaje de error
//       }
//     } catch (error) {
//       console.log(error.message);
//     }

//     setSelectedImage(null);
//   };

//   return (
//     <form onSubmit={handleSubmit} >
//       <div>
//         <input id="file-upload" type="file" accept="image/*" name="file" multiple={true} onChange={handleImageChange} className={style.fileInput}/>
//       </div>
//       <br/>
//       { selectedImage && <label className={style.label}>{selectedImage?.name}</label> }
//       { selectedImage && <button className={style.imagebuton} onClick={() => deleteImage()}> Cancel </button>}
//       <div>
//         <button type="submit" className={style.imagebuton} >Subir imagen</button>
//       </div>
//     </form>
//   );
// };

// export default ShoppingView;

import React, { useState } from 'react';
import axios from 'axios';
import style from "./ProfileView.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const ShoppingView = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const datosUser =  JSON.parse(localStorage.getItem("user"));

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const deleteImage = () => {
    setSelectedImage(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('file', selectedImage);

      const response = await axios.post('https://back-gamezone-production.up.railway.app/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          datosUser: JSON.stringify(datosUser.id),
        },
      });

      if (response.status === 200) {
        const imageCloud = response.data
        const updatedUserData = { ...datosUser, profileImage: imageCloud };
        localStorage.setItem("user", JSON.stringify(updatedUserData)); 
        console.log(imageCloud); // URL de la imagen en Cloudinary
      } else {
        console.log(response.data); // Mensaje de error
      }
    } catch (error) {
      console.log(error.message);
    }

    setSelectedImage(null);
  };



  return (
    <form onSubmit={handleSubmit}>
      {selectedImage ? (
        <div>
          <img src={URL.createObjectURL(selectedImage)} alt="Selected" className={style.imageRender}/>
          <div>
            <button className={style.cyberpunk} onClick={deleteImage}>
              Cancel
            </button>
            <button type="submit" className={style.cyberpunk}>
              Save Image
            </button>
          </div>
        </div>
      ) : (
        <label htmlFor="file-upload" className={style.label}>
            <input
            id="file-upload"
            type="file"
            accept="image/*"
            name="file"
            onChange={handleImageChange}
            className={style.fileInput}
          />
          <FontAwesomeIcon icon={faImage} size="xl" className={style.div} />

        </label>
      )}
    </form>
  );
}

export default ShoppingView;