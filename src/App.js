import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {


  const BACKEND_URL = "NGROK_LINK_PASTE"; 


  const [formData, setFormData] = useState({
    age: '',
    gender: '1', 
    ethnicity: 'middle eastern',
    jaundice: '0',
    familyHistory: '0',
    A1: '0', A2: '0', A3: '0', A4: '0', A5: '0',
    A6: '0', A7: '0', A8: '0', A9: '0', A10: '0'
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const questionsList = [
    { 
      key: "A1", 
      text: "A1: Does your child look at you when you call his/her name?",
      score_if_yes: "0", score_if_no: "1" 
    },
    { 
      key: "A2", 
      text: "A2: Is it easy for you to get eye contact with your child?",
      score_if_yes: "0", score_if_no: "1" 
    },
    { 
      key: "A3", 
      text: "A3: Does your child point to indicate that s/he wants something?",
      score_if_yes: "0", score_if_no: "1"
    },
    { 
      key: "A4", 
      text: "A4: Does your child point to share interest with you?",
      score_if_yes: "0", score_if_no: "1"
    },
    { 
      key: "A5", 
      text: "A5: Does your child pretend? (e.g. care for dolls, talk on a toy phone)",
      score_if_yes: "0", score_if_no: "1"
    },
    { 
      key: "A6", 
      text: "A6: Does your child follow where you’re looking?",
      score_if_yes: "0", score_if_no: "1"
    },
    { 
      key: "A7", 
      text: "A7: If you are visibly upset, does your child show signs of wanting to comfort you?",
      score_if_yes: "0", score_if_no: "1"
    },
    { 
      key: "A8", 
      text: "A8: Was your child's first word development typical?",
      score_if_yes: "0", score_if_no: "1" 
    },
    { 
      key: "A9", 
      text: "A9: Does your child use simple gestures? (e.g. wave goodbye)",
      score_if_yes: "0", score_if_no: "1"
    },
    { 
      key: "A10", 
      text: "A10: Does your child stare at nothing with no apparent purpose?",

      score_if_yes: "1", score_if_no: "0" 
    }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.post(`${BACKEND_URL}/predict`, formData);
      setResult(response.data.prediction);
    } catch (err) {
      console.error("Error:", err);
      setError("Could not connect to Colab. Check your Ngrok URL.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
      
      <h1 style={{textAlign: 'center', color: '#2c3e50'}}>ASD Screening Tool</h1>
      
      <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
        
        {/* --- SECTION 1: DEMOGRAPHICS --- */}
        <div style={{background: '#f8f9fa', padding: '20px', borderRadius: '10px', border: '1px solid #dee2e6'}}>
          <h3 style={{marginTop: 0, color: '#007bff'}}>1. Patient Details</h3>
          
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
            
            <div>
              <label><strong>Age (Months):</strong></label>
              <input type="number" name="age" required onChange={handleChange} style={{width: '100%', padding: '8px', marginTop: '5px'}} placeholder="e.g. 24" />
            </div>

            <div>
              <label><strong>Gender:</strong></label>
              <select name="gender" onChange={handleChange} style={{width: '100%', padding: '8px', marginTop: '5px'}}>
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>

            <div>
              <label><strong>Ethnicity:</strong></label>
              <select name="ethnicity" onChange={handleChange} style={{width: '100%', padding: '8px', marginTop: '5px'}}>
                <option value="middle eastern">Middle Eastern</option>
                <option value="white european">White European</option>
                <option value="asian">Asian</option>
                <option value="south asian">South Asian</option>
                <option value="black">Black</option>
                <option value="hispanic">Hispanic</option>
                <option value="latino">Latino</option>
                <option value="mixed">Mixed</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div>
              <label><strong>Jaundice at birth?</strong></label>
              <select name="jaundice" onChange={handleChange} style={{width: '100%', padding: '8px', marginTop: '5px'}}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            <div>
              <label><strong>Family Member with ASD?</strong></label>
              <select name="familyHistory" onChange={handleChange} style={{width: '100%', padding: '8px', marginTop: '5px'}}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

          </div>
        </div>

        <div style={{background: '#e9ecef', padding: '20px', borderRadius: '10px', border: '1px solid #ced4da'}}>
          <h3 style={{marginTop: 0, color: '#007bff'}}>2. Screening Questions</h3>
          <p style={{fontStyle: 'italic', fontSize: '0.9rem', marginBottom: '20px'}}>
             Please answer <strong>Yes</strong> or <strong>No</strong> based on the child's usual behavior.
          </p>

          {questionsList.map((item, index) => (
            <div key={index} style={{ marginBottom: "15px", paddingBottom: "10px", borderBottom: "1px solid #ccc" }}>
              
              <label style={{display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#343a40'}}>
                {item.text}
              </label>

              <select name={item.key} onChange={handleChange} style={{width: '100%', padding: '8px', fontSize: '16px'}}>
                <option value="">-- Select --</option>
                <option value={item.score_if_yes}>Yes</option>
                <option value={item.score_if_no}>No</option>
              </select>
            
            </div>
          ))}

        </div>

        <button type="submit" disabled={loading} style={{ 
          padding: "15px", 
          background: loading ? "#6c757d" : "#28a745", 
          color: "white", 
          fontSize: "18px", 
          fontWeight: "bold", 
          border: "none", 
          borderRadius: "8px", 
          cursor: "pointer"
        }}>
          {loading ? "Analyzing..." : "PREDICT RESULT"}
        </button>

      </form>

      {/* --- RESULTS --- */}
      {result && (
        <div style={{ marginTop: "30px", padding: "20px", background: result.includes("Potential") ? "#ffcccc" : "#d4edda", borderRadius: "10px", textAlign: 'center', border: '2px solid #333' }}>
          <h2>Prediction Result:</h2>
          <h1 style={{color: result.includes("Potential") ? "#d9534f" : "#28a745"}}>{result}</h1>
        </div>
      )}

      {error && (
        <div style={{ marginTop: "20px", padding: "15px", background: "#f8d7da", color: "#721c24", borderRadius: "5px" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

    </div>
  );
}

export default App;