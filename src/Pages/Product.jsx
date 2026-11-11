
import { Link } from "react-router-dom";
import "./Product.css";

const products = [
  { id: 1, name: "MacBook", category: "Laptop", price: 85000, icon: "💻" },
  { id: 2, name: "Fujifilm X-T200", category: "Camera", price: 150000, icon: "📷" },
  { id: 3, name: "Proyektor", category: "Proyektor", price: 100000, icon: "📽️" },
  { id: 4, name: "Ipad", category: "Ipad", price: 90000, icon: "📱" },
];

function Product() {
  return (
    <div className="product-page">
      <div className="product-heading">
        <span className="eyebrow">OUR COLLECTION</span>
        <p>Pilih perangkat elektronik yang ingin kamu sewa.</p>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-icon">{product.icon}</div>
            <span>{product.category}</span>
            <h3>{product.name}</h3>
            <p>Rp {product.price.toLocaleString("id-ID")} / hari</p>

            <Link to="/rental" state={{ product }}>
              Sewa Sekarang
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
