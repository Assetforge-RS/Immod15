import React, { useState } from 'react';
import './PropertyForm.css';

function PropertyForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    address: '',
    zipCode: '',
    city: '',
    area: '',
    yearBuilt: new Date().getFullYear(),
    rooms: '',
    bathrooms: '',
    condition: 'gut',
    locationQuality: 'mittel',
    pricePerSqm: 5000,
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'area' || name === 'yearBuilt' || name === 'rooms' || name === 'bathrooms' || name === 'pricePerSqm' 
        ? Number(value) 
        : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validierung
    if (!formData.address || !formData.zipCode || !formData.city || !formData.area) {
      alert('Bitte füllen Sie alle erforderlichen Felder aus');
      return;
    }

    onSubmit(formData);
  };

  return (
    <form className="property-form" onSubmit={handleSubmit}>
      <h2>Objektinformationen</h2>

      <div className="form-group">
        <label htmlFor="address">Adresse *</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="z.B. Hauptstraße 42"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="zipCode">Postleitzahl *</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder="z.B. 10115"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">Stadt *</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="z.B. Berlin"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="area">Fläche (m²) *</label>
          <input
            type="number"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            placeholder="z.B. 120"
            min="10"
            step="1"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="yearBuilt">Baujahr</label>
          <input
            type="number"
            id="yearBuilt"
            name="yearBuilt"
            value={formData.yearBuilt}
            onChange={handleChange}
            min="1900"
            max={new Date().getFullYear()}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="rooms">Zimmer</label>
          <input
            type="number"
            id="rooms"
            name="rooms"
            value={formData.rooms}
            onChange={handleChange}
            placeholder="z.B. 3"
            min="1"
            step="0.5"
          />
        </div>
        <div className="form-group">
          <label htmlFor="bathrooms">Badezimmer</label>
          <input
            type="number"
            id="bathrooms"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            placeholder="z.B. 1"
            min="1"
            step="0.5"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="condition">Zustand</label>
          <select id="condition" name="condition" value={formData.condition} onChange={handleChange}>
            <option value="ausgezeichnet">Ausgezeichnet</option>
            <option value="gut">Gut</option>
            <option value="befriedigend">Befriedigend</option>
            <option value="mangelhaft">Mangelhaft</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="locationQuality">Lagequalität</label>
          <select id="locationQuality" name="locationQuality" value={formData.locationQuality} onChange={handleChange}>
            <option value="beste">Beste</option>
            <option value="gut">Gut</option>
            <option value="mittel">Mittel</option>
            <option value="schwach">Schwach</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="pricePerSqm">Grundpreis pro m² (€)</label>
        <input
          type="number"
          id="pricePerSqm"
          name="pricePerSqm"
          value={formData.pricePerSqm}
          onChange={handleChange}
          placeholder="z.B. 5000"
          min="500"
          step="100"
        />
      </div>

      <div className="form-group">
        <label htmlFor="notes">Zusätzliche Notizen</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="z.B. Renoviert, Garten, Balkon..."
          rows="4"
        />
      </div>

      <button 
        type="submit" 
        className="submit-btn"
        disabled={loading}
      >
        {loading ? '⏳ Berechne...' : '📊 Bewertung berechnen'}
      </button>
    </form>
  );
}

export default PropertyForm;