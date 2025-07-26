import axios from "axios";
import { useState } from "react";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    billingAddress: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Optional simple validation
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.cardNumber) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/bookings", formData);
      setSuccess("Booking confirmed!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        cardNumber: "",
        expirationDate: "",
        cvv: "",
        billingAddress: "",
      });
    } catch (err) {
      console.error("Booking API error:", err);
      setError("Failed to submit booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🧾 Confirm Your Booking</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["firstName", "lastName", "email", "phoneNumber", "cardNumber", "expirationDate", "cvv", "billingAddress"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field}
            value={(formData as any)[field]}
            onChange={handleChange}
            required
            className="border p-2 w-full rounded"
          />
        ))}

        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {loading ? "Processing..." : "Confirm & Pay"}
        </button>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
      </form>
    </main>
  );
}
