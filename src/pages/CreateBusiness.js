import React, { useState } from "react";
import Map from "../components/Map";

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
      <h1>Create Business</h1>
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
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
        ></textarea>
        <div>mapa</div>
        <div style={{ display: "flex" }}>
          {images.map(image => (
            <img
              width={100}
              key={image}
              height={100}
              src={image}
              alt="upload preview"
            />
          ))}
        </div>
        <input
          type="file"
          name="upload-image"
          id="upload-image"
          multiple
          onChange={onSelectImage}
        />
        <button type="submit">Aceptar</button>
      </form>
    </div>
  );
};

export default CreateBusiness;
