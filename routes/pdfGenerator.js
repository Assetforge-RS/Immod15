const express = require('express');
const PDFDocument = require('pdfkit');
const router = express.Router();

// Hilfsfunktion zur Bewertungsberechnung
function calculateValuation(data) {
  const basePrice = data.pricePerSqm || 5000;
  const areaFactor = data.area / 100;
  const conditionFactor = getConditionFactor(data.condition);
  const locationFactor = getLocationFactor(data.locationQuality);
  const ageFactor = getAgeFactor(data.yearBuilt);

  const calculatedValue = basePrice * areaFactor * conditionFactor * locationFactor * ageFactor;

  return {
    baseValue: calculatedValue,
    conditionAdjustment: (conditionFactor - 1) * 100,
    locationAdjustment: (locationFactor - 1) * 100,
    ageAdjustment: (ageFactor - 1) * 100,
    finalValue: Math.round(calculatedValue)
  };
}

function getConditionFactor(condition) {
  const factors = {
    'ausgezeichnet': 1.15,
    'gut': 1.0,
    'befriedigend': 0.85,
    'mangelhaft': 0.70
  };
  return factors[condition] || 1.0;
}

function getLocationFactor(quality) {
  const factors = {
    'beste': 1.25,
    'gut': 1.1,
    'mittel': 1.0,
    'schwach': 0.85
  };
  return factors[quality] || 1.0;
}

function getAgeFactor(yearBuilt) {
  const age = new Date().getFullYear() - yearBuilt;
  if (age < 5) return 1.1;
  if (age < 20) return 1.0;
  if (age < 50) return 0.95;
  return 0.85;
}

// PDF-Erstellung Route
router.post('/generate', (req, res) => {
  try {
    const data = req.body;
    const valuation = calculateValuation(data);

    // PDF-Dokument erstellen
    const doc = new PDFDocument({
      size: 'A4',
      margin: 50
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Immobilienbewertung.pdf"');

    doc.pipe(res);

    // Header
    doc.fontSize(24).font('Helvetica-Bold').text('IMMOBILIENBEWERTUNGSBERICHT', { align: 'center' });
    doc.fontSize(10).fillColor('#888').text('Professionelle Bewertungsanalyse', { align: 'center' });
    doc.moveDown(0.5);
    doc.strokeColor('#cccccc').lineWidth(2).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
    doc.moveDown(1);

    // Allgemeine Informationen
    doc.fontSize(12).fillColor('#000').font('Helvetica-Bold').text('OBJEKTINFORMATIONEN');
    doc.fontSize(10).font('Helvetica');
    doc.moveDown(0.3);

    doc.text(`Adresse: ${data.address}`);
    doc.text(`Postleitzahl: ${data.zipCode}`);
    doc.text(`Stadt: ${data.city}`);
    doc.text(`Fläche: ${data.area} m²`);
    doc.text(`Baujahr: ${data.yearBuilt}`);
    doc.text(`Anzahl Zimmer: ${data.rooms}`);
    doc.text(`Anzahl Badezimmer: ${data.bathrooms}`);
    doc.text(`Zustand: ${data.condition}`);
    doc.text(`Lagequalität: ${data.locationQuality}`);

    doc.moveDown(1);
    doc.strokeColor('#cccccc').lineWidth(1).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
    doc.moveDown(1);

    // Bewertungsdetails
    doc.fontSize(12).font('Helvetica-Bold').text('BEWERTUNGSANALYSE');
    doc.fontSize(10).font('Helvetica');
    doc.moveDown(0.3);

    doc.text(`Grundpreis pro m²: €${data.pricePerSqm?.toLocaleString('de-DE')} / m²`);
    doc.text(`Basisbewertung: €${Math.round(valuation.baseValue).toLocaleString('de-DE')}`);
    doc.moveDown(0.5);

    // Adjustments
    doc.font('Helvetica-Bold').text('Anpassungsfaktoren:');
    doc.font('Helvetica');
    doc.text(`  • Zustandsanpassung: ${valuation.conditionAdjustment > 0 ? '+' : ''}${valuation.conditionAdjustment.toFixed(1)}%`);
    doc.text(`  • Lagenanpassung: ${valuation.locationAdjustment > 0 ? '+' : ''}${valuation.locationAdjustment.toFixed(1)}%`);
    doc.text(`  • Alterungsanpassung: ${valuation.ageAdjustment > 0 ? '+' : ''}${valuation.ageAdjustment.toFixed(1)}%`);

    doc.moveDown(1);
    doc.strokeColor('#cccccc').lineWidth(2).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
    doc.moveDown(1);

    // Finales Ergebnis
    doc.fontSize(14).font('Helvetica-Bold').fillColor('#2c5282').text('GESCHÄTZTE IMMOBILIENBEWERTUNG:');
    doc.fontSize(20).font('Helvetica-Bold').fillColor('#1a365d').text(`€${valuation.finalValue.toLocaleString('de-DE')}`, { align: 'center' });

    doc.moveDown(1.5);
    doc.fontSize(8).fillColor('#888').font('Helvetica').text(
      'Diese Bewertung basiert auf einer automatisierten Analyse und dient nur zu Informationszwecken. Für eine professionelle Gutachten empfehlen wir einen zertifizierten Sachverständigen.',
      { align: 'center', width: 445 }
    );

    // Zusätzliche Informationen
    doc.moveDown(1);
    doc.fontSize(10).font('Helvetica-Bold').text('ZUSÄTZLICHE NOTIZEN:');
    doc.fontSize(9).font('Helvetica').text(data.notes || 'Keine zusätzlichen Notizen vorhanden');

    // Footer
    doc.moveDown(2);
    doc.fontSize(8).fillColor('#999').text(`Erstellt am: ${new Date().toLocaleDateString('de-DE')} um ${new Date().toLocaleTimeString('de-DE')}`, { align: 'center' });

    doc.end();
  } catch (error) {
    console.error('PDF-Fehler:', error);
    res.status(500).json({ error: 'Fehler beim Generieren des PDFs' });
  }
});

module.exports = router;