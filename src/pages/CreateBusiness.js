import React, { useState } from "react";
import { MdCameraAlt } from "react-icons/md";
import TomTomMap, { useMapJustMounted } from "../components/TomTomMap";
import { geolocated } from "react-geolocated";
import { useMutation, useQuery } from "react-query";
import { fetchCategories } from "../api/categories";
import { postBusiness } from "../api/business";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import { useToasts } from "react-toast-notifications";

function Map({
  isGeolocationAvailable,
  isGeolocationEnabled,
  coords,
  onDragMarker
}) {
  const [marker, setMarker] = useState();
  const [, setRef] = useMapJustMounted(ref => {
    const { latitude, longitude } = coords;
    const position = { lat: latitude, lon: longitude };
    if (!marker) {
      const _marker = ref
        .addMarker(position, {
          title: "Ubicación de negocio",
          content: "",
          draggable: true
        })
        .on("dragend", event => {
          const { lat, lng } = event.target._latlng;
          onDragMarker({ lat, lng });
        });
      setMarker(_marker);
    }
  });

  if (!isGeolocationAvailable) {
    return <span>Tu navegador no soporta Geolocation</span>;
  }
  if (!isGeolocationEnabled) {
    return <span>La geolocalización no esta activada</span>;
  }
  if (!coords) {
    return <span>Obteniendo la informacion de locación&hellip; </span>;
  }

  return <TomTomMap ref={setRef} />;
}

const CreateBusiness = ({
  coords,
  isGeolocationEnabled,
  isGeolocationAvailable
}) => {
  const { addToast } = useToasts();
  const { isLoading, error, data: categories } = useQuery(
    "categories",
    fetchCategories,
    {
      retry: false
    }
  );
  const [createBusiness, { isLoading: postLoading }] = useMutation(
    postBusiness,
    {
      onError() {
        addToast("Error al crear lugar. Vuelve a intentar", {
          appearance: "error",
          autoDismiss: true
        });
      },
      onSuccess() {
        addToast("El lugar se creó correctamente", {
          appearance: "success",
          autoDismiss: true
        });
        setLocation();
        setImages([]);
        setName();
        setCategoryId();
        setDescription();
      }
    }
  );

  const [location, setLocation] = useState();
  const [images, setImages] = useState([]);
  const [name, setName] = useState();
  const [categoryId, setCategoryId] = useState();
  const [description, setDescription] = useState();

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
    setDescription(e.target.value);
  }

  function onDragMarker({ lat, lng }) {
    setLocation({ lat, lng });
  }

  function onSubmit(e) {
    e.preventDefault();
    const data = {
      name: name,
      category_id: categoryId,
      information: description,
      latitude: location.lat,
      longitude: location.lng,
      cm_certification: false,
      ratings: 0,
      active: true
    };
    createBusiness(data);
  }

  if (error) {
    return <ErrorMessage title="No se pudo cargar las categorías" />;
  }

  if (isLoading || postLoading) {
    return <Loading title="Cargando..." />;
  }

  return (
    <div className="container">
      <h1>Agregar lugar</h1>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmit}
      >
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          name="name"
          required
          id="name"
          autoComplete="off"
          value={name}
          onChange={onChangeName}
        />

        <label htmlFor="categories">Categoría:</label>
        <select
          required
          name="category_id"
          id="categories"
          value={categoryId}
          onChange={onChangeCategory}
        >
          <option value="0">Elige una categoria</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
        <label htmlFor="description">Descripción</label>
        <textarea
          required
          name="description"
          id="description"
          cols="30"
          value={description}
          rows="10"
          onChange={onChangeDescription}
        />
        <label htmlFor="location">Ubicación</label>
        <Map
          coords={coords}
          onDragMarker={onDragMarker}
          isGeolocationEnabled={isGeolocationEnabled}
          isGeolocationAvailable={isGeolocationAvailable}
        />

        <br />
        <div className="file-input-container">
          <label htmlFor="upload-image" className="file-input-label">
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

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true
  },
  userDecisionTimeout: 5000
})(CreateBusiness);
