# Villager Milk 🥛

A modern milk delivery mobile application built with React Native (Expo) and Spring Boot backend. Connect local farmers directly with consumers for fresh, organic milk delivery services.

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

This project consists of two main components:

### Frontend (Mobile App)
- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Navigation**: Expo Router with file-based routing
- **State Management**: React Context API

### Backend (API Server)
- **Framework**: Spring Boot 3.5.4
- **Language**: Java 17
- **Database**: MySQL
- **ORM**: Spring Data JPA with Hibernate
- **Build Tool**: Maven

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Java 17
- MySQL Server
- Expo CLI (`npm install -g @expo/cli`)

### Backend Setup

1. **Database Setup**
   ```bash
   # Create MySQL database
   CREATE DATABASE villager;
   ```

2. **Configure Database Connection**
   Update `src/main/resources/application.properties` with your MySQL credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/villager
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

3. **Run Backend**
   ```bash
   # Using Maven Wrapper
   ./mvnw spring-boot:run
   ```

### Frontend Setup

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

## 📱 App Structure

```
app/
├── (tabs)/                 # Main tab navigation
│   ├── _layout.tsx        # Tab layout
│   ├── home.tsx           # Home screen with products
│   ├── order/             # Order history
│   ├── profile/           # User profile
│   └── subscription/      # Subscription management
├── address/               # Address management
├── auth/                  # Authentication screens
├── checkout/              # Checkout process
├── payment/               # Payment screens
└── product/[id].tsx       # Product details
```

## 🛠️ Tech Stack

### Frontend
- React Native 0.81.5
- Expo SDK 54
- TypeScript 5.9
- NativeWind 4.2.1
- Expo Router 6.0
- React Navigation 7.x

### Backend
- Spring Boot 3.5.4
- Spring Data JPA
- MySQL Connector/J
- Maven

## 📦 Key Dependencies

### Frontend
- `@expo/vector-icons` - Icon library
- `lucide-react-native` - Modern icons
- `react-native-gesture-handler` - Gesture handling
- `react-native-reanimated` - Animations
- `react-native-safe-area-context` - Safe area handling

### Backend
- `spring-boot-starter-web` - Web framework
- `spring-boot-starter-data-jpa` - Data persistence
- `mssql-jdbc` - SQL Server driver (configured for MySQL)
- `spring-boot-starter-test` - Testing framework

## 🔧 Development

### Code Quality
```bash
# Lint code
npm run lint
```

### Build Commands
```bash
# Build for production
npx expo build:android
npx expo build:ios
```

### Database Migration
The application uses Hibernate's `ddl-auto=update` for automatic schema updates during development.

## 🌍 Environment

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
- Special thanks to the React Native and Spring Boot communities
