# Villager Milk 🥛

A modern milk delivery mobile application built with React Native and Expo. Connect local farmers directly with consumers for fresh, organic milk delivery services.

## 🌟 Features

- **Fresh Milk Products**: Browse and order various milk types (Cow, Buffalo, Goat) in different volumes
- **Subscription Services**: Daily, weekly, and monthly milk delivery subscriptions with special discounts
- **Smart Search**: Find your favorite milk products quickly
- **Cart Management**: Add products and subscriptions to cart with quantity controls
- **Secure Checkout**: Multiple payment options including Cash on Delivery (COD) and UPI
- **Address Management**: Save and manage delivery addresses
- **Order Tracking**: View order history and current deliveries
- **Location-Based**: Currently serving Nashik region

## 🏗️ Architecture

This is a React Native mobile application built with Expo:

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Navigation**: Expo Router with file-based routing
- **State Management**: React Context API

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Expo CLI (`npm install -g @expo/cli`)

### Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npx expo start
   ```

3. **Run on Device/Emulator**
   - **Android**: `npm run android`
   - **iOS**: `npm run ios` (macOS only)
   - **Web**: `npm run web`

## � Project Structure

```
villager-milk/
├── app/                    # Expo Router app directory
│   ├── _layout.tsx         # Root layout
│   ├── (tabs)/            # Main tab navigation
│   │   ├── _layout.tsx    # Tab layout
│   │   ├── home.tsx       # Home screen
│   │   ├── order/index.tsx # Order history
│   │   ├── profile/index.tsx # User profile
│   │   └── subscription/index.tsx # Subscription management
│   ├── address/index.tsx   # Address management
│   ├── auth/login.tsx      # Authentication
│   ├── checkout/index.tsx  # Checkout process
│   ├── payment/index.tsx   # Payment screens
│   ├── product/[id].tsx    # Product details
│   └── subscribe/index.tsx # Subscription setup
├── components/             # Reusable UI components
├── context/                # React Context providers
├── hooks/                  # Custom React hooks
├── lib/                    # Utility libraries
├── services/               # API services
├── types/                  # TypeScript type definitions
├── assets/                 # Images, icons, fonts
├── Data/                   # Static data files
├── app.json                # Expo configuration
├── package.json            # Node.js dependencies
└── README.md               
```

## 🛠️ Tech Stack

### Frontend
- React Native 0.81.5
- React 19.1.0
- Expo SDK 54
- TypeScript 5.9
- NativeWind 4.2.1
- Expo Router 6.0
- React Navigation 7.x

 
## 📦 Key Dependencies

### Frontend
- `@expo/vector-icons` - Icon library
- `lucide-react-native` - Modern icons
- `react-native-gesture-handler` - Gesture handling
- `react-native-reanimated` - Animations
- `react-native-safe-area-context` - Safe area handling



## 🔧 Development

### Code Quality
```bash
# Lint code
npm run lint
```

### Build Commands
```bash
# Build frontend for production
npx expo build:android
npx expo build:ios
```
 
### 🌍 Environment

- **Target Platforms**: iOS, Android, Web
- **Minimum iOS Version**: 13.0
- **Minimum Android API**: 21
- **Service Area**: Nashik, Maharashtra (expandable)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Support

For support, email support@villagermilk.com or join our Discord community.

## 🙏 Acknowledgments

- Built with ❤️ for local farmers and fresh milk lovers
- Special thanks to the React Native and Expo communities
