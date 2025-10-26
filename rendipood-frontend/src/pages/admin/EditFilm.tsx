import { FormEvent, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import type { Film } from "../../models/Film";

function EditFilm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [rented, setRented] = useState(false);

  useEffect(() => {
    if (id) {
      fetch("http://localhost:8080/films/" + id)
        .then((res) => res.json())
        .then((data: Film) => {
          setTitle(data.title);
          setType(data.type);
          setRented(data.rented);
        })
        .catch((err) => {
          console.error("Error fetching film:", err);
          alert("Failed to load film");
        });
    }
  }, [id]);

  function submit(event: FormEvent) {
    event.preventDefault();

    const film = {
      id: Number(id),
      title: title,
      type: type,
      rented: rented,
    };

    fetch("http://localhost:8080/films", {
      method: "PUT",
      body: JSON.stringify(film),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("Film updated successfully!");
          navigate("/admin/manage-films");
        } else {
          alert("Failed to update film");
        }
      })
      .catch((err) => {
        console.error("Error updating film:", err);
        alert("Failed to update film");
      });
  }

  return (
    <div>
      <Link to="/admin/manage-films">
        <button>Back to Manage Films</button>
      </Link>
      <h2>Edit Film</h2>

      <form onSubmit={submit}>
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          required
        />
        <br />
        <label>Type</label>
        <input
          value={type}
          onChange={(e) => setType(e.target.value)}
          type="text"
          required
        />
        <br />
        <label>
          <input
            type="checkbox"
            checked={rented}
            onChange={(e) => setRented(e.target.checked)}
          />
          Currently Rented
        </label>
        <br />
        <button type="submit">
          Update Film
        </button>
      </form>
    </div>
  );
}

export default EditFilm;
