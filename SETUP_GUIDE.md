# Global Parcel Delivery - Setup Guide

This guide will help you set up and run the Global Parcel Delivery full-stack website.

## 📋 Prerequisites

Before you begin, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [Git](https://git-scm.com/) (optional, for version control)
- A web browser (Chrome, Firefox, Edge, etc.)

## 🚀 Step-by-Step Setup

### Step 1: MongoDB Atlas Setup (Cloud Database)

1. **Create MongoDB Atlas Account**
   - Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Click "Try Free" and create an account
   - Verify your email address

2. **Create a Cluster**
   - After logging in, click "Build a Database"
   - Select the **FREE** tier (M0 Sandbox)
   - Choose a cloud provider (AWS/Google Cloud/Azure) and region closest to you
   - Keep the default cluster name or change it
   - Click "Create Cluster" (it takes 3-5 minutes to deploy)

3. **Create Database User**
   - In the left sidebar, click "Database Access"
   - Click "Add New Database User"
   - Choose "Password" as authentication method
   - Enter a username (e.g., `gpdadmin`)
   - Click "Autogenerate Secure Password" (save this password!)
   - Set "Database User Privileges" to "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Address**
   - In the left sidebar, click "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Or enter your specific IP address for better security
   - Click "Confirm"

5. **Get Connection String**
   - Go back to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Select "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:<password>@cluster0...`)
   - **Important:** Replace `<password>` with the password you saved earlier
   - **Important:** Replace `username` with your database username

   Example connection string:
   ```
   mongodb+srv://gpdadmin:YourSecurePassword123@cluster0.abc123.mongodb.net/globaldelivery?retryWrites=true&w=majority
   ```

### Step 2: Install Dependencies

1. **Open Command Prompt/Terminal**
   - Press `Win + R`, type `cmd`, and press Enter
   - Navigate to the project folder:
   ```bash
   cd C:\Users\Iqbal\Desktop\GlobalDelivery
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

   This will install dependencies for:
   - Root project
   - Server (backend)
   - Client (frontend)

   Wait for the installation to complete (may take 2-5 minutes)

### Step 3: Configure Environment Variables

1. **Update Server Environment Variables**
   - Open `server\.env` in a text editor (Notepad, VS Code, etc.)
   - Replace the MongoDB URI with your connection string from Step 1:
   ```
   MONGODB_URI=mongodb+srv://gpdadmin:YourSecurePassword123@cluster0.abc123.mongodb.net/globaldelivery?retryWrites=true&w=majority
   ```
   - Change the JWT_SECRET to a random string (at least 32 characters):
   ```
   JWT_SECRET=my_super_secret_key_for_jwt_tokens_12345678
   ```
   - Save the file

2. **Update Client Environment Variables**
   - Open `client\.env` in a text editor
   - The default values should work for local development
   - Save the file

### Step 4: Run the Application

You have two options to run the application:

**Option 1: Run Both Servers Together (Recommended)**
```bash
npm run dev
```

**Option 2: Run Servers Separately**

Open TWO command prompt windows:

Window 1 - Backend:
```bash
cd C:\Users\Iqbal\Desktop\GlobalDelivery
npm run server
```

Window 2 - Frontend:
```bash
cd C:\Users\Iqbal\Desktop\GlobalDelivery
npm run client
```

### Step 5: Access the Application

Once the servers are running, you should see:
- ✅ Backend running on: http://localhost:5000
- ✅ Frontend running on: http://localhost:5173

Open your browser and go to: **http://localhost:5173**

## 🔐 Create Admin Account

To access the admin dashboard, you need to create an admin account first.

### Using Postman or Thunder Client (Recommended)

1. Download [Postman](https://www.postman.com/downloads/) or use Thunder Client in VS Code
2. Create a POST request to: `http://localhost:5000/api/auth/register`
3. Set the body to JSON:
```json
{
  "username": "admin",
  "email": "admin@globalparcel.com",
  "password": "Admin@123",
  "role": "admin"
}
```
4. Send the request
5. You should receive a success response with a token

### Using cURL (Command Line)

```bash
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin\",\"email\":\"admin@globalparcel.com\",\"password\":\"Admin@123\",\"role\":\"admin\"}"
```

### Login to Admin Dashboard

1. Go to http://localhost:5173/admin/login
2. Enter your credentials:
   - Email: `admin@globalparcel.com`
   - Password: `Admin@123`
3. Click "Login"
4. You'll be redirected to the admin dashboard

## 📱 Testing the Website

### Public Pages
- **Home**: http://localhost:5173/
- **Services**: http://localhost:5173/services
- **Tracking**: http://localhost:5173/tracking
- **Booking**: http://localhost:5173/booking
- **Contact**: http://localhost:5173/contact
- **About**: http://localhost:5173/about

### Admin Pages (Login Required)
- **Admin Login**: http://localhost:5173/admin/login
- **Dashboard**: http://localhost:5173/admin/dashboard
- **Manage Bookings**: http://localhost:5173/admin/bookings
- **Manage Tracking**: http://localhost:5173/admin/tracking

## 🧪 Testing Workflow

1. **Create a Booking**
   - Go to Booking page
   - Fill out the form with test data
   - Submit the booking
   - You should see a success message

2. **View Booking in Admin**
   - Login to admin dashboard
   - Go to "Manage Bookings"
   - You should see your test booking
   - Change its status to "Confirmed"

3. **Create Tracking**
   - In admin dashboard, go to "Manage Tracking"
   - Click "Create New Tracking"
   - Fill in the details (you can link it to your booking)
   - Submit to create tracking

4. **Track Shipment**
   - Go to the Tracking page
   - Enter the tracking number you just created
   - You should see the tracking information

5. **Update Tracking**
   - Go back to admin "Manage Tracking"
   - Click "Update" on your tracking
   - Add a new status update
   - Check the public tracking page to see the update

## 🔧 Troubleshooting

### MongoDB Connection Error
- **Error**: "MongooseError: Operation `users.findOne()` buffering timed out"
- **Solution**:
  - Check your MongoDB connection string in `server\.env`
  - Make sure you replaced `<password>` with your actual password
  - Verify your IP address is whitelisted in MongoDB Atlas Network Access

### Port Already in Use
- **Error**: "EADDRINUSE: address already in use :::5000"
- **Solution**:
  - Close any other applications using port 5000 or 5173
  - Or change the PORT in `server\.env` to a different number (e.g., 5001)

### Dependencies Not Installing
- **Error**: "npm ERR! code ENOENT"
- **Solution**:
  - Make sure you're in the correct directory
  - Try deleting `node_modules` folders and running `npm run install-all` again
  - Make sure Node.js is properly installed: `node --version`

### Cannot Access Admin Dashboard
- **Error**: Redirected to login page
- **Solution**:
  - Make sure you created an admin account first (see Step 5 above)
  - Check that your login credentials are correct
  - Clear browser cache and cookies

## 💡 Next Steps

### Optional: Razorpay Payment Integration
1. Sign up at [https://razorpay.com/](https://razorpay.com/)
2. Get your API Key ID and Secret
3. Update `server\.env`:
   ```
   RAZORPAY_KEY_ID=your_key_id_here
   RAZORPAY_KEY_SECRET=your_secret_here
   ```
4. Update `client\.env`:
   ```
   VITE_RAZORPAY_KEY_ID=your_key_id_here
   ```

### Deployment
For production deployment, consider:
- **Frontend**: Vercel, Netlify, or GitHub Pages
- **Backend**: Render, Railway, or Heroku
- **Database**: MongoDB Atlas (already cloud-based)

## 📞 Need Help?

If you encounter any issues:
1. Check the console/terminal for error messages
2. Verify all environment variables are set correctly
3. Make sure MongoDB Atlas is properly configured
4. Ensure all dependencies are installed

For development questions, refer to:
- React: https://react.dev/
- Express: https://expressjs.com/
- MongoDB: https://docs.mongodb.com/
- Tailwind CSS: https://tailwindcss.com/docs

## ✨ Features Implemented

✅ Responsive design (mobile, tablet, desktop)
✅ Real-time shipment tracking
✅ Online booking system
✅ Admin dashboard with statistics
✅ Booking management
✅ Tracking management
✅ Contact form with inquiries
✅ Authentication & authorization
✅ Payment gateway integration (Razorpay)
✅ Beautiful UI with Tailwind CSS
✅ MongoDB Atlas cloud database

Enjoy your Global Parcel Delivery website! 🚚📦
