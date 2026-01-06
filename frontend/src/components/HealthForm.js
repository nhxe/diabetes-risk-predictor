import React, { useState } from "react";
import axios from "axios";

function HealthForm() {
  const [form, setForm] = useState({
    Age: "",
    BMI: "",
    HighBP: 0,
    HighChol: 0,
    Smoker: 0,
    Stroke: 0,
    HeartDiseaseorAttack: 0,
    PhysActivity: 1,
    DiffWalk: 0,
    Sex: 1
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? (checked ? 1 : 0) : value;
    setForm({ ...form, [name]: val });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
     
      const payload = { ...form };
      Object.keys(payload).forEach(key => payload[key] = parseFloat(payload[key]));

      const res = await axios.post("http://127.0.0.1:5000/predict", payload);
      setResult(res.data);
    } catch (error) {
      alert("Error calculating risk. Please check if the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Health Risk Analyzer</h2>
      <p style={subHeaderStyle}>Enter your details below to assess diabetes risk factors.</p>
      
      <form onSubmit={submitForm} style={formStyle}>
        <div style={rowStyle}>
          <div style={inputGroup}>
            <label style={labelStyle}>Age</label>
            <input type="number" name="Age" placeholder="30" value={form.Age} onChange={handleChange} style={inputStyle} required />
          </div>
          <div style={inputGroup}>
            <label style={labelStyle}>BMI</label>
            <input type="number" step="0.1" name="BMI" placeholder="24.5" value={form.BMI} onChange={handleChange} style={inputStyle} required />
          </div>
        </div>

        <div style={inputGroup}>
          <label style={labelStyle}>Biological Sex</label>
          <select name="Sex" value={form.Sex} onChange={handleChange} style={inputStyle}>
            <option value={1}>Male</option>
            <option value={0}>Female</option>
          </select>
        </div>

        <div style={inputGroup}>
          <label style={labelStyle}>Have you been told you have High Blood Pressure?</label>
          <select name="HighBP" value={form.HighBP} onChange={handleChange} style={inputStyle}>
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
        </div>

        <div style={inputGroup}>
          <label style={labelStyle}>Have you been told you have High Cholesterol?</label>
          <select name="HighChol" value={form.HighChol} onChange={handleChange} style={inputStyle}>
            <option value={0}>No</option>
            <option value={1}>Yes</option>
          </select>
        </div>

        <div style={checkboxGrid}>
          <label style={checkLabel}><input type="checkbox" name="Smoker" onChange={handleChange} /> Smoker</label>
          <label style={checkLabel}><input type="checkbox" name="PhysActivity" defaultChecked onChange={handleChange} /> Active Lifestyle</label>
          <label style={checkLabel}><input type="checkbox" name="Stroke" onChange={handleChange} /> History of Stroke</label>
          <label style={checkLabel}><input type="checkbox" name="DiffWalk" onChange={handleChange} /> Difficulty Walking</label>
        </div>

        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? "Analyzing..." : "Analyze Health Risk"}
        </button>
      </form>

      {result && (
        <div style={{ ...resultCard, borderColor: result.prediction > 0 ? "#e53e3e" : "#38a169" }}>
          <h3 style={{ color: result.prediction > 0 ? "#e53e3e" : "#38a169", marginTop: 0 }}>
            {result.risk}
          </h3>
          <p style={{ margin: 0, color: "#4a5568" }}>
            {result.prediction === 0 
              ? "Your indicators suggest a lower risk. Keep up the healthy habits!" 
              : "Your indicators suggest an increased risk. Consider discussing these results with a medical professional."}
          </p>
        </div>
      )}
    </div>
  );
}


const containerStyle = { maxWidth: "550px", margin: "40px auto", padding: "40px", borderRadius: "16px", backgroundColor: "#ffffff", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", fontFamily: "'Inter', sans-serif" };
const headerStyle = { textAlign: "center", color: "#1a202c", marginBottom: "8px", fontSize: "28px" };
const subHeaderStyle = { textAlign: "center", color: "#718096", marginBottom: "32px" };
const formStyle = { display: "flex", flexDirection: "column", gap: "20px" };
const rowStyle = { display: "flex", gap: "20px" };
const inputGroup = { display: "flex", flexDirection: "column", gap: "8px", flex: 1 };
const labelStyle = { fontSize: "14px", fontWeight: "600", color: "#4a5568" };
const inputStyle = { padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "16px", outline: "none" };
const checkboxGrid = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", margin: "10px 0" };
const checkLabel = { fontSize: "14px", color: "#4a5568", display: "flex", alignItems: "center", gap: "8px" };
const buttonStyle = { padding: "14px", borderRadius: "8px", border: "none", backgroundColor: "#4a90e2", color: "white", fontSize: "16px", fontWeight: "bold", cursor: "pointer", marginTop: "10px" };
const resultCard = { marginTop: "32px", padding: "24px", borderRadius: "12px", borderLeft: "6px solid", backgroundColor: "#f8fafc" };

export default HealthForm;