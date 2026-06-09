const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const pdfGenerator = require('./routes/pdfGenerator');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/pdf', pdfGenerator);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server läuft erfolgreich' });
});

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'client/build')));

// Fallback to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`🏠 Immobilienbewertungs-Server läuft auf Port ${PORT}`);
});