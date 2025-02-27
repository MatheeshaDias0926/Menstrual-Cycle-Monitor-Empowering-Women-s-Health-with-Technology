Menstrual Cycle Monitor

An intuitive and user-friendly web application that helps women track their menstrual health by logging cycle data, calculating average cycle durations, predicting ovulation periods, and identifying safe periods. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), this project combines technology and healthcare to empower women with valuable insights.

Features

User Authentication: Secure login/logout system for personalized user experience.
Cycle Data Logging: Users can log their start and end dates for menstrual cycles.
Average Cycle Duration: Calculates the average cycle duration based on the last 6 months of data.
Ovulation Prediction: Estimates ovulation days to assist with health and family planning.
Safe Period Identification: Identifies safe periods within the cycle for user awareness.
Error Notifications: Displays an error message if insufficient data (less than 6 cycles) is available.
Technologies Used

Frontend: React.js, Axios, React DatePicker, CSS
Backend: Node.js, Express.js
Database: MongoDB Atlas
Authentication: Basic authentication with user sessions
Prerequisites

To run this project locally, ensure the following are installed on your system:

Node.js
MongoDB Atlas or a local MongoDB setup
npm
Setup and Installation

Clone the Repository

git clone https://github.com/your-username/menstrual-cycle-monitor.git

cd menstrual-cycle-monitor

Install Dependencies
For the backend:
cd server
npm install

For the frontend:
cd client
npm install

Configure Environment Variables Create a .env file in the server directory and add the following:
MONGO_URI=mongodb+srv://Matheesha:Matheesha@cluster0.xqfraot.mongodb.net/
JWT_SECRET=your_jwt_secret
Run the Application
Start the backend server:
cd server
npm start
Start the frontend:
cd client
npm start
Access the Application Open your browser and navigate to http://localhost:3000.
Project Structure

menstrual-cycle-monitor/
├── client/ # Frontend React app
│ ├── src/
│ │ ├── components/ # React components
│ │ ├── App.js # Main app file
│ │ └── index.js # Entry point
├── server/ # Backend Express app
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API routes
│ ├── server.js # Main server file
│ └── .env # Environment variables
└── README.md # Project documentation


How It Works

Login or Register: Users create an account or log in to access their data securely.
Add Cycle Data: Log the start and end dates of menstrual cycles.
View Results: Calculate the average cycle duration, ovulation days, and safe periods.
Error Handling: If fewer than 6 cycles are logged, an error message is displayed to encourage more data input.
Future Enhancements

Graphical Insights: Add visual charts for better data representation.
Email Notifications: Notify users about upcoming ovulation or cycle periods.
Mobile App: Expand the project into a mobile application for broader accessibility.
Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to submit a pull request or open an issue.
