import { useEffect, useState } from "react";
import type { Film } from "../models/Film";

function RentedFilms() {
  const [films, setFilms] = useState<Film[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/rented-films")
      .then((res) => res.json())
      .then((data) => {
        setFilms(data);
      })
      .catch((err) => {
        console.error("Error fetching rented films:", err);
      });
  }, []);

  function handleUnrent(id: number | undefined) {
    if (!id) return;

    fetch(`http://localhost:8080/films/${id}/unrent`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then(() => {
        setFilms(films.filter((film) => film.id !== id));
      })
      .catch((err) => {
        console.error("Error returning film:", err);
        alert("Failed to return film. Please try again.");
      });
  }

  return (
    <div>
      <h1>Rented Films</h1>

      <div>
        {films.length === 0 ? (
          <p>No films are currently rented</p>
        ) : (
          films.map((film) => (
            <div key={film.id}>
              <h3>{film.title}</h3>
              <p>Genre: {film.type}</p>
              <span>Rented</span>
              <br />
              <button onClick={() => handleUnrent(film.id)}>
                Return
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RentedFilms;
