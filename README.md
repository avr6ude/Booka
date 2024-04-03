# Booka - Bring back the paperback

Welcome to Booka, an app for tracking the books you've read and managing your reading list on the go. Built with React Native, it's designed to provide a seamless experience across both Android and iOS devices, ensuring you have access to your book list wherever you are.

## Features

- Search for Books: Utilize the Google Books API to find books by title, author, or ISBN.
- Track Reading List: Add books to your personal reading list to keep track of what you've read.
- Manage Your List: Easily remove books from your reading list once you've finished reading them.
- View Book Details: Access detailed information about each book, including author, title, and a brief synopsis.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (LTS version)
- `npm` or `yarn`
- Expo CLI (included with `expo` package)
- Android Studio or Xcode (for emulator/simulator setup)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/avr6ude/Booka.git
cd Booka
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Configure `local.properties` for Android
   Navigate to the android folder in your project and create a file named local.properties. Inside this file, specify the path to your Android SDK like so:

```bash
sdk.dir = /path/to/your/android/sdk
```

For Windows, the path might look like `sdk.dir=C:\\Users\\USERNAME\\AppData\\Local\\Android\\Sdk.`

For Mac, it might be `sdk.dir=/Users/USERNAME/Library/Android/sdk.`

4. IOS Setup (skip if you are on Windows)
   Ensure you have CocoaPods installed, as it is required for iOS dependencies. Navigate to the ios folder and run:

```bash
pod install
```

This will install all necessary dependencies for iOS.

## Running the app

- Start Metro server:

```bash
npm start
# or
yarn start
```

- Run on Android:

```bash
npm run android
# or
yarn android
```

- Run on iOS:

```bash
npm run ios
# or
yarn ios
```

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make to the Booka project are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

# License

This project is licensed under the MIT License - see the `LICENSE` file for details.
