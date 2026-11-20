
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Rental.css";

function MyRentals() {
  const [rentals, setRentals] = useState(() => {
    try {
      const data = JSON.parse(
        localStorage.getItem("rentspaceRentals") || "[]"
      );

      return data
        .filter((item) => item.status !== "Dibatalkan")
        .map((item) => ({
          ...item,
          status:
            item.status === "Lunas" ||
            item.status === "Menunggu Konfirmasi Pembayaran"
              ? "Lunas"
              : item.status || "Menunggu Pembayaran",
        }));
    } catch {
      return [];
    }
  });

  const [activePayment, setActivePayment] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Mandiri");
  const [activeAction, setActiveAction] = useState(null);
  const [copiedPayment, setCopiedPayment] = useState("");

  async function copyPaymentNumber(number, type) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(number);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = number;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";

        document.body.appendChild(textArea);
        textArea.select();

        const success = document.execCommand("copy");
        document.body.removeChild(textArea);

        if (!success) {
          throw new Error("Gagal menyalin nomor");
        }
      }

      setCopiedPayment(type);
    } catch {
      setCopiedPayment(`error-${type}`);
    }
  }

  function saveRentals(updated) {
    setRentals(updated);
    localStorage.setItem(
      "rentspaceRentals",
      JSON.stringify(updated)
    );
  }

  function confirmAction() {
    if (!activeAction) return;

    const updated = rentals.filter(
      (item) => item.id !== activeAction.id
    );

    saveRentals(updated);
    setActiveAction(null);
  }

  function confirmPayment() {
    const updated = rentals.map((item) =>
      item.id === activePayment
        ? {
            ...item,
            status: "Lunas",
            paymentMethod:
              paymentMethod === "Mandiri"
                ? "Transfer Bank Mandiri"
                : "E-Wallet",
          }
        : item
    );

    saveRentals(updated);
    setActivePayment(null);
  }

  const selectedRental = rentals.find(
    (item) => item.id === activePayment
  );

  return (
    <div className="rental-page">
      <div className="rental-heading">
        <h1>RIWAYAT PENYEWAAN</h1>
        <p>Daftar perangkat yang pernah kamu sewa.</p>
      </div>

      {rentals.length === 0 ? (
        <div className="rental-card empty-rental">
          <p>Belum ada riwayat penyewaan.</p>
          <Link to="/product" className="rental-button">
            Lihat Produk
          </Link>
        </div>
      ) : (
        rentals.map((item) => (
          <div className="rental-card" key={item.id}>
            <div className="booking-top">
              <h3>{item.icon} {item.productName}</h3>

              <span
                className={
                  item.status === "Lunas"
                    ? "status-badge status-paid"
                    : "status-badge status-pending"
                }
              >
                {item.status}
              </span>
            </div>

            <p>{item.category}</p>
            <p>Nama Penyewa: {item.name}</p>
            <p>
              Tanggal: {item.startDate} sampai {item.endDate}
            </p>

            <div className="rental-total">
              <span>{item.days} hari</span>
              <strong>
                Rp {item.total.toLocaleString("id-ID")}
              </strong>
            </div>

            {item.paymentMethod && (
              <p>Metode: {item.paymentMethod}</p>
            )}

            {item.status === "Menunggu Pembayaran" && (
              <div className="rental-actions">
                <button
                  onClick={() => {
                    setActivePayment(item.id);
                    setPaymentMethod("Mandiri");
                    setCopiedPayment("");
                  }}
                >
                  Bayar Pesanan
                </button>

                <button
                  className="cancel-button"
                  onClick={() =>
                    setActiveAction({
                      id: item.id,
                      type: "cancel",
                    })
                  }
                >
                  Batalkan Pesanan
                </button>
              </div>
            )}

            {item.status === "Lunas" && (
              <button
                className="delete-button"
                onClick={() =>
                  setActiveAction({
                    id: item.id,
                    type: "delete",
                  })
                }
              >
                Hapus dari Riwayat
              </button>
            )}
          </div>
        ))
      )}

      {selectedRental && (
        <div
          className="payment-overlay"
          onClick={() => setActivePayment(null)}
        >
          <div
            className="payment-modal"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="payment-close"
              onClick={() => setActivePayment(null)}
              aria-label="Tutup"
            >
              ×
            </button>

            <span className="eyebrow">PEMBAYARAN</span>
            <h2>Instruksi Pembayaran</h2>
            <p>{selectedRental.productName}</p>

            <div className="payment-amount">
              Rp {selectedRental.total.toLocaleString("id-ID")}
            </div>

            <label>Metode Pembayaran</label>

            <select
              value={paymentMethod}
              onChange={(e) => {
                setPaymentMethod(e.target.value);
                setCopiedPayment("");
              }}
            >
              <option value="Mandiri">Transfer Bank Mandiri</option>
              <option value="E-Wallet">E-Wallet</option>
            </select>

            <div className="payment-destination">
              {paymentMethod === "Mandiri" ? (
                <>
                  <span>Bank Mandiri</span>

                  <div className="payment-copy-row">
                    <strong>1234567890123</strong>

                    <button
                      type="button"
                      className="payment-copy-button"
                      onClick={() =>
                        copyPaymentNumber(
                          "1234567890123",
                          "mandiri"
                        )
                      }
                    >
                      {copiedPayment === "mandiri"
                        ? "Tersalin ✓"
                        : "Salin"}
                    </button>
                  </div>

                  {copiedPayment === "error-mandiri" && (
                    <small className="payment-copy-error">
                      Gagal menyalin. Silakan salin nomor secara manual.
                    </small>
                  )}

                  <p>Nama Penerima: RENTALKAN</p>
                </>
              ) : (
                <>
                  <span>Nomor E-Wallet</span>

                  <div className="payment-copy-row">
                    <strong>0812334456</strong>

                    <button
                      type="button"
                      className="payment-copy-button"
                      onClick={() =>
                        copyPaymentNumber(
                          "0812334456",
                          "ewallet"
                        )
                      }
                    >
                      {copiedPayment === "ewallet"
                        ? "Tersalin ✓"
                        : "Salin"}
                    </button>
                  </div>

                  {copiedPayment === "error-ewallet" && (
                    <small className="payment-copy-error">
                      Gagal menyalin. Silakan salin nomor secara manual.
                    </small>
                  )}

                  <p>Nama Penerima: RENTALKAN</p>
                </>
              )}
            </div>

            <button
              className="payment-confirm"
              onClick={confirmPayment}
            >
              Konfirmasi Pembayaran
            </button>
          </div>
        </div>
      )}

      {activeAction && (
        <div
          className="payment-overlay"
          onClick={() => setActiveAction(null)}
        >
          <div
            className="payment-modal action-modal"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="payment-close"
              onClick={() => setActiveAction(null)}
              aria-label="Tutup"
            >
              ×
            </button>

            <h2>
              {activeAction.type === "cancel"
                ? "Batalkan Pesanan?"
                : "Hapus Riwayat Pesanan?"}
            </h2>

            <p>
              {activeAction.type === "cancel"
                ? "Pesanan akan dibatalkan dan dihapus dari riwayat."
                : "Pesanan ini akan dihapus dari riwayat penyewaan."}
            </p>

            <button
              className="action-danger"
              onClick={confirmAction}
            >
              {activeAction.type === "cancel"
                ? "Ya, Batalkan Pesanan"
                : "Ya, Hapus Pesanan"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyRentals;
