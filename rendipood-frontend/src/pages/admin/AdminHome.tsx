import { Link } from "react-router-dom";

function AdminHome() {
  return (
    <div>
      <h1>Film Rental Management</h1>
      <p>Manage your film inventory</p>

      <div>
        <Link to="/admin/add-film">
          <button>Add Film</button>
        </Link>

        <Link to="/admin/manage-films">
          <button>Manage Films</button>
        </Link>
      </div>
    </div>
  );
}

export default AdminHome;
