# Travel Route Planner

A client-side web application that plans travel routes between cities across five European countries. The app determines the correct mode of transport based on a set of predefined rules — bus for domestic travel and plane for international travel between capital cities.

---

## About the Project

This project simulates a basic travel routing system. A user selects an origin country and city, then a destination country and city. The application then calculates the best route and displays each leg of the journey with the appropriate transport mode.

The logic is built around two core rules:

- If you are travelling **within the same country**, you take the **bus**.
- If you are travelling **between different countries**, you fly **by plane** — but only between capital cities. If your origin or destination is not a capital, the app adds a bus leg to or from the nearest capital automatically.

---

## Countries and Cities

| Country | Capital | Other Cities |
|---------|---------|--------------|
| Ireland | Dublin | Cork, Galway, Limerick, Waterford |
| England | London | Manchester, Birmingham, Liverpool, Leeds |
| Spain | Madrid | Barcelona, Seville, Valencia, Bilbao |
| France | Paris | Lyon, Marseille, Bordeaux, Nice |
| Germany | Berlin | Munich, Hamburg, Frankfurt, Cologne |

---

## Travel Rules

| Scenario | Transport |
|----------|-----------|
| City to city, same country | Bus |
| Capital to capital, different countries | Plane |
| Non-capital to different country | Bus to home capital → Plane to destination capital |
| Arriving at non-capital in different country | Plane to destination capital → Bus to final city |
| Non-capital to non-capital, different countries | Bus → Plane → Bus |

---

## Technologies Used

- **HTML5** — page structure and markup
- **CSS3** — custom styles and responsive layout rules
- **JavaScript (ES5)** — routing logic, DOM manipulation, dynamic dropdowns
- **Bootstrap 5** — responsive grid system, UI components (cards, badges, alerts, tables)
- **Bootstrap Icons** — icon library used throughout the interface

No build tools, frameworks, or package managers are required. The project runs entirely in the browser.

---

## Project Structure

```
travel-planner/
├── travel-planner.html   # Main HTML file
├── css/
│   └── style.css         # Custom styles
├── js/
│   └── app.js            # Application logic and routing rules
└── README.md             # Project documentation
```

---

## Requirements

- A modern web browser (Chrome, Firefox, Edge, Safari)
- An active internet connection (to load Bootstrap 5 and Bootstrap Icons from CDN)

No installation, no dependencies to install, no server required.

---

## How to Run

1. Clone or download the repository
2. Open `travel-planner.html` directly in your browser
3. Select an origin country and city
4. Select a destination country and city
5. Click **Plan My Route** to see the route and transport breakdown

```bash
# If you have cloned the repo
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
open travel-planner.html   # macOS
start travel-planner.html  # Windows
```

> No `npm install`, no local server, no configuration needed.

---

## How It Works

The routing logic in `js/app.js` follows these steps:

1. Check if origin and destination are in the **same country**
   - If yes → single Bus leg, done
2. If **different countries**:
   - If origin is not the capital → add a Bus leg from origin to home capital
   - Add a Plane leg from home capital to destination capital
   - If destination is not the capital → add a Bus leg from destination capital to final city
