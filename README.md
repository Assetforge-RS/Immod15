# 🏠 Immobilienbewertung - Professional Property Valuation

Eine moderne Web-Anwendung zur automatisierten Immobilienbewertung mit professionellem PDF-Export.

## ✨ Features

- 📊 **Intelligente Bewertungsanalyse** - Automatische Berechnung basierend auf mehreren Faktoren
- 📄 **PDF-Export** - Professionelle, druckbare Bewertungsberichte
- 🎨 **Modernes UI** - Responsive Design für alle Geräte
- ⚡ **Echtzeit-Berechnung** - Sofortige Bewertungsergebnisse
- 🔧 **Flexible Faktoren** - Anpassungen für Zustand, Lage und Alter

## 🚀 Installation & Start

### Voraussetzungen
- Node.js (v14+)
- npm oder yarn

### Setup

```bash
# Repository klonen
git clone https://github.com/Assetforge-RS/Immod15.git
cd Immod15

# Dependencies installieren
npm install
cd client && npm install && cd ..

# Entwicklungsserver starten
npm run dev
```

Die Anwendung läuft dann auf:
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000

## 📦 Produktions-Build

```bash
# Build erstellen
npm run build

# Produktionsserver starten
npm start
```

## 🏗️ Architektur

```
Immod15/
├── server.js                 # Express Server
├── routes/
│   └── pdfGenerator.js      # PDF-Export Logik
├── client/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js           # Hauptkomponente
│       ├── App.css
│       └── components/
│           ├── PropertyForm.js
│           ├── PropertyForm.css
│           ├── ResultCard.js
│           └── ResultCard.css
└── package.json
```

## 📋 Bewertungslogik

### Grundformel
```
Bewertung = Grundpreis/m² × Flächenfaktor × Zustandsfaktor × Lagenfaktor × Altersfaktor
```

### Faktoren

**Zustand:**
- Ausgezeichnet: +15%
- Gut: 0% (Basis)
- Befriedigend: -15%
- Mangelhaft: -30%

**Lage:**
- Beste: +25%
- Gut: +10%
- Mittel: 0% (Basis)
- Schwach: -15%

**Alter (ab Baujahr):**
- < 5 Jahre: +10%
- 5-20 Jahre: 0% (Basis)
- 20-50 Jahre: -5%
- > 50 Jahre: -15%

## 🔄 API-Endpunkte

### PDF generieren
```http
POST /api/pdf/generate
Content-Type: application/json

{
  "address": "Hauptstraße 42",
  "zipCode": "10115",
  "city": "Berlin",
  "area": 120,
  "yearBuilt": 2010,
  "rooms": 3,
  "bathrooms": 1,
  "condition": "gut",
  "locationQuality": "mittel",
  "pricePerSqm": 5000,
  "notes": "Renoviert, Balkon"
}
```

**Response:** PDF-Datei

## 📱 Responsive Design

- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (< 768px)

## 🛠️ Technologie Stack

### Frontend
- React 18
- Axios (HTTP Client)
- CSS3 (Responsive Grid & Flexbox)

### Backend
- Express.js
- PDFKit (PDF-Generierung)
- CORS
- Body-Parser

## 📝 Lizenz

MIT

## 👤 Autor

Assetforge-RS

## 🤝 Beitragen

Contributions sind willkommen! Bitte erstelle einen Fork und einen Pull Request.

## ⚠️ Disclaimer

Diese Anwendung bietet automatisierte Immobilienbewertungen zu Informationszwecken. Für offizielle Gutachten und rechtlich verbindliche Bewertungen konsultieren Sie bitte einen zertifizierten Sachverständigen oder Immobilienmakler.

---

**Fragen oder Support?** Eröffne ein GitHub Issue!
