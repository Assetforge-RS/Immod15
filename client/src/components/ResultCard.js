import React from 'react';
import './ResultCard.css';

function ResultCard({ valuation, formData, onExportPdf, exportLoading }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  return (
    <div className="result-card">
      <h2>📋 Bewertungsergebnis</h2>

      <div className="object-summary">
        <h3>Objekt</h3>
        <p className="address">{formData.address}, {formData.zipCode} {formData.city}</p>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="label">Fläche:</span>
            <span className="value">{formData.area} m²</span>
          </div>
          <div className="summary-item">
            <span className="label">Zimmer:</span>
            <span className="value">{formData.rooms || 'N/A'}</span>
          </div>
          <div className="summary-item">
            <span className="label">Baujahr:</span>
            <span className="value">{formData.yearBuilt}</span>
          </div>
          <div className="summary-item">
            <span className="label">Zustand:</span>
            <span className="value">{formData.condition}</span>
          </div>
        </div>
      </div>

      <div className="analysis-section">
        <h3>Bewertungsanalyse</h3>
        
        <div className="value-breakdown">
          <div className="breakdown-item">
            <span className="label">Grundpreis pro m²:</span>
            <span className="value">{formatCurrency(formData.pricePerSqm)}</span>
          </div>
          <div className="breakdown-item">
            <span className="label">Basisbewertung:</span>
            <span className="value">{formatCurrency(valuation.baseValue)}</span>
          </div>
        </div>

        <div className="adjustments">
          <h4>Anpassungsfaktoren:</h4>
          <div className="adjustment-grid">
            <div className="adjustment-item">
              <span className="label">Zustand:</span>
              <span className={`value ${valuation.conditionAdjustment > 0 ? 'positive' : 'negative'}`}>
                {formatPercentage(valuation.conditionAdjustment)}
              </span>
            </div>
            <div className="adjustment-item">
              <span className="label">Lage:</span>
              <span className={`value ${valuation.locationAdjustment > 0 ? 'positive' : 'negative'}`}>
                {formatPercentage(valuation.locationAdjustment)}
              </span>
            </div>
            <div className="adjustment-item">
              <span className="label">Alter:</span>
              <span className={`value ${valuation.ageAdjustment > 0 ? 'positive' : 'negative'}`}>
                {formatPercentage(valuation.ageAdjustment)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="final-valuation">
        <p className="label">Geschätzte Immobilienbewertung:</p>
        <p className="amount">{formatCurrency(valuation.finalValue)}</p>
        <p className="disclaimer">
          Diese Bewertung basiert auf einer automatisierten Analyse. Für ein offizielles Gutachten wenden Sie sich bitte an einen zertifizierten Sachverständigen.
        </p>
      </div>

      <button 
        className="pdf-export-btn"
        onClick={onExportPdf}
        disabled={exportLoading}
      >
        {exportLoading ? '⏳ Generiere PDF...' : '📄 PDF exportieren'}
      </button>
    </div>
  );
}

export default ResultCard;