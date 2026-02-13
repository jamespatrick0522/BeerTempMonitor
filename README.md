# BeerTempMonitor (React Native + Expo)

## Highlights

- Expo + TypeScript setup for fast iteration and real-device testing
- Real-time dashboard feel via polling with **@tanstack/react-query**
- Single-call refresh strategy: UI polls `GET /beers` (avoids N-per-item requests)
- Dark theme UI aligned with the provided mock (mini-header, container cards, FAB +)
- Simple, scalable structure: `core/api`, `app/screens`, `ui/components`

## Running locally

1. `cp .env.example .env`
2. Update `.env` with your laptop LAN IP (important for real phone):
   - `EXPO_PUBLIC_API_BASE_URL=http://192.168.1.23:3000`
3. `pnpm i`
4. `pnpm start`
5. Open **Expo Go** on your phone and scan the QR code

> Note: If using a physical phone, `localhost` will not work. Your phone must reach the backend via your laptop’s LAN IP.

## Screens / Navigation

- **Home** (Beer Containers dashboard)
- **Add Beer** (stack screen opened from floating + button)
- Tabs include placeholders (Orders / Deliveries / Settings) to match the mock layout

## API Integration

- GET `/beers?refresh=always|throttle|false`  
  Used by the dashboard for polling (default: `always` for demo)
- POST `/beers`  
  Used by Add Beer form

## Behavior notes (real-time + multiple clients)

The Home screen polls `GET /beers` every few seconds to simulate real-time monitoring (web + mobile friendly).  
Using a **single list endpoint** keeps the app responsive and reduces network overhead compared to polling per item.

When a beer is added, the app calls `POST /beers` then invalidates the `["beers"]` query so the list updates immediately.

## Assumptions / questions (with answers)

- Polling is the first version of “real-time” that works across mobile + web.
- The backend provides `inRange` or enough data (min/max + temperature) for the UI to display range status.
- Temperature trends chart is **out of scope** per exam; UI can show a placeholder section only.
- Images are provided as **URLs** for now (upload/picker can be added later).
- No authentication required for this spike (internal tool).

## Next improvements

- Pause polling when app is backgrounded (battery + performance).
- Add retry/backoff strategy for transient network failures.
- Add skeleton loaders and richer empty/error UI states.
- Add stronger TypeScript typing for navigation routes and API responses.
- Add image picker/upload support (instead of URL-only).
- Add a Beer detail screen and integrate history once backend exposes it (future).
- Add tests for UI logic (in-range/out-of-range rendering) and API error handling.
