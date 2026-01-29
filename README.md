# 📚 Informatik Lernapp

Eine modulare, browserbasierte Lernplattform für Informatik-Unterricht der Klassen 5-10. Vollständig clientseitig - **kein Backend oder Webserver erforderlich!**

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Browser](https://img.shields.io/badge/browser-Chrome%20%7C%20Firefox%20%7C%20Edge-orange.svg)

## ✨ Features

### 🎓 Für Schüler
- **10 interaktive Lektionen** für die Klassenstufen 5-6 (weitere in Planung)
- **Progressives Freischalten**: Lektionen werden nacheinander freigeschaltet nach Abschluss der vorherigen
- **Interaktive Übungen**: Drag & Drop, Simulationen, Live-Editoren
- **Sofortiges Feedback**: Quizzes mit direkter Auswertung
- **Fortschrittsverfolgung**: Visueller Überblick über erledigte Lektionen
- **Token-basierte Anmeldung**: Einfacher Zugang ohne komplizierte Registrierung

### 👨‍🏫 Für Lehrer
- **Klassen-Management**: Übersicht über alle Schüler nach Klassen
- **Detaillierte Statistiken**: Fortschritt, Durchschnittswerte, Abschlussquoten
- **Lektionen-Verwaltung**: 
  - Einzelne Lektionen für Schüler freischalten/sperren
  - Klassenweite Steuerung aller Lektionen
  - Visuelle Übersicht über Lektionsfortschritt
  - **Klickbare Lektionskacheln**: Lehrkräfte können Lektionen durch Klick öffnen und Inhalte ansehen
- **Token-Verwaltung**: Einfaches Kopieren von Schüler-Tokens
- **CSV-Export**: Daten für externe Auswertungen exportieren
- **Keine Installation nötig**: Läuft direkt im Browser via `file://` Protokoll

## 🚀 Schnellstart

### Installation

1. **Repository klonen:**
```bash
git clone https://github.com/fuzzy123-ai/Informatik-Lernapp.git
cd Informatik-Lernapp
```

2. **Öffnen:**
   - Doppelklick auf `index.html` im Explorer
   - **Oder** in VS Code öffnen und mit Live Server starten
   - Funktioniert auch offline!

### Erste Schritte

#### Als Lehrer:
1. `index.html` öffnen
2. "Als Lehrer anmelden" wählen
3. Passwort: `P3stal0zzi`
4. Klasse auswählen und Schüler verwalten

#### Als Schüler:
1. `index.html` öffnen
2. "Als Schüler registrieren"
3. Name + Klasse eingeben
4. Token erhalten (vom Lehrer kopieren oder selbst notieren!)
5. Mit Token anmelden und lernen!

## 📖 Lektions-Übersicht

### Klasse 5 (6 Lektionen)
- 💻 Was ist ein Computer?
- ⌨️ Eingabe und Ausgabe
- 🔢 Das Binärsystem
- 🐱 Erste Schritte mit Scratch
- ➡️ Sequenzen programmieren
- 🔄 Schleifen verstehen

### Klasse 6 (4 Lektionen)
- 📁 Dateien und Ordner
- ❓ Bedingungen in Scratch
- 📦 Variablen nutzen
- 🎯 Koordinaten und Bewegung

### Klasse 7-10
- 🚧 Weitere Lektionen in Planung

## 🏗️ Projektstruktur

```
informatik_lernapp/
├── index.html                  # Landing Page & Login
├── student-dashboard.html      # Schüler-Dashboard
├── teacher-dashboard.html      # Lehrer-Dashboard
├── README.md                   # Diese Datei
│
├── config/
│   └── curriculum.json         # Lektions-Datenbank
│
├── js/
│   ├── auth.js                 # Token-System & Login
│   └── progress.js             # Fortschrittsverwaltung
│
├── styles/
│   └── main.css                # Globales Styling
│
└── lessons/
    ├── klasse5/
    │   ├── was_ist_ein_computer.html
    │   ├── eingabe_ausgabe.html
    │   ├── binaersystem.html
    │   ├── scratch_intro.html
    │   ├── sequenzen.html
    │   └── schleifen.html
    └── klasse6/
        ├── dateien_ordner.html
        ├── bedingungen.html
        ├── variablen.html
        └── koordinaten.html
```

## 🔧 Technische Details

### Technologie-Stack
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **React**: UMD Build für interaktive Komponenten
- **Styling**: TailwindCSS (via CDN)
- **Babel**: Standalone JSX-Transformation
- **Storage**: LocalStorage API (kein Backend!)

### Datenspeicherung

Alle Daten werden im Browser gespeichert (`LocalStorage`):

```javascript
{
  "TOKEN123": {
    "name": "Max Mustermann",
    "class": "5a",
    "role": "student",
    "registeredAt": "2026-01-28T22:30:00.000Z",
    "progress": {
      "k5-01": {
        "status": "completed",
        "score": 85,
        "timestamp": "2026-01-28T23:15:00.000Z"
      }
    }
  }
}
```

### Lektions-Status
- `locked` 🔒: Noch nicht freigeschaltet
- `unlocked` 📂: Verfügbar, aber noch nicht begonnen
- `in-progress` 📖: Gestartet, aber nicht abgeschlossen
- `completed` ✅: Erfolgreich abgeschlossen

### Progressive Freischaltung
1. Erste Lektion jeder Klassenstufe ist **automatisch freigeschaltet**
2. Folgelektionen werden **nach Abschluss der vorherigen** freigeschaltet
3. Lehrer können **jederzeit manuell freischalten/sperren**

## 🎨 Beispiel-Lektionen

Aktuell vollständig implementiert:

### Klasse 5 (6 Lektionen)
1. **Was ist ein Computer?** - Hardware/Software-Theorie, Drag & Drop Kategorisierung, 4-Fragen Quiz
2. **Eingabe und Ausgabe** - Eingabe- und Ausgabegeräte verstehen
3. **Das Binärsystem** - Bit-Erklärung mit Animation, interaktiver Bit-Simulator, Dezimal ↔ Binär Konverter
4. **Erste Schritte mit Scratch** - Einführung in visuelle Programmierung
5. **Sequenzen programmieren** - Befehle in der richtigen Reihenfolge
6. **Schleifen verstehen** - Wiederholungen in Programmen

### Klasse 6 (4 Lektionen)
1. **Dateien und Ordner** - Dateisystem-Theorie, interaktiver Ordner-Explorer, 4-Fragen Quiz
2. **Bedingungen in Scratch** - IF-THEN-ELSE Strukturen mit interaktiven Beispielen
3. **Variablen nutzen** - Werte speichern und ändern mit praktischen Demos
4. **Koordinaten und Bewegung** - X-Y-Koordinatensystem mit bewegbarem Sprite

## 👥 Lehrer-Dashboard Features

### Schüler-Übersicht
- Token (klickbar zum Kopieren)
- Name
- Fortschrittsbalken
- Abgeschlossene Lektionen
- Durchschnittsscore
- Registrierungsdatum
- "Verwalten"-Button

### Lektionen-Übersicht
- Kachel-Ansicht aller Lektionen
- Progressbar: Wie viele Schüler haben abgeschlossen?
- Visuelle Kennzeichnung gesperrter Lektionen
- "Lektionen verwalten"-Button

### Verwaltungs-Modal
- **Klassenweite Steuerung:**
  - Alle Lektionen auf einmal freischalten
  - Alle Lektionen auf einmal sperren
  
- **Einzelne Lektion:**
  - Toggle für jede Lektion (freischalten/sperren)
  - Statistiken (wie viele Schüler freigeschaltet/abgeschlossen)
  - Abgeschlossene Lektionen bleiben beim Sperren erhalten

## 📊 Statistiken

Das Dashboard zeigt:
- **Anzahl registrierter Schüler** pro Klasse
- **Durchschnittlicher Fortschritt** der Klasse (%)
- **Anzahl verfügbarer Lektionen** für die Klassenstufe
- **Individuelle Schülerstatistiken**
- **Lektions-Abschlussquoten** pro Klasse

## 🔐 Sicherheit & Datenschutz

⚠️ **Wichtig**: Diese App ist für **Bildungszwecke** konzipiert und sollte **nicht** mit sensiblen Daten verwendet werden!

- ✅ **Keine Server-Kommunikation**: Alle Daten bleiben lokal
- ✅ **Keine Cookies**: Nur LocalStorage
- ✅ **Keine Tracking-Tools**: Völlig anonym
- ✅ **Offline-fähig**: Funktioniert ohne Internet

⚠️ **Limitierungen**:
- Daten bleiben nur im Browser gespeichert
- Bei Browser-Cache-Löschung gehen Daten verloren
- Keine Backup-Funktion (außer CSV-Export)
- Lehrer-Passwort ist hart codiert

## 🛠️ Entwicklung

### Neue Lektion hinzufügen

1. **HTML-Datei erstellen** in `lessons/klasseX/`
2. **Struktur verwenden:**
```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>Lektionstitel</title>
    <link rel="stylesheet" href="../../styles/main.css">
</head>
<body>
    <div class="container">
        <div class="lesson-header">
            <h1>🎯 Lektionstitel</h1>
        </div>
        
        <div class="tabs">
            <button class="tab-btn active" onclick="switchTab('theory')">📖 Theorie</button>
            <button class="tab-btn" onclick="switchTab('interactive')">🎮 Interaktiv</button>
            <button class="tab-btn" onclick="switchTab('quiz')">✅ Quiz</button>
        </div>
        
        <!-- Tabs Content -->
        
        <button class="btn btn-primary" onclick="completeLesson()">
            ✓ Lektion abschließen
        </button>
    </div>
    
    <script src="../../js/auth.js"></script>
    <script src="../../js/progress.js"></script>
    <script>
        requireAuth();
        const lessonId = 'kX-YY'; // Eindeutige ID!
        
        function completeLesson() {
            const quizScore = 85; // Aus Quiz berechnen
            markLessonCompleted(getCurrentToken(), lessonId, quizScore);
            alert('🎉 Lektion abgeschlossen!');
            window.location.href = '../../student-dashboard.html';
        }
    </script>
</body>
</html>
```

3. **In curriculum.json registrieren:**
```json
{
  "id": "kX-YY",
  "title": "Lektionstitel",
  "icon": "🎯"
}
```

### Lehrer-Passwort ändern

In `js/auth.js` Zeile 39:
```javascript
const TEACHER_PASSWORD = "DeinNeuesPasswort";
```

## 🐛 Bekannte Probleme

- Bei sehr vielen Schülern (>50) kann das Dashboard langsam werden
- LocalStorage-Limit: ~5-10MB (reicht für hunderte Schüler)
- Keine Multi-Device-Synchronisation

## 📝 Lizenz

MIT License - Frei verwendbar für Bildungszwecke!

## 🤝 Mitwirken

Contributions sind willkommen! 

1. Fork das Projekt
2. Feature Branch erstellen (`git checkout -b feature/NeueLektion`)
3. Changes committen (`git commit -m 'Add: Neue Lektion XY'`)
4. Branch pushen (`git push origin feature/NeueLektion`)
5. Pull Request erstellen

## 📧 Kontakt

Bei Fragen oder Problemen: [GitHub Issues](https://github.com/fuzzy123-ai/Informatik-Lernapp/issues)

---

**Entwickelt mit ❤️ für den Informatik-Unterricht**

*Hinweis: Diese App ersetzt keinen professionellen Lern-Management-System (LMS) für Produktivumgebungen. Für den Schulalltag empfehlen sich etablierte Plattformen mit Backup-Funktionen und Datenschutz-Compliance.*
