
# 🌍 Wanderly — Travel Destination Explorer

**Discover places. Collect experiences.**

Wanderly is a full-stack travel destination discovery platform that helps users explore destinations, discover new places, and save their favorite travel spots.

🔗 **Live Demo:** [Wanderly](https://wanderly-client-gules.vercel.app/)

## ✨ Features

- 🌎 Explore destinations with detailed information.
- 🔍 Search and filter destinations by location, category, and budget.
- 🔐 Secure authentication using JWT.
- 📧 Email verification using OTP.
- 🔑 Google OAuth login.
- ❤️ Save favorite destinations.
- 📝 Add, update, and manage destination listings.
- 📱 Responsive design for desktop, tablet, and mobile.

## 🛠️ Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Node.js, Express.js, TypeScript, RESTful APIs
- **Database:** PostgreSQL, Prisma ORM
- **Authentication:** JWT, Google OAuth, bcryptjs
- **Services:** Redis, Nodemailer
- **Tools:** Git, GitHub, Vercel

## 📁 Project Structure

```text
wanderly/
├── wanderly-client/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   └── public/
├── wanderly-server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── utils/
│   └── prisma/
└── README.md
```

## 🔒 Security

- Password hashing with bcryptjs.
- JWT-based authentication.
- HTTP-only cookies for token storage.
- Email OTP verification.
- Protected API endpoints and authorization checks.

## 🌐 Live Demo

[https://wanderly-client-gules.vercel.app/](https://wanderly-client-gules.vercel.app/)

## 👨‍💻 Author

**Saifur R. Asif**

- GitHub: [asifforizy](https://github.com/asifforizy)
- Portfolio: [asifforizy.netlify.app](https://asifforizy.netlify.app/)

---

## ⚙️ How to Install and Run Locally

Follow these steps to run Wanderly on your local machine.

### Prerequisites

Install the following:

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/installation)
- [PostgreSQL](https://www.postgresql.org/)
- Redis, if required by the OTP implementation.

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd wanderly
```

Replace `<your-repository-url>` with your actual GitHub repository URL.

### 2. Install Dependencies

**Frontend:**

```bash
cd wanderly-client
pnpm install
```

**Backend:** Open another terminal from the repository root.

```bash
cd wanderly-server
pnpm install
```

Adjust the folder names to match your actual project structure.

### 3. Configure Environment Variables

Create a `.env` file in the backend directory.

Example:

```env
DATABASE_URL="your_postgresql_connection_string"
JWT_ACCESS_SECRET="your_access_token_secret"
JWT_REFRESH_SECRET="your_refresh_token_secret"
REDIS_URL="your_redis_connection_url"
```

Create a `.env.local` file in the frontend directory.

Example:

```env
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your_google_client_id"
```

Configure any additional variables required by your project, including email credentials and OAuth settings. Use the exact variable names expected by your code.

**Never commit real credentials or secret keys to GitHub.**

### 4. Set Up the Database

From the backend directory, run:

```bash
pnpm exec prisma generate
pnpm exec prisma migrate dev
```

Ensure PostgreSQL is running and your `DATABASE_URL` is correct.

### 5. Start the Backend

From the backend directory:

```bash
pnpm dev
```

### 6. Start the Frontend

Open another terminal and run:

```bash
cd wanderly-client
pnpm dev
```

### 7. Open the Application

Visit:

[http://localhost:3000](http://localhost:3000)

Wanderly should now be running locally.

---

⭐ If you find this project useful, consider giving the repository a star on GitHub!
