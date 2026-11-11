
import { Link } from "react-router-dom";
import "./Rental.css";

function MyRentals() {
  const rentals = JSON.parse(
    localStorage.getItem("rentspaceRentals") || "[]"
  );

  return (
    <div className="rental-page">
      <div className="rental-heading">
        <h1 style={{ color: "#399b76" }}>
          RIWAYAT PENYEWAAN
        </h1>

        <p>Daftar perangkat yang pernah kamu sewa.</p>
      </div>

      {rentals.length === 0 ? (
        <div className="rental-card">
          <p>Belum ada riwayat penyewaan.</p>

          <Link to="/product" className="rental-button">
            Lihat Produk
          </Link>
        </div>
      ) : (
        rentals.map((item) => (
          <div className="rental-card" key={item.id}>
            <h3>{item.icon} {item.productName}</h3>
            <p>{item.category}</p>
            <p>Nama: {item.name}</p>
            <p>
              Tanggal: {item.startDate} sampai {item.endDate}
            </p>

            <div className="rental-total">
              <span>{item.days} hari</span>
              <strong>
                Rp {item.total.toLocaleString("id-ID")}
              </strong>
            </div>

            <p className="rental-success">
              Status: Dikonfirmasi
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyRentals;
