import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Film } from "../../models/Film";

function ManageFilms() {
  const [films, setFilms] = useState<Film[]>([]);
  const [filter, setFilter] = useState<"all" | "available" | "rented">("all");

  useEffect(() => {
    fetchFilms();
  }, []);

  function fetchFilms() {
    fetch("http://localhost:8080/films")
      .then((res) => res.json())
      .then((data) => setFilms(data))
      .catch((err) => console.error("Error fetching films:", err));
  }

  function deleteFilm(id: number | undefined) {
    if (id === undefined) return;

    if (window.confirm("Are you sure you want to delete this film?")) {
      fetch("http://localhost:8080/films?id=" + id, { method: "DELETE" })
        .then(() => {
          setFilms(films.filter((film) => film.id !== id));
          alert("Film deleted successfully");
        })
        .catch((err) => {
          console.error("Error deleting film:", err);
          alert("Failed to delete film");
        });
    }
  }

  const filteredFilms = films.filter((film) => {
    if (filter === "available") return !film.rented;
    if (filter === "rented") return film.rented;
    return true;
  });

  return (
    <div>
      <Link to="/admin">
        <button>Back to Admin</button>
      </Link>
      <h2>Manage Films</h2>

      <div>
        <button onClick={() => setFilter("all")}>
          All Films ({films.length})
        </button>
        <button onClick={() => setFilter("available")}>
          Available ({films.filter((f) => !f.rented).length})
        </button>
        <button onClick={() => setFilter("rented")}>
          Rented ({films.filter((f) => f.rented).length})
        </button>
      </div>

      <div>
        {filteredFilms.length === 0 ? (
          <p>No films found</p>
        ) : (
          filteredFilms.map((film) => (
            <div key={film.id}>
              <h3>{film.title}</h3>
              <p>Type: {film.type}</p>
              <span>{film.rented ? "Rented" : "Available"}</span>
              <br />
              <Link to={"/admin/edit-film/" + film.id}>
                <button>Edit</button>
              </Link>
              <button onClick={() => deleteFilm(film.id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ManageFilms;
