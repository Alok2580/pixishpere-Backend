# Pixisphere Backend

Pixisphere is a full-stack AI-powered photography service marketplace that connects clients with verified photographers and studios across India. This backend implementation provides a modular and role-based architecture to support various functionalities of the platform.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

- Node.js
- Express.js
- MongoDB
- PostgreSQL
- JWT for authentication
- Docker (optional)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/pixisphere-backend.git
   cd pixisphere-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your environment variables in the `.env` file. You can use the `.env.example` as a reference.

4. Start the server:
   ```
   npm run start
   ```

## Environment Variables

- `MONGODB_URI`: Connection string for MongoDB.
- `POSTGRES_URI`: Connection string for PostgreSQL.
- `JWT_SECRET`: Secret key for JWT signing.
- `PORT`: Port number for the server (default is 5000).

## API Endpoints

### Authentication
- `POST /api/auth/signup`: Register a new user (client, partner, admin).
- `POST /api/auth/login`: Login and return JWT.

### Inquiry Management
- `POST /api/inquiry`: Submit a new service inquiry.
- `GET /api/partner/leads`: Fetch assigned leads for partners.

### Partner Management
- `POST /api/partner/portfolio`: Add a portfolio entry.
- `GET /api/admin/verifications`: View pending partner verifications.
- `PUT /api/admin/verify/:id`: Approve or reject partner verification.

### Admin Operations
- `GET /api/admin/stats`: Fetch high-level KPIs.

## Usage

After starting the server, you can use tools like Postman or curl to interact with the API endpoints. Make sure to include the JWT token in the Authorization header for protected routes.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.