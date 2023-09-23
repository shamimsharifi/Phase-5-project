# 🌟 Market Place 🌟

## Description

This project is a full-stack application designed to facilitate user interaction through chatting and item listing. It utilizes React for a dynamic and responsive frontend and Flask for a robust and efficient backend.

### Features

- User Authentication: Allows users to sign up, log in, and log out.
- Chatting: Provides users with the ability to chat in real-time.
- Item Listing: Allows users to list items with details buy or sell items.

## Technologies Used

### Frontend

- React: Utilized for building the user interface.
- Bootstrap for React: Used for styling the components.

### Backend

- Python: The main programming language used.
- Flask: A micro web framework written in Python.

## Installation

### Backend

1. **Navigate to the Backend Directory**
   ```sh
   cd server
   ```
2. **Set Up a Virtual Environment**
   ```sh
   pipenv install && pipenv shell
   ```
3. **Activate the Virtual Environment**
   ```sh

   ```
4. **Install the Required Packages**
   ```sh
   pip install -r requirements.txt
   ```
5. **Run the Flask Server**
   ```sh
   python app.py
   ```

### Frontend

1. **Navigate to the Frontend Directory**
   ```sh
   cd client
   ```
2. **Install the Required npm Packages**
   ```sh
   npm install
   ```
3. **Start the Development Server**
   ```sh
   npm run dev
   ```

## Usage

### User Authentication

Users can sign up, log in, and log out. The authentication feature ensures that only registered users can access the application's features.

### Chatting

Registered users can interact with each other in real-time through the chatting feature, making the application more interactive and user-friendly.

### Item Listing

Users have the ability to list items, providing details about each item. This feature makes it easy for users to share and discover items within the application.

## 📁 File Structure

```
project-root-directory
│   README.md
│
└───backend
│   │   app.py
│   │   models.py
│
└───frontend
    │   App.jsx
    │   userStore.jsx
    │   Login.jsx
    │   Logout.jsx
    │   Home.jsx
    │   chats.jsx
```

## Dependencies

### Backend

- Flask: For creating the web server.
- flask_socketio, eventlet: For handling real-time web socket communication.

### Frontend

- React: For building the user interface.
- react-bootstrap: For styling the components.
- socket.io-client: For enabling real-time bidirectional event-based communication.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated. Here’s how you can contribute:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
