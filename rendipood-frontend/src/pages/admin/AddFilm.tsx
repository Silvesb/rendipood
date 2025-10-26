import { useState } from "react";
import type { Film } from "../../models/Film";
import AdminHome from "./AdminHome";

function AddFilm() {
    const [newFilm, setNewFilm] = useState<Film>({
      "title": "",
      "type": "",
      "rented": false,
    });

    function addFilm() {
        fetch("http://localhost:8080/films", {
        method: "POST",
        body: JSON.stringify(newFilm),
        headers: {
            "Content-Type": "application/json",
        },
        })
        .then((res) => res.json())
        .then(() => alert("Toode edukalt lisatud"));
    }

  return (
    <div>
        <AdminHome />
        <label>Title</label>
        <input
            onChange={(e) =>
            setNewFilm({ ...newFilm, title: e.target.value })
            }
            type="text"
        />
        <br />
        <label>Category</label>
        <input
            onChange={(e) =>
            setNewFilm({ ...newFilm, type: e.target.value })
            }
            type="text"
        />
        <br />
        <button onClick={addFilm}>Lisa</button>
    </div>
  )
}

export default AddFilm;
