import { useEffect, useState } from "react";
import type { Product } from "../../models/Product";
import AdminHome from "./AdminHome";

function ManageProducts() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/admin-products")
        .then((res) => res.json())
        .then((json) => setProducts(json));
    }, []);

    function deleteProduct(productId: number) {
        fetch("http://localhost:8080/products?id=" + productId, {
        method: "DELETE",
        })
        .then((res) => res.json())
        .then((json) => setProducts(json));
    }
  return (
    <div>
        <AdminHome />
        {products.map((product) => (
            <div key={product.id}>
            <div>{product.name}</div>
            <div>{product.price}</div>
            
            <button onClick={() => deleteProduct(Number(product.id))}>X</button>
            </div>
        ))}
    </div>
  )
}

export default ManageProducts