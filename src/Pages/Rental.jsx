
import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Rental.css";

function Rental() {
  const { state } = useLocation();
  const product = state?.product;

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const today = (() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  })();

  const days =
    startDate && endDate && endDate >= startDate
      ? Math.round(
          (new Date(endDate) - new Date(startDate)) / 86400000
        ) + 1
      : 0;

  const total = product ? product.price * days : 0;

  function openCalendar(ref) {
    const input = ref.current;

    if (!input) return;

    try {
      if (input.showPicker) {
        input.showPicker();
      } else {
        input.click();
      }
    } catch {
      input.focus();
    }
  }

  function formatDate(value) {
    if (!value) return "";

    return new Date(`${value}T00:00:00`).toLocaleDateString(
      "id-ID",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    let rentals = [];

    try {
      rentals = JSON.parse(
        localStorage.getItem("rentspaceRentals") || "[]"
      );
    } catch {
      rentals = [];
    }

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
      status: "Menunggu Pembayaran",
      paymentMethod: "",
    });

    localStorage.setItem(
      "rentspaceRentals",
      JSON.stringify(rentals)
    );

    setShowSuccess(true);
  }

  if (!product) {
    return (
      <div className="rental-page">
        <div className="rental-card empty-rental">
          <h2>Belum Ada Produk Dipilih</h2>
          <p>Silakan pilih produk yang ingin kamu sewa.</p>
          <Link to="/product" className="rental-button">
            Lihat Produk
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rental-page">
      <div className="rental-heading">
        <span className="eyebrow">FORMULIR PENYEWAAN</span>
        <h1>DATA PENYEWAAN</h1>
        <p>Lengkapi data berikut untuk melanjutkan pesanan.</p>
      </div>

      <div className="rental-card rental-form-card">
        <div className="rental-product-summary">
          <span>{product.icon}</span>
          <div>
            <h3>{product.name}</h3>
            <p>{product.category}</p>
            <strong>
              Rp {product.price.toLocaleString("id-ID")} / hari
            </strong>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Nama Penyewa</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama lengkap"
            required
          />

          <div className="date-grid">
            <div>
              <label>Tanggal Mulai</label>

              <div className="date-input-wrapper">
                <input
                  type="text"
                  className="date-display-input"
                  value={formatDate(startDate)}
                  placeholder="Pilih tanggal"
                  readOnly
                  onClick={() => openCalendar(startDateRef)}
                />

                <span className="date-calendar-icon">
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M16 3v4M8 3v4M3 10h18" />
                  </svg>
                </span>

                <input
                  ref={startDateRef}
                  className="native-date-picker"
                  type="date"
                  value={startDate}
                  min={today}
                  tabIndex={-1}
                  onChange={(e) => {
                    setStartDate(e.target.value);

                    if (endDate && e.target.value > endDate) {
                      setEndDate("");
                    }
                  }}
                />
              </div>
            </div>

            <div>
              <label>Tanggal Selesai</label>

              <div className="date-input-wrapper">
                <input
                  type="text"
                  className="date-display-input"
                  value={formatDate(endDate)}
                  placeholder="Pilih tanggal"
                  readOnly
                  onClick={() => openCalendar(endDateRef)}
                />

                <span className="date-calendar-icon">
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M16 3v4M8 3v4M3 10h18" />
                  </svg>
                </span>

                <input
                  ref={endDateRef}
                  className="native-date-picker"
                  type="date"
                  value={endDate}
                  min={startDate || today}
                  tabIndex={-1}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="rental-total rental-summary">
            <span>Durasi: {days} hari</span>
            <strong>
              Rp {total.toLocaleString("id-ID")}
            </strong>
          </div>

          <button type="submit" disabled={!days || showSuccess}>
            Konfirmasi Penyewaan
          </button>
        </form>
      </div>

      {showSuccess && (
        <div className="payment-overlay">
          <div className="payment-modal success-modal">
            <button
              className="payment-close"
              onClick={() => setShowSuccess(false)}
              aria-label="Tutup"
            >
              ×
            </button>

            <div className="success-icon">✓</div>
            <h2>Pesanan Berhasil Dibuat!</h2>

            <p>
              Pesanan {product.name} sudah masuk ke
              riwayat penyewaan.
            </p>

            <Link to="/my-rentals" className="success-link">
              LIHAT PESANAN
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Rental;
