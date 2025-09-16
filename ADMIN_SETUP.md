# Admin Panel Setup Guide

## Overview
This admin panel provides a secure interface for managing travel bookings, packages, and special offers. Access is restricted with a code-based authentication system.

## Features
- **Secure Authentication**: Code-based access (nisa@4)
- **Booking Management**: View and manage customer booking submissions
- **Package Management**: Add, edit, and delete travel packages with image uploads
- **Offer Management**: Create and manage special offers and promotions
- **Real-time Data**: Firebase Realtime Database integration
- **Image Storage**: Cloudinary integration for image uploads

## Setup Instructions

### 1. Firebase Configuration
The Firebase configuration is already set up in `src/lib/firebase.ts`. Make sure your Firebase project has:
- Realtime Database enabled
- Appropriate security rules set up

### 2. Cloudinary Setup
1. Create a Cloudinary account at https://cloudinary.com
2. Get your cloud name, API key, and API secret
3. Create an upload preset (unsigned)
4. Update the environment variables in `.env.local`:

```env
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_API_KEY=your-api-key
VITE_CLOUDINARY_API_SECRET=your-api-secret
VITE_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
```

### 3. Environment Variables
Create a `.env.local` file in the root directory with your Cloudinary credentials:

```env
# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_API_KEY=your-api-key
VITE_CLOUDINARY_API_SECRET=your-api-secret
VITE_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
```

### 4. Access the Admin Panel
1. Navigate to `/admin` in your application
2. Enter the admin code: `nisa@4`
3. You'll be redirected to the admin dashboard

## Admin Panel Sections

### Bookings
- View all customer booking submissions
- See booking details (destination, date, travelers, status)
- Update booking status (confirm/cancel)
- Track booking statistics

### Packages
- Add new travel packages with images
- Edit existing packages
- Delete packages
- Upload images via Cloudinary
- Manage package highlights and details

### Offers
- Create special offers and promotions
- Set original and discounted prices
- Upload offer images
- Set validity dates
- Manage offer highlights

## Security Features
- Code-based authentication
- Session-based access control
- Secure image uploads
- Input validation and sanitization

## File Structure
```
src/
├── components/
│   ├── AdminAuth.tsx          # Authentication component
│   ├── AdminDashboard.tsx     # Main dashboard
│   ├── AdminBookings.tsx      # Booking management
│   ├── AdminPackages.tsx      # Package management
│   └── AdminOffers.tsx        # Offer management
├── lib/
│   ├── firebase.ts            # Firebase configuration
│   └── cloudinary.ts          # Cloudinary configuration
└── pages/
    └── Admin.tsx              # Admin page route
```

## Usage Tips
1. **Image Uploads**: Use high-quality images (recommended: 800x600px or larger)
2. **Package Highlights**: Keep highlights concise and engaging
3. **Offer Validity**: Set realistic validity dates for offers
4. **Booking Management**: Regularly check and update booking statuses

## Troubleshooting
- If images don't upload, check your Cloudinary configuration
- If data doesn't load, verify Firebase connection
- Clear browser cache if authentication issues occur
- Check browser console for error messages

## Security Notes
- The admin code should be changed in production
- Consider implementing additional security measures
- Regularly backup your Firebase data
- Monitor admin access logs 