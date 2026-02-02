# Meeting Room Booking System - Mobile App

A modern React Native mobile application for booking meeting rooms with Material Design 3 styling, built with Expo and TypeScript.

## Features

### Core Functionality
- **User Authentication**: Login and registration with role-based access (User/Admin)
- **Room Booking**: Create, view, edit, and cancel meeting room bookings
- **Admin Approval**: Admins can approve or reject pending bookings
- **Multi-Photo Gallery**: Swipeable room image gallery with fullscreen preview
- **Real-time Updates**: Pull-to-refresh and automatic data synchronization

### UI/UX Features
- **Material Design 3**: Modern, clean SaaS aesthetic following Google's Material 3 guidelines
- **Dark Mode Support**: Automatic theme switching based on system preferences
- **Responsive Design**: Optimized for phones and tablets with adaptive layouts
- **Smooth Animations**: Native-feeling transitions and micro-interactions
- **Haptic Feedback**: Tactile feedback for user interactions

### Technical Features
- **TypeScript**: Full type safety across the application
- **React Query**: Efficient data fetching, caching, and synchronization
- **Zustand**: Lightweight state management
- **React Navigation**: Role-based routing with bottom tabs and stack navigation
- **React Native Paper**: Material Design components and theming

## Tech Stack

### Core
- **React Native (Expo)**: Cross-platform mobile development
- **TypeScript**: Type-safe development
- **React Navigation**: Navigation and routing
- **React Query**: Data fetching and state management
- **Zustand**: Global state management

### UI/Styling
- **React Native Paper**: Material Design 3 components
- **NativeWind**: Tailwind CSS for React Native
- **Expo Vector Icons**: Icon library

### Utilities
- **date-fns**: Date manipulation and formatting
- **axios**: HTTP client for API communication
- **AsyncStorage**: Local data persistence

## Project Structure

```
booking-meeting-room-mobile/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── StatusBadge.tsx
│   │   ├── PrimaryButton.tsx
│   │   ├── InputField.tsx
│   │   ├── ProfileHeader.tsx
│   │   ├── AppHeader.tsx
│   │   ├── RoomGallery.tsx
│   │   └── BookingCard.tsx
│   ├── screens/             # Screen components
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   └── RegisterScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── MyBookingsScreen.tsx
│   │   ├── AdminScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── BookingDetailScreen.tsx
│   │   ├── CreateBookingScreen.tsx
│   │   ├── EditBookingScreen.tsx
│   │   └── AdminApprovalScreen.tsx
│   ├── navigation/          # Navigation configuration
│   │   ├── types.ts
│   │   ├── AppNavigator.tsx
│   │   └── index.ts
│   ├── services/            # API services
│   │   ├── api.ts
│   │   ├── authService.ts
│   │   ├── bookingService.ts
│   │   ├── roomService.ts
│   │   └── index.ts
│   ├── store/               # State management
│   │   ├── authStore.ts
│   │   ├── bookingStore.ts
│   │   └── index.ts
│   ├── hooks/               # Custom React Query hooks
│   │   ├── useAuth.ts
│   │   ├── useBookings.ts
│   │   ├── useRooms.ts
│   │   └── index.ts
│   ├── theme/               # Theme configuration
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   └── index.ts
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   └── utils/               # Utility functions
│       ├── dateUtils.ts
│       ├── validation.ts
│       └── index.ts
├── App.tsx                # Main app component
├── package.json
├── tsconfig.json
├── app.json
├── babel.config.js
├── tailwind.config.js
└── .env.example
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Emulator

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd booking-meeting-room-mobile
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

Edit `.env` and configure your API endpoint:
```
EXPO_PUBLIC_API_URL=https://your-api-url.com/api
EXPO_PUBLIC_API_KEY=your-api-key-here
```

4. Start the development server
```bash
npm start
```

5. Run on device/simulator
```bash
# iOS
npm run ios

# Android
npm run android
```

## API Integration

The app expects a REST API with the following endpoints:

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Bookings
- `GET /bookings` - Get all bookings (admin)
- `GET /bookings/my` - Get user's bookings
- `GET /bookings/:id` - Get booking details
- `POST /bookings` - Create booking
- `PUT /bookings/:id` - Update booking
- `POST /bookings/:id/cancel` - Cancel booking
- `POST /bookings/:id/approve` - Approve booking (admin)
- `POST /bookings/:id/reject` - Reject booking (admin)

### Rooms
- `GET /rooms` - Get all rooms
- `GET /rooms/:id` - Get room details
- `POST /rooms` - Create room (admin)
- `PUT /rooms/:id` - Update room (admin)
- `DELETE /rooms/:id` - Delete room (admin)
- `POST /rooms/:id/images` - Upload room images (admin)
- `DELETE /rooms/:id/images/:imageId` - Delete room image (admin)

## Component Documentation

### StatusBadge
Displays booking status with appropriate color coding.

```tsx
<StatusBadge status="pending" size="medium" />
```

### BookingCard
Card component displaying booking information with optional actions.

```tsx
<BookingCard
  booking={booking}
  onPress={() => {}}
  showActions={true}
  onCancel={() => {}}
  onEdit={() => {}}
/>
```

### RoomGallery
Horizontal swipeable gallery with fullscreen preview.

```tsx
<RoomGallery
  images={roomImages}
  editable={true}
  onImagePress={(index) => {}}
  onDeleteImage={(index) => {}}
  onAddImage={() => {}}
/>
```

## State Management

### Auth Store
Manages authentication state using Zustand with persistence.

```typescript
const { user, isAuthenticated, setAuth, logout } = useAuthStore();
```

### Booking Store
Manages booking form state.

```typescript
const {
  selectedRoom,
  selectedDate,
  selectedStartTime,
  selectedEndTime,
  bookingTitle,
  bookingDescription,
  setSelectedRoom,
  setSelectedDate,
  resetBookingForm
} = useBookingStore();
```

## Performance Optimizations

- **FlatList Virtualization**: Efficient rendering of long lists
- **Image Caching**: Fast Image component with built-in caching
- **Query Caching**: React Query automatic caching and deduplication
- **Debounced Search**: Reduced API calls for search functionality
- **Lazy Loading**: Components loaded on-demand
- **Skeleton Loaders**: Improved perceived performance

## Styling Guidelines

### Material Design 3
- Use MD3 color tokens
- Rounded corners (12-16dp)
- Soft elevation (shadow-sm to shadow-lg)
- No thick borders
- Surface-based backgrounds

### Responsive Breakpoints
- Small phones: < 375px
- Large phones: 375px - 768px
- Tablets: > 768px

## Testing

```bash
# Run tests
npm test

# Run linter
npm run lint
```

## Building for Production

```bash
# iOS
eas build --platform ios

# Android
eas build --platform android
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linter
4. Submit a pull request

## License

MIT License - see LICENSE file for details
