import React, { useState } from "react";
import axios from "axios";

const HoleheChecker = () => {
  const [email, setEmail] = useState(""); // État pour stocker l'email saisi
  const [results, setResults] = useState(null); // État pour stocker les résultats
  const [loading, setLoading] = useState(false); // État pour afficher un indicateur de chargement
  const [error, setError] = useState(""); // État pour gérer les erreurs

  // Fonction pour envoyer une requête à l'API
  const handleCheck = async () => {
    setError(""); // Réinitialise les erreurs
    setResults(null); // Réinitialise les résultats
    setLoading(true); // Active l'indicateur de chargement

    if (!email) {
      setError("Veuillez saisir une adresse e-mail.");
      setLoading(false);
      return;
    }

    try {
      // Effectue la requête POST vers l'API
      const response = await axios.post("http://127.0.0.1:8000", { email });
      setResults(response.data.data); // Stocke les résultats dans l'état
    } catch {
      setError("Une erreur s'est produite. Veuillez réessayer."); // Gère les erreurs
    } finally {
      setLoading(false); // Désactive l'indicateur de chargement
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Holehe Email Checker</h1>
      <input
        type="email"
        placeholder="Saisissez une adresse e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "10px", fontSize: "16px", width: "300px" }}
      />
      <button
        onClick={handleCheck}
        style={{
          padding: "10px 20px",
          marginLeft: "10px",
          fontSize: "16px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {loading ? "Recherche en cours..." : "Vérifier"}
      </button>

      {/* Gestion des erreurs */}
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      {/* Affichage des résultats */}
      {results && (
        <div style={{ marginTop: "20px" }}>
          <h2>Résultats :</h2>
          <pre
            style={{
              backgroundColor: "#f4f4f4",
              padding: "10px",
              borderRadius: "5px",
              overflow: "auto",
            }}
          >
           {JSON.stringify(results, null, 100)} 
          </pre>
        </div>
      )}
    </div>
  );
};

export default HoleheChecker;
