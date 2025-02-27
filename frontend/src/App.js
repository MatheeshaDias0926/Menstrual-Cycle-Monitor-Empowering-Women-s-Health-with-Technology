import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [averageCycle, setAverageCycle] = useState(null);
  const [ovulationDay, setOvulationDay] = useState(null);
  const [safePeriods, setSafePeriods] = useState([]);
  const [error, setError] = useState("");

  const login = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      setUserId(response.data.userId);
      setIsLoggedIn(true);
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    setUserId("");
    setUsername("");
    setPassword("");
    setIsLoggedIn(false);
    setStartDate(null);
    setEndDate(null);
    setAverageCycle(null);
    setOvulationDay(null);
    setSafePeriods([]);
    setError("");
  };

  const addCycle = async () => {
    try {
      await axios.post("http://localhost:5000/addCycle", {
        userId,
        startDate,
        endDate,
      });
      alert("Cycle data added successfully!");
    } catch (error) {
      alert("Error adding cycle data.");
    }
  };

  const calculateAverage = async () => {
    try {
      setError(""); // Reset error message
      const response = await axios.get(
        `http://localhost:5000/getAverageCycle/${userId}`
      );
      const { averageCycle, ovulationDay, safePeriods } = response.data;
      setAverageCycle(averageCycle);
      setOvulationDay(ovulationDay);
      setSafePeriods(safePeriods);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message); // Display server error message
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#ffe4e6",
        fontFamily: "'Arial', sans-serif",
        minHeight: "100vh",
        color: "#5a5a5a",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "20px",
        }}
      >
        {!isLoggedIn ? (
          <div>
            <h1 style={{ textAlign: "center", color: "#d63384" }}>Login</h1>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                display: "block",
                margin: "10px auto",
                padding: "10px",
                width: "90%",
                border: "1px solid #ffc9d2",
                borderRadius: "5px",
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                display: "block",
                margin: "10px auto",
                padding: "10px",
                width: "90%",
                border: "1px solid #ffc9d2",
                borderRadius: "5px",
              }}
            />
            <button
              onClick={login}
              style={{
                display: "block",
                margin: "20px auto",
                padding: "10px 20px",
                backgroundColor: "#d63384",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </div>
        ) : (
          <>
            <h1 style={{ textAlign: "center", color: "#d63384" }}>
              Menstrual Cycle Monitor
            </h1>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ marginRight: "10px", color: "#d63384" }}>
                Start Date:
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText="Select start date"
                style={{
                  padding: "5px",
                  border: "1px solid #ffc9d2",
                  borderRadius: "5px",
                }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ marginRight: "10px", color: "#d63384" }}>
                End Date:
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                placeholderText="Select end date"
              />
            </div>
            <div style={{ marginBottom: "20px", textAlign: "center" }}>
              <button
                onClick={addCycle}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#d63384",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
              >
                Add Cycle
              </button>
              <button
                onClick={calculateAverage}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#6f42c1",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Calculate Average
              </button>
            </div>

            {error && (
              <div
                style={{
                  padding: "10px",
                  backgroundColor: "#f8d7da",
                  color: "#842029",
                  borderRadius: "5px",
                  textAlign: "center",
                }}
              >
                {error}
              </div>
            )}

            {averageCycle && (
              <div
                style={{
                  marginTop: "20px",
                  padding: "10px",
                  border: "1px solid #ffc9d2",
                  borderRadius: "5px",
                  backgroundColor: "#fff4f6",
                }}
              >
                <h3 style={{ color: "#d63384" }}>Results</h3>
                <p>Average Cycle Duration: {averageCycle.toFixed(2)} days</p>
                <p>Ovulation Day: Day {ovulationDay}</p>
                <p>
                  Safe Periods:{" "}
                  {safePeriods.map((period, index) => (
                    <span key={index}>
                      {`Day ${period.from} to Day ${period.to}`}
                      {index < safePeriods.length - 1 && ", "}
                    </span>
                  ))}
                </p>
              </div>
            )}

            <button
              onClick={logout}
              style={{
                display: "block",
                margin: "20px auto",
                padding: "10px 20px",
                backgroundColor: "#d63384",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Log Out
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
