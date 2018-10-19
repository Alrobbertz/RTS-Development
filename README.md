# RTS Development and Testing

### Version
0.0.0

## To Develop New Features

1. Clone the repo && cd into it. 

2. Install Server-Side Dependencies
```bash
npm install
```

3. Install Angular Dependencies

```bash
cd angular-src/
npm install
```

4. Make Sure the App is in 'DEV' mode

a. change 'const PRODUCTION' to false in /app.js

b. change 'production' to false in /angular-src/src/services/data.service.ts

c. change 'production' to false in /angular-src/src/services/auth.service.ts


5. Run The Application

```bash
npm run dev
```