import { useState } from "react"
import type { Product } from "../../models/Product"
import AdminHome from "./AdminHome";

function AddProduct() {
    const [newProduct, setNewProduct] = useState<Product>({
        "name": "",
        "price": 0,
        "description": "",
        "category": ""
    });

    function addProduct() {
        fetch("http://localhost:8080/products", {
        method: "POST",
        body: JSON.stringify(newProduct),
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
        <label>Name</label>
        <input
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            type="text"
        />{" "}
        <br />
        <label>Description</label>
        <input
            onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
            }
            type="text"
        />
        <br />
        <label>Category</label>
        <input
            onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
            }
            type="text"
        />
        <br />
        <label>Price</label>
        <input
            onChange={(e) =>
            setNewProduct({ ...newProduct, price: Number(e.target.value) })
            }
            type="text"
        />
        <br />
        <button onClick={addProduct}>Lisa</button>
    </div>
  )
}

export default AddProduct