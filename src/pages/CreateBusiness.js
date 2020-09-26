import React, { useState } from "react";
import { MdCameraAlt } from "react-icons/md";
import TomTomMap, { useMapJustMounted } from "../components/TomTomMap";
import { geolocated } from "react-geolocated";
import { useQuery } from "react-query";
import { fetchCategories } from "../api/categories";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";

function PlaceMap({ lat, lng }) {
  const [, setRef] = useMapJustMounted(ref => {
    if (lat && lng) {
      const position = { lat: parseFloat(lat), lon: parseFloat(lng) };
      ref.addMarker(position, {
        title: "Ubicación de negocio",
        content: "",
        draggable: true
      });
    }
  });
  return <TomTomMap ref={setRef} />;
}

const CreateBusiness = ({ coords, isGeolocationEnabled, isGeolocationAvailable }) => {

  const { isLoading, error, data: categories } = useQuery(
    "categories",
    fetchCategories,
    {
      retry: false
    }
  );

  const [images, setImages] = useState([]);
  const [name, setName] = useState();
  const [category_id, setCategoryId] = useState();
  const [information, setInformation] = useState();

  console.log("CreateBusiness -> images", images);
  
  function onSelectImage(e) {
    const files = e.target.files;
    const urls = [];
    for (let i = 0; i < files.length; i++) {
      urls.push(URL.createObjectURL(files[i]));
    }
    setImages(urls);
  }

  function onChangeName(e) {
    setName(e.target.value);
  }

  function onChangeCategory(e) {
    setCategoryId(e.target.value);
  }

  function onChangeDescription(e) {
    setInformation(e.target.value);
  }

  function CreateBusinessPost() {
    const data = {
      name: name,
      category_id: category_id,
      information: information,
      latitude: "",
      longitude: "",
      cm_certification: false,
      ratings: 0,
      active: true
    }
    return fetch('https://warm-savannah-90617.herokuapp.com/businesses', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.status >= 200 && response.status < 300) {
            console.log(response);
            //window.location.reload();
            return response;
          } else {
           console.log('Somthing happened wrong');
          }
    }).catch(err => err);
    }

  if (error) {
    return <ErrorMessage title="No se pudo cargar las categorías" />;
  }

  if (isLoading) {
    return <Loading title="Cargando categorías..." />;
  }

  return (
    <div className="container">
      <h1>Agregar lugar</h1>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="name">Nombre</label>
        <input type="text" name="name" id="name" autoComplete="off" onChange={onChangeName} />

        <label htmlFor="categories">Categoría:</label>
        <select name="category_id" id="categories" onChange={onChangeCategory}>
          <option value="0">Elige una categoria</option>
          {categories.map(category => <option key={category.id} value={category.id}>{category.title}</option>)}
        </select>
        <label htmlFor="description">Descripción</label>
        <textarea name="description" id="description" cols="30" rows="10" onChange={onChangeDescription} />
        <label htmlFor="location">Ubicación</label>

        {/*  */}
        {
          isGeolocationAvailable === false ? (<div>Tu navegador no soporta Geolocation</div>)
            : isGeolocationEnabled === false ? (<div>Geolocation no esta activada</div>)
            : coords !== null ? (<PlaceMap lat={coords.latitude} lng={coords.longitude} />)
            : (<div>Obteniendo la informacion de locación&hellip; </div>)
        }
        <br/>
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
        <button onClick={CreateBusinessPost}>Aceptar</button>
      </form>
    </div>
  );
};

export default geolocated({
  positionOptions: {
      enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(CreateBusiness);
//export default CreateBusiness;
