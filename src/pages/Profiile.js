import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchCurrentUser } from "../api/users";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "@reach/router";

const Profile = () => {
  const { error, isLoading, data } = useQuery("currentUser", fetchCurrentUser, {
    onSuccess(data) {}
  });

  useEffect(() => {
    const id = setTimeout(() => {
      if (data) {
        setProgress(66);
      }
    }, 100);
    return () => {
      clearTimeout(id);
    };
  }, [data]);

  const [progress, setProgress] = useState(0);
  if (error) {
    return <ErrorMessage title="error al cargar usuario" />;
  }

  if (isLoading) {
    return <Loading title="Cargando usuario..." />;
  }

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <h1>¡Hola, {data.first_name}!</h1>
        <img
          src={data.photo}
          alt={data.first_name}
          style={{
            width: 128,
            height: 128,
            border: "4px solid var(--highlight-color)",
            borderRadius: "50%"
          }}
        />
      </div>
      <h2>Nivel {data.level}</h2>
      <div style={{ height: 200, width: 200, margin: "0 auto" }}>
        <CircularProgressbar
          value={progress}
          text={`${progress}%`}
          styles={buildStyles({
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: "round",
            textSize: "16px",
            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 3,
            // Colors
            pathColor: `#6246ea`,
            textColor: "#2b2c34",
            trailColor: "#d1d1e9"
          })}
        />
      </div>
      <h3>Con tu nivel puedes:</h3>
      <ul className="level-list">
        <li>
          <span>Agregar nuevos lugares</span>
        </li>
        <li>
          <span>Actualizar información de lugares.</span>
        </li>
      </ul>
      <div className="flex-center-horizontally">
        <Link className="button button-outline" to="/favorites">
          Ver favoritos
        </Link>
      </div>
    </div>
  );
};

export default Profile;
