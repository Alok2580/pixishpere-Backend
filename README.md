# Pixisphere Backend

Pixisphere Backend is a modular Node.js backend for an AI-powered photography service marketplace. It connects clients with verified photographers and studios across India while providing role-based access, smart lead distribution, and comprehensive administration tools.

## Features

- **Role-Based Authentication & Access Control**: JWT-based auth with roles (_client_, _partner_, _admin_)
- **Multi-Role User Management**: Supports signup/login using email/password with OTP (mocked)
- **Partner Onboarding & Verification Workflow**: Partners can submit personal details, service information, document metadata, and sample portfolios; admins can review and update their status (pending, verified, rejected)
- **Inquiry / Lead Management**: Clients submit service inquiries; leads are matched and distributed to relevant partners
- **Portfolio Management**: Partners can add/edit/delete portfolio entries with descriptions and ordering
- **Admin Moderation & KPIs**: APIs for viewing high-level KPIs, moderating reviews, and managing categories/locations
- **Relational & Non-Relational Data Storage**: MongoDB for non-relational data and PostgreSQL for relational modules
- **Bonus Features** (optional): Rate Limiting, Logging Middleware, Swagger/OpenAPI documentation, Dockerized environment, and Jest tests

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: 
  - MongoDB (via Mongoose)
  - PostgreSQL (via pg)
- **Authentication**: JWT

## Folder Structure

```plaintext
pixisphere-backend/
├── backend/
│   ├── config/
│   │   └── [db.js](http://_vscodecontentref_/0)
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   └── .env
├── package.json
└── README.md
```