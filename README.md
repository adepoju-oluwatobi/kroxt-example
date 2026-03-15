# Kroxt Clean Architecture Example

This is a clean, production-ready example of how to integrate `kroxt` into a Node.js/Express application using a Service-Controller-Route architecture.

## Features
- **Clean Structure**: Separation of concerns between routing, request handling, and business logic.
- **Full Auth Flow**: Register, Login, Refresh Token rotation.
- **Extensible Users**: Demonstrates how to add extra fields to the user model effortlessly.
- **Secure by Default**: Cookie-based refresh tokens and timing-attack protection.

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment**:
   Copy `.env.example` to `.env` and fill in your secrets.
   ```bash
   cp .env.example .env
   ```

3. **Run in Development**:
   ```bash
   npm run dev
   ```

## Folder Structure
```text
src/
├── config/       # Kroxt & Adapter initialization
├── controllers/  # Request handling logic
├── models/       # Mongoose data schemas
├── routes/       # API route definitions
├── services/     # Business logic (Kroxt wrappers)
└── index.ts      # App entry point
```
