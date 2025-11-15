# 🍅 Rotten Tomato by the Farmers

A modern movie rating and review platform built with Next.js. Browse movies, leave ratings and reviews, manage favorites, and explore a comprehensive admin dashboard.

## ✨ Features

- **Movie Database**: Browse and search movies from TMDB API
- **User Authentication**: Register, login, email verification, and password reset
- **Ratings & Reviews**: Rate movies and leave comments
- **Favorites**: Save your favorite movies
- **Admin Dashboard**: Manage movies, users, and comments
- **Responsive Design**: Works seamlessly on desktop and mobile

## 🛠️ Tech Stack

- **Frontend & Backend**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Authentication**: JWT
- **External API**: The Movie Database (TMDB)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB instance (local or cloud like MongoDB Atlas)
- TMDB API account ([Get one here](https://www.themoviedb.org/settings/api))

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/rotten_tomatoes
# Or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/rotten_tomatoes

# JWT Secret (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here

# API Base URL (for client-side API calls)
NEXT_PUBLIC_API_URL=http://localhost:3000

# TMDB API Credentials (get from https://www.themoviedb.org/settings/api)
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
NEXT_PUBLIC_TMDB_API_TOKEN=your_tmdb_api_token

# Email Configuration (for user verification & password reset)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

**Important Notes:**

- **MongoDB**: Use your own MongoDB URI (local or cloud)
- **TMDB API**: Create a free account at TMDB and get your API key and token
- **Email**: Use Gmail app password (not your regular password) or another SMTP service
- **JWT Secret**: Use a long random string for security

### 3. Start Development Server

```bash
npm run dev
```

The app will run at [http://localhost:3000](http://localhost:3000)

### 4. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
rotten_tomatoes/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (backend)
│   ├── admin/             # Admin dashboard pages
│   ├── auth/              # Authentication pages
│   ├── client/            # Client pages
│   └── favorites/         # Favorites page
├── components/            # Reusable React components
├── lib/                   # Utilities & stores (Zustand)
├── models/                # Mongoose models
├── helpers/               # Helper functions (mailer, etc.)
├── types/                 # TypeScript types
└── public/                # Static assets
```

## 🔗 API Base URL Configuration

**IMPORTANT**: Never hardcode `http://localhost:3000` in your code!

Always use the environment variable:

```typescript
// Correct
const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/movies`);

// Wrong
const response = await axios.get('http://localhost:3000/api/movies');
```

This ensures the app works in all environments (development, staging, production) without code changes.

## 📖 Basic Usage

### For Users:

1. **Register**: Create an account at `/auth/register`
2. **Verify Email**: Check your email and verify your account
3. **Login**: Sign in at `/auth/login`
4. **Browse Movies**: Explore movies on the homepage
5. **Rate & Review**: Click on a movie to leave a rating and comment
6. **Favorites**: Save movies to your favorites list

### For Admins:

1. **Access Dashboard**: Navigate to `/admin`
2. **Manage Movies**: Add, edit, or delete movies
3. **Manage Users**: View and manage user accounts

## 🧹 Linting & Formatting

```bash
# Run ESLint
npm run lint

# Auto-fix linting issues
npm run lint -- --fix
```

## 🐛 Troubleshooting

### Problem: MongoDB connection error

**Solution**:

- Check your `MONGODB_URI` is correct
- Ensure MongoDB is running (if local)
- Whitelist your IP in MongoDB Atlas (if cloud)

### Problem: TMDB API not working

**Solution**:

- Verify your TMDB API key and token are correct
- Check you've accepted the TMDB API terms

### Problem: Email verification not sending

**Solution**:

- For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833)
- Enable "Less secure app access" or use OAuth2

### Problem: Hot reload not working after changes

**Solution**:

- Delete `.next` folder: `rm -rf .next`
- Restart dev server: `npm run dev`

## 🚀 Deployment

### General Steps:

1. **Set Environment Variables** on your hosting platform
2. **Build the project**: `npm run build`
3. **Deploy** the `.next` folder and all dependencies

### Platform-Specific:

- Set all `.env` variables in your platform's dashboard
- Ensure Node.js 18+ is available
- Run `npm install && npm run build`
- Start with `npm start`

**Important**: Always use environment variables, never commit `.env` to Git!

## 📝 License

This project is part of an academic assignment.

## 👨‍💻 Authors

**The Farmers Team** - Epitech Coding Academy Promo 2026

---

**Need help?** Check the troubleshooting section or review the code comments in the source files.
