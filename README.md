# Shalev Issachar — Portfolio (Fullstack)

## Setup (local)

1. Install root deps:
   ```
   npm install
   ```

2. Install client deps:
   ```
   cd client
   npm install
   ```

3. Run dev server + client:
   ```
   npm run dev
   ```

Server runs on http://localhost:5000 and client on http://localhost:5173 (proxied for /api).

## Build for production
```
npm run build
npm start
```

Place `public/nature_landing_bg.png` (provided) and `public/your-photo.jpg` (your photo) to customize the site.
