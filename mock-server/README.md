# Mock API Server

Local mock server for development when the production API is down.

## Quick Start

1. Install dependencies (if not already done):
```bash
npm install
```

2. Start the mock server:
```bash
npm run mock-server
```

The mock server will run on `http://localhost:3001`

3. In another terminal, start the Vue app:
```bash
npm run dev
```

## Switching Between Mock and Real API

Edit `src/api/client.js` and change the `baseURL`:

```javascript
// For mock server (local)
baseURL: 'http://localhost:3001',

// For real API (production)
baseURL: 'https://d706d748-0586-4c2b-9d30-288f5d3b0630.mock.pstmn.io',
```

## Available Endpoints

- `GET /events` - List all events
- `GET /events/:id` - Get event details
- `GET /seat-plans/:eventId/:categoryId` - Get seat plan
- `POST /payment` - Process payment

## Mock Data

All mock data is stored in `mock-server/db.json`. You can edit this file to add more events, venues, or seat plans.

### Adding New Events

Edit `db.json` and add events to the `events` array.

### Adding Seat Plans

Seat plans are stored with keys like `"1-1"` (eventId-categoryId). Add new seat plans under the `seat-plans` object.

