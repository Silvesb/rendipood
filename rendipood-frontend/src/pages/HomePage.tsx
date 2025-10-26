import { useEffect, useState } from "react";
import type { Film } from "../models/Film";

function HomePage() {
  const [films, setFilms] = useState<Film[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/available-films")
      .then((res) => res.json())
      .then((data) => {
        setFilms(data);
      })
      .catch((err) => {
        console.error("Error fetching films:", err);
      });
  }, []);

  function handleRent(id: number | undefined) {
    if (!id) return;

    fetch(`http://localhost:8080/films/${id}/rent`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then(() => {
        setFilms(films.filter((film) => film.id !== id));
      })
      .catch((err) => {
        console.error("Error renting film:", err);
        alert("Failed to rent film. Please try again.");
      });
  }

  return (
    <div>
      <h1>Available Films for Rent</h1>

      <div>
        {films.length === 0 ? (
          <p>No films available at the moment</p>
        ) : (
          films.map((film) => (
            <div key={film.id}>
              <h3>{film.title}</h3>
              <p>Genre: {film.type}</p>
              <span>Available</span>
              <br />
              <button onClick={() => handleRent(film.id)}>
                Rent
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomePage;