import { useState } from "react";
import axios from "axios";
import "./App.css";

const BASE_URL = "https://evoting-backend-62hq.onrender.com";

function Register() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    registerNumber: "",
    voterId: "",
    aadhaar: "",
  });

  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // -------------------- HANDLE CHANGE --------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "voterId" ? value.toUpperCase() : value,
    });
  };

  // -------------------- VALIDATION --------------------
  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Valid email required";
    }

    if (!form.registerNumber.trim()) {
      newErrors.registerNumber = "Register number is required";
    }

    if (!/^[A-Z0-9]{6,}$/.test(form.voterId)) {
      newErrors.voterId = "Voter ID must be at least 6 characters";
    }

    if (!/^\d{12}$/.test(form.aadhaar)) {
      newErrors.aadhaar = "Aadhaar must be 12 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // -------------------- SUBMIT --------------------
  const submit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      setMsg("");

      const res = await axios.post(`${BASE_URL}/register`, form);
      setMsg(res.data.message || "Registration successful");

      setForm({
        name: "",
        phone: "",
        email:"",
        registerNumber: "",
        voterId: "",
        aadhaar: "",
      });
    } catch (err) {
      setMsg(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // -------------------- UI --------------------
  return (
    <div className="container">
      <div className="card">
        <h2>E-Voting Registration</h2>
        <p className="subtitle">
               Verify your identity to participate in the election
        </p>

        <input
          name="name"
          placeholder="👤 Name"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <input
          name="phone"
          placeholder="📞 Phone Number"
          value={form.phone}
          onChange={handleChange}
          maxLength="10"
        />
        {errors.phone && <p className="error">{errors.phone}</p>}

        <input
           name="email"
           type="email"
           placeholder="📧Enter Email"
           value={form.email}
           onChange={handleChange}
           required
          />
          {errors.email && <p className="error">{errors.email}</p>}

        <input
          name="registerNumber"
          placeholder="📝 Register Number"
          value={form.registerNumber}
          onChange={handleChange}
        />
        {errors.registerNumber && (
          <p className="error">{errors.registerNumber}</p>
        )}

        <input
          name="voterId"
          placeholder="🆔 Voter ID"
          value={form.voterId}
          onChange={handleChange}
        />
        {errors.voterId && <p className="error">{errors.voterId}</p>}

        <input
          name="aadhaar"
          placeholder="🧾 Aadhaar Number"
          value={form.aadhaar}
          onChange={handleChange}
          maxLength="12"
        />
        {errors.aadhaar && <p className="error">{errors.aadhaar}</p>}

        <button onClick={submit} disabled={loading}>
          {loading ? "Submitting..." : "Submit Registration"}
        </button>

        {msg && <p style={{ marginTop: "10px" }}>{msg}</p>}
      </div>
    </div>
  );
}

export default Register;