import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <img
          src="/Laptop.png"
          alt="Laptop RentSpace"
          className="hero-background"
        />

        <div className="hero-overlay"></div>

        <div className="hero-content">
          <span className="eyebrow">
            RENTALKAN ELECTRONIC
          </span>

          <h1>
            Butuh Perangkat?
            <br />
            <span>Sewakan di RentalKan</span>
          </h1>

          <p>
            Sewa berbagai perangkat elektronik untuk kebutuhan
            kuliah, pekerjaan, maupun acara dengan mudah,
            cepat, dan praktis.
          </p>

          <Link to="/product" className="primary-button">
            Lihat Produk →
          </Link>
        </div>
      </section>

      <section className="how-section">
        <span className="eyebrow">EASY RENTAL PROCESS</span>
        <h2>How It Works</h2>

        <div className="steps-grid">
          <div className="step-card">
            <span>01</span>
            <h3>Choose Product</h3>
            <p>Pilih perangkat elektronik yang kamu butuhkan.</p>
          </div>

          <div className="step-card">
            <span>02</span>
            <h3>Set Your Dates</h3>
            <p>Tentukan tanggal mulai dan selesai penyewaan.</p>
          </div>

          <div className="step-card">
            <span>03</span>
            <h3>Confirm Booking</h3>
            <p>Konfirmasi pemesanan dan nikmati layanan kami.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
