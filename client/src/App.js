import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import PropertyForm from './components/PropertyForm';
import ResultCard from './components/ResultCard';

function App() {
  const [formData, setFormData] = useState(null);
  const [valuation, setValuation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFormSubmit = async (data) => {
    setFormData(data);
    setLoading(true);
    setError('');
    
    try {
      // Berechne Bewertung im Frontend für schnelle Vorschau
      const basePrice = data.pricePerSqm || 5000;
      const areaFactor = data.area / 100;
      const conditionFactor = getConditionFactor(data.condition);
      const locationFactor = getLocationFactor(data.locationQuality);
      const ageFactor = getAgeFactor(data.yearBuilt);

      const baseValue = basePrice * areaFactor * conditionFactor * locationFactor * ageFactor;
      
      setValuation({
        baseValue: Math.round(baseValue),
        conditionAdjustment: (conditionFactor - 1) * 100,
        locationAdjustment: (locationFactor - 1) * 100,
        ageAdjustment: (ageFactor - 1) * 100,
        finalValue: Math.round(baseValue)
      });

      setLoading(false);
    } catch (err) {
      setError('Fehler bei der Berechnung');
      setLoading(false);
    }
  };

  const handlePdfExport = async () => {
    if (!formData) return;
    
    setLoading(true);
    try {
      const response = await axios.post('/api/pdf/generate', formData, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Immobilienbewertung_${new Date().toISOString().split('T')[0]}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Fehler beim PDF-Export');
    }
    setLoading(false);
  };

  const getConditionFactor = (condition) => {
    const factors = {
      'ausgezeichnet': 1.15,
      'gut': 1.0,
      'befriedigend': 0.85,
      'mangelhaft': 0.70
    };
    return factors[condition] || 1.0;
  };

  const getLocationFactor = (quality) => {
    const factors = {
      'beste': 1.25,
      'gut': 1.1,
      'mittel': 1.0,
      'schwach': 0.85
    };
    return factors[quality] || 1.0;
  };

  const getAgeFactor = (yearBuilt) => {
    const age = new Date().getFullYear() - yearBuilt;
    if (age < 5) return 1.1;
    if (age < 20) return 1.0;
    if (age < 50) return 0.95;
    return 0.85;
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🏠 Immobilienbewertung</h1>
        <p>Professionelle Online-Bewertung mit PDF-Export</p>
      </header>

      <main className="app-main">
        <div className="container">
          <div className="form-section">
            <PropertyForm onSubmit={handleFormSubmit} loading={loading} />
          </div>

          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          {valuation && (
            <div className="result-section">
              <ResultCard 
                valuation={valuation} 
                formData={formData}
                onExportPdf={handlePdfExport}
                exportLoading={loading}
              />
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2024 Immobilienbewertung | Powered by Assetforge-RS</p>
      </footer>
    </div>
  );
}

export default App;
