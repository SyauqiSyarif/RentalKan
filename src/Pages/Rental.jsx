import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Rental.css";

function Rental() {
  const { state } = useLocation();
  const product = state?.product;

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const days =
    startDate && endDate && endDate >= startDate
      ? Math.round((new Date(endDate) - new Date(startDate)) / 86400000) + 1
      : 0;

  const total = product ? product.price * days : 0;

  function handleSubmit(e) {
    e.preventDefault();

    const rentals = JSON.parse(
      localStorage.getItem("rentspaceRentals") || "[]"
    );

    rentals.push({
      id: Date.now(),
      name,
      productName: product.name,
      category: product.category,
      icon: product.icon,
      price: product.price,
      startDate,
      endDate,
      days,
      total,
    });

    localStorage.setItem("rentspaceRentals", JSON.stringify(rentals));
    setConfirmed(true);
  }

  if (!product) {
    return (
      <div className="rental-page">
        <h2>Belum ada produk dipilih.</h2>
        <Link to="/product" className="rental-button">
          Pilih Produk
        </Link>
      </div>
    );
  }

  return (
    <div className="rental-page">
      <div className="rental-heading">
        <span className="eyebrow">RENTAL FORM</span>
        <h1>Rent Your Product</h1>
      </div>

      <div className="rental-card">
        <h3>{product.icon} {product.name}</h3>
        <p>Rp {product.price.toLocaleString("id-ID")} / hari</p>

        <form onSubmit={handleSubmit}>
          <label>Nama Penyewa</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Tanggal Mulai</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />

          <label>Tanggal Selesai</label>
          <input
            type="date"
            min={startDate}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />

          <div className="rental-total">
            <span>Durasi: {days} hari</span>
            <strong>Rp {total.toLocaleString("id-ID")}</strong>
          </div>

          <button type="submit" disabled={!days || confirmed}>
            Konfirmasi Penyewaan
          </button>
        </form>

        {confirmed && (
          <p className="rental-success">
            Penyewaan berhasil! <Link to="/my-rentals">Lihat di Bookings</Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default Rental;
