# NASA Explorer v2

A full-stack app for exploring NASA data: Mars weather, APOD, Earth events, and space weather.

## File Structure
```
├── frontend/   # React app
├── backend/    # Node.js/Express API
└── README.md
```

## Prerequisites
- Node.js 18+
- npm 9+
- Git

## Setup
Clone and install:
```bash
git clone https://github.com/tolgabp/lastProject.git
cd nasa-explorer-v2
cd backend && npm install
cd ../frontend && npm install
```

### Environment Variables
- Copy `backend/env.example` to `backend/.env` and fill in your NASA API key.
- In `frontend`, create `.env` with:
  - `REACT_APP_BACKEND_URL=http://localhost:3001`
  - `REACT_APP_OPENWEATHERMAP_API_KEY=your_key` (optional)

## Start
**Dev:**
```bash
cd backend && npm run dev
# In another terminal:
cd frontend && npm start
```
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

**Production:**
```bash
cd frontend && npm run build
cd ../backend && npm start
```

## Usage
- Visit http://localhost:3000
- Navigate via the top menu:
  - Mars Weather: Real-time and historical Mars data
  - APOD: Astronomy Picture of the Day
  - Earth Events: Filter and view natural events
  - Space Weather: Solar activity and stats

## Deployment (Heroku)
- Set up Heroku app and config vars (`NASA_API_KEY`, etc.)
- Push to Heroku: `git push heroku main`

## Testing
- Backend: `cd backend && npm test`
- Frontend: `cd frontend && npm test`

## License
ISC 