import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RentedFilms from "./pages/RentedFilms";
import AdminHome from "./pages/admin/AdminHome";
import AddFilm from "./pages/admin/AddFilm";
import EditFilm from "./pages/admin/EditFilm";
import ManageFilms from "./pages/admin/ManageFilms";

function App() {
  return (
    <div>
      <nav>
        <div>
          <h2>Film Rental</h2>
        </div>
        <div>
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/rented">
            <button>Rented Films</button>
          </Link>
          <Link to="/admin">
            <button>Admin</button>
          </Link>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rented" element={<RentedFilms />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/add-film" element={<AddFilm />} />
          <Route path="/admin/edit-film/:id" element={<EditFilm />} />
          <Route path="/admin/manage-films" element={<ManageFilms />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
