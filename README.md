# Event Ticket Selling System

Modern ticket selling application - Built with Vue 3, TailwindCSS, Vue Router, and Vuex.

## 🎯 Features

- **Event Discovery** - Browse upcoming events
- **Ticket Selection** - Choose categories and select seats
- **Secure Payment** - Payment flow with form validation
- **Smart Routing** - Automatic redirection for invalid states
- **Responsive Design** - Works perfectly on all devices

## 🚀 Installation and Running

### Requirements

- Node.js v16 or higher
- npm or yarn

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Start the application (Mock API + Vue App)
npm run dev
```

**Everything starts with a single command!** Thanks to the **concurrently** package, both the mock API server and Vue development server run simultaneously.

It will automatically open in your browser:
- **Vue App**: http://localhost:5173
- **Mock API**: http://localhost:3001

### Alternative: Running in Separate Terminals

```bash
# Terminal 1: Mock API server
npm run mock-server

# Terminal 2: Vue app
npm run dev
```

## 📁 Project Structure

```
src/
├── api/              # HTTP client (Axios)
├── services/         # API service layer
├── composables/      # Reusable business logic
├── utils/            # Helper functions (formatters, validators)
├── components/       # UI components
├── pages/            # Page components
├── router/           # Vue Router configuration
└── store/            # Vuex state management

mock-server/          # Local mock API
├── db.json           # Mock data
└── server.js         # JSON Server config
```

## 🔄 Application Flow

```
1. Home Page (/)
   ↓ Select event
2. Event Detail (/events/:id)
   ↓ Select category
3. Seat Selection (/seat-plan)
   ↓ Select seats
4. Payment (/payment)
   ↓ Make payment
5. Success (/success)
```

## 🏗️ Architecture

### Three-Layer Architecture

```
UI Layer (Components)
    ↓
Business Logic (Composables)
    ↓
Data Layer (Services → API)
```

### Key Features

**Service Layer:**
- `eventsService.js` - Event API calls
- `seatPlanService.js` - Seat plan API calls
- `paymentService.js` - Payment operations

**Composables:**
- `useEvents()` - Event list and detail logic
- `useSeatPlan()` - Seat selection logic
- `usePayment()` - Payment and form validation

**Utils:**
- `formatters.js` - Date, price, seat formatting
- `validators.js` - Form validation rules
- `constants.js` - Application constants

## 📡 API Endpoints

Mock server provides these endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/events` | All events |
| GET | `/events/:id` | Event detail |
| GET | `/seat-plans/:eventId/:categoryId` | Seat plan |
| POST | `/payment` | Payment processing |

## 💾 State Management

**Vuex Store:**
```javascript
{
  selectedEvent: null,      // Selected event
  selectedCategory: null,   // Selected category
  seatPlan: null,          // Available seats
  selectedSeats: [],       // Selected seat IDs
}
```

**Navigation Guards:**
- `/seat-plan` → Event and category must be selected
- `/payment` → Event, category, and at least 1 seat must be selected
- Auto-redirects if information is missing

## 🎨 Technologies Used

| Technology | Version | Purpose |
|-----------|----------|---------|
| Vue 3 | ^3.4 | Framework |
| Vite | ^5.1 | Build tool |
| Vue Router | ^4.3 | Routing |
| Vuex | ^4.1 | State management |
| Axios | ^1.6 | HTTP client |
| TailwindCSS | ^3.4 | Styling |
| JSON Server | ^0.17 | Mock API |
| Concurrently | ^9.2 | Multiple scripts |

## 🔧 Build and Deploy

```bash
# Production build
npm run build

# Production preview
npm run preview
```

**Output:** `dist/` folder

## 💡 Concurrently Usage

This project uses the **concurrently** package to run both the mock API server and Vue development server with a single command:

```json
"dev": "concurrently \"npm:dev:vite\" \"npm:dev:mock\""
```

**Advantages:**
- ✅ Single terminal, single command
- ✅ Both servers start together
- ✅ Colored logs (easy to distinguish)
- ✅ Close both servers with a single keystroke (Ctrl+C)

**Alternative Usage:**
If you prefer to run them in separate terminals:
```bash
npm run mock-server  # Terminal 1
npm run dev      # Terminal 2
```

## 🚀 Performance

- Vue's reactivity system prevents unnecessary renders
- Optimized calculations with computed properties
- Reduced API calls with LocalStorage
- Small bundle size with tree-shaking
