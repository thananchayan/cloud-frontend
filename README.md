# CricTicketHub Frontend 🎟️

This is the React.js based frontend for the **CricTicketHub** project.

## 🚀 Features
- Admin and user dashboards
- User registration and login (JWT authentication)
- Admin controls for managing matches and tickets
- Browse matches and available tickets
- Book tickets via API Gateway
- Integrated with backend microservices
- Dockerized for easy deployment

## 🛠️ Tech Stack
- React.js
- Bootstrap
- Axios (API calls)
- React Router
- Docker

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/thananchayan/cloud-frontend.git
cd cloud-frontend

# Install dependencies
npm install

# Run development server
npm run start
```

Frontend runs by default on [http://localhost:3000](http://localhost:3000).

## 📂 Project Structure

```
frontend/
 ├── src/
 │   ├── components/      # Reusable UI components
 │   ├── pages/           # Login, Signup, Dashboard, etc.
 │   ├── App.jsx          # Root app
 │   └── main.jsx         # Entry point
 ├── public/
 ├── Dockerfile
 ├── package.json
 └── README.md
```

