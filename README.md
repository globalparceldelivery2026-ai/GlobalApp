# Global Parcel Delivery - Full Stack Website

A modern, full-stack web application for Global Parcel Delivery, offering domestic and international courier services across 20+ countries.

## 🚀 Features

- **Shipment Tracking**: Real-time tracking of parcels with detailed status updates
- **Online Booking**: Request quotes and book courier services online
- **Admin Dashboard**: Comprehensive admin panel for managing bookings and tracking
- **Payment Integration**: Secure online payments via Razorpay
- **Responsive Design**: Mobile-first, works seamlessly on all devices
- **Multi-Service**: Support for courier services and movers & packers

## 🛠️ Tech Stack

### Frontend
- React.js with Vite
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls
- Context API for state management

### Backend
- Node.js with Express.js
- MongoDB Atlas (Cloud Database)
- Mongoose ODM
- JWT for authentication
- Razorpay for payment processing
- bcryptjs for password hashing

## 📋 Prerequisites

Before running this project, make sure you have:
- Node.js (v16 or higher)
- MongoDB Atlas account (free tier available)
- Razorpay account (for payment integration)

## 🔧 Installation

### 1. Clone the repository
```bash
cd GlobalDelivery
```

### 2. Set up MongoDB Atlas (Free Cloud Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and log in
3. Click "Build a Database" and select the **FREE tier** (M0)
4. Choose a cloud provider and region (closest to you)
5. Click "Create Cluster"
6. Create a database user:
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Enter a username and strong password (save these!)
   - Set user privileges to "Read and write to any database"
7. Whitelist your IP address:
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Or add your specific IP address
8. Get your connection string:
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Select "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster0...`)

### 3. Install all dependencies
```bash
npm run install-all
```

### 4. Set up environment variables

**Create `server/.env` file:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/globaldelivery?retryWrites=true&w=majority
JWT_SECRET=your_very_secure_secret_key_at_least_32_characters_long
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

**Create `client/.env` file:**
```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

> **Important**: Replace the placeholders in MONGODB_URI with your actual MongoDB Atlas username, password, and cluster URL!

## 🚀 Running the Application

### Development Mode (Both servers simultaneously)
```bash
npm run dev
```

### Or run separately:

**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
npm run client
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 📁 Project Structure

```
GlobalDelivery/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── context/        # React context
│   │   └── utils/          # Utility functions
│   └── package.json
├── server/                 # Express backend
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Custom middleware
│   ├── config/             # Configuration
│   └── package.json
└── package.json            # Root package.json
```

## 🔐 Admin Access

To create the first admin user, use the registration endpoint:

```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "username": "admin",
  "email": "admin@globalparcel.com",
  "password": "your_secure_password",
  "role": "admin"
}
```

You can use Postman, Thunder Client, or curl to make this request.

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - Register admin user
- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify JWT token

### Bookings
- `POST /api/bookings` - Create booking (Public)
- `GET /api/bookings` - Get all bookings (Admin)
- `GET /api/bookings/:id` - Get single booking
- `PUT /api/bookings/:id` - Update booking (Admin)
- `DELETE /api/bookings/:id` - Delete booking (Admin)

### Tracking
- `POST /api/tracking` - Create tracking (Admin)
- `GET /api/tracking/:trackingNumber` - Track shipment (Public)
- `PUT /api/tracking/:id/update` - Update tracking (Admin)
- `GET /api/tracking` - Get all tracking (Admin)

### Inquiries
- `POST /api/inquiries` - Submit inquiry (Public)
- `GET /api/inquiries` - Get all inquiries (Admin)
- `PUT /api/inquiries/:id` - Update inquiry (Admin)

### Payments
- `POST /api/payment/create-order` - Create payment order
- `POST /api/payment/verify` - Verify payment

## 🌍 Countries Served

USA, Canada, Australia, Japan, Malaysia, UK, France, Germany, Belgium, Austria, South Africa, Kenya, Tanzania, Nigeria, Mauritius, UAE, Saudi Arabia, Bahrain, Qatar, Kuwait

## 📞 Contact Information

**Address**: Fakira Market, Opp. Jama Masjid, Sector-15, Nerul, Navi Mumbai - 400706

**Phone**: 8591640143, 7506469492

**Website**: www.globalparceldelivery.in

## 🔮 Future Enhancements

- Email notifications
- SMS alerts
- Multi-language support
- Customer dashboard
- Invoice generation
- Real-time chat support
- Integration with shipping carrier APIs

## 🛠️ Troubleshooting

### MongoDB Connection Issues
- Verify your MongoDB Atlas connection string is correct
- Ensure your IP address is whitelisted in Network Access
- Check that your database user credentials are correct
- Make sure you replaced `<password>` in the connection string

### Port Already in Use
If port 5000 or 5173 is already in use, change the PORT in server/.env

## 📄 License

ISC License

## 👨‍💻 Support

For support, email support@globalparceldelivery.in or call our helpline.
