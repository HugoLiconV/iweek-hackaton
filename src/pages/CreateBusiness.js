import React, { useState } from "react";
import { MdCameraAlt } from "react-icons/md";

const CreateBusiness = () => {
  const [images, setImages] = useState([]);
  console.log("CreateBusiness -> images", images);

  function onSelectImage(e) {
    const files = e.target.files;
    const urls = [];
    for (let i = 0; i < files.length; i++) {
      urls.push(URL.createObjectURL(files[i]));
    }
    setImages(urls);
  }

  return (
    <div className="container">
      <h1>Agregar lugar</h1>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="name">Nombre</label>
        <input type="text" name="name" id="name" autoComplete="off" />

        <label htmlFor="categories">Categoría:</label>
        <select name="categories" id="categories">
          <option value="food">Comida</option>
          <option value="drinks">Bebidas</option>
          <option value="services">Servicios</option>
        </select>
        <label htmlFor="description">Descripción</label>
        <textarea name="description" id="description" cols="30" rows="10" />
        <div>Mapa</div>

        {/*  */}

        {/* <div style={{ display: "flex" }}>
          {images.map(image => (
            <img
              width={100}
              key={image}
              height={100}
              src={image}
              alt="upload preview"
            />
          ))}
        </div> */}
        <div className="file-input-container">
          <label for="upload-image" className="file-input-label">
            <span>Subir fotos</span>
            <MdCameraAlt size={32} className="icon" />
          </label>
          <input
            style={{ display: "none" }}
            type="file"
            name="upload-image"
            id="upload-image"
            multiple
            onChange={onSelectImage}
          />
          {images.length > 0 ? (
            <ul className="hs">
              {images.map(image => (
                <li
                  className="item"
                  key={image}
                  style={{ backgroundColor: "#FFF", padding: 0 }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                    src={image}
                    alt="upload preview"
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <button type="submit">Aceptar</button>
      </form>
    </div>
  );
};

export default CreateBusiness;
