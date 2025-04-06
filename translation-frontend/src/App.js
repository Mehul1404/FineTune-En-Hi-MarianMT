import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';  // Custom CSS file for additional styling

function App() {
  const [englishText, setEnglishText] = useState("");
  const [hindiTranslation, setHindiTranslation] = useState("");
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("light"); // State for theme (light or dark)

  const handleInputChange = (event) => {
    setEnglishText(event.target.value);
  };

  const handleTranslate = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/translate/", {
        text: englishText,
      });
      setHindiTranslation(response.data.translated_text);
      setError("");  // Clear any previous error
      setEnglishText("");  // Clear the textarea after translation
    } catch (err) {
      setError("Error translating text.");
      setHindiTranslation(""); // Clear previous translation
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the Enter key from adding a new line
      handleTranslate(); // Trigger translation when Enter key is pressed
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Update body class when theme changes
  useEffect(() => {
    document.body.className = theme; // Set body class to "light" or "dark"
  }, [theme]);

  return (
    <div className={`App container mt-5`}>
      <h1 className="text-center mb-4">English to Hindi Translation</h1>

      {/* Theme Toggle Button */}
      <button className="btn btn-secondary mb-3" onClick={toggleTheme}>
        Toggle {theme === "light" ? "Dark" : "Light"} Mode
      </button>

      {/* Input Section */}
      <div className="form-group">
        <textarea
          value={englishText}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress} // Detect Enter key press
          className="form-control"
          rows="4"
          placeholder="Enter text in English"
        />
      </div>

      {/* Translate Button */}
      <div className="text-center mt-3">
        <button className="btn btn-primary" onClick={handleTranslate}>Translate</button>
      </div>

      {/* Error Message */}
      {error && <p className="text-danger text-center mt-3">{error}</p>}

      {/* Translation Result */}
      {hindiTranslation && (
        <div className="mt-4">
          <h3>Hindi Translation:</h3>
          <p className="lead">{hindiTranslation}</p>
        </div>
      )}
    </div>
  );
}

export default App;
