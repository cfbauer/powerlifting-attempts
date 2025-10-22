import { useState, useEffect } from "react";
import "./App.css";
const LiftCard = ({
  lift,
  value,
  onChange,
  unit,
  convertWeight,
  roundToNearest2_5,
  getConvertedUnit,
}) => {
  const calculateAttemptWeight = (weight, percentage) => {
    if (!weight || isNaN(weight)) return "";
    const convertedWeight = convertWeight(weight);
    return roundToNearest2_5(convertedWeight * percentage);
  };

  const attempts = [
    { name: "1st Attempt", safe: 0.9, normal: 0.92, reach: 0.92 },
    { name: "2nd Attempt", safe: 0.95, normal: 0.96, reach: 0.97 },
    { name: "3rd Attempt", safe: 0.975, normal: 1.0, reach: 1.025 },
  ];

  return (
    <div className="lift-column">
      <h2>{lift}</h2>
      <div className="input-group">
        <label htmlFor={lift.toLowerCase().replace(" ", "-")}>
          Weight ({unit})
        </label>
        <input
          id={lift.toLowerCase().replace(" ", "-")}
          type="number"
          value={value}
          onChange={onChange}
          placeholder={`Enter weight in ${unit}`}
        />
      </div>
      {value && (
        <div className="calculated-weights">
          {attempts.map((attempt, index) => (
            <div key={index} className="attempt-group">
              <h3 className="attempt-title">{attempt.name}</h3>
              <div className="variant">
                <span className="variant-label"></span>
                <span className="variant-weight">
                  {calculateAttemptWeight(value, attempt.safe)} kgs
                </span>
              </div>
              <div className="variant normal">
                <span className="variant-label"></span>
                <span className="variant-weight">
                  {calculateAttemptWeight(value, attempt.normal)} kgs
                </span>
              </div>
              <div className="variant">
                <span className="variant-label"></span>
                <span className="variant-weight">
                  {calculateAttemptWeight(value, attempt.reach)} kgs
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function App() {
  // Load saved values from localStorage or use empty string as default
  const [squat, setSquat] = useState(
    () => localStorage.getItem("powerlifting-squat") || ""
  );
  const [bench, setBench] = useState(
    () => localStorage.getItem("powerlifting-bench") || ""
  );
  const [deadlift, setDeadlift] = useState(
    () => localStorage.getItem("powerlifting-deadlift") || ""
  );
  const [unit, setUnit] = useState(
    () => localStorage.getItem("powerlifting-unit") || "lbs"
  );

  // Save to localStorage whenever values change
  useEffect(() => {
    if (squat !== "") {
      localStorage.setItem("powerlifting-squat", squat);
    }
  }, [squat]);

  useEffect(() => {
    if (bench !== "") {
      localStorage.setItem("powerlifting-bench", bench);
    }
  }, [bench]);

  useEffect(() => {
    if (deadlift !== "") {
      localStorage.setItem("powerlifting-deadlift", deadlift);
    }
  }, [deadlift]);

  useEffect(() => {
    localStorage.setItem("powerlifting-unit", unit);
  }, [unit]);

  const convertWeight = (weight) => {
    if (!weight || isNaN(weight)) return "";

    if (unit === "lbs") {
      // Convert lbs to kg and round to nearest 2.5
      return Math.round((weight / 2.205).toFixed(1) / 2.5) * 2.5;
    } else {
      return Math.round(weight / 2.5) * 2.5;
    }
  };

  const getConvertedUnit = () => {
    return unit === "lbs" ? "kg" : "lbs";
  };

  const calculateTotal = () => {
    const squatNum = parseFloat(squat) || 0;
    const benchNum = parseFloat(bench) || 0;
    const deadliftNum = parseFloat(deadlift) || 0;
    return squatNum + benchNum + deadliftNum;
  };

  const clearAllData = () => {
    setSquat("");
    setBench("");
    setDeadlift("");
    setUnit("lbs");
    // Clear from localStorage
    localStorage.removeItem("powerlifting-squat");
    localStorage.removeItem("powerlifting-bench");
    localStorage.removeItem("powerlifting-deadlift");
    localStorage.removeItem("powerlifting-unit");
  };

  const roundToNearest2_5 = (num) => {
    if (!num || isNaN(num)) return "";
    return Math.round(num / 2.5) * 2.5;
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Powerlifting Meet Attempt Selector</h1>
        <div className="header-controls">
          <div className="unit-toggle">
            <label>
              <input
                type="radio"
                value="lbs"
                checked={unit === "lbs"}
                onChange={(e) => setUnit(e.target.value)}
              />
              Pounds (lbs)
            </label>
            <label>
              <input
                type="radio"
                value="kg"
                checked={unit === "kg"}
                onChange={(e) => setUnit(e.target.value)}
              />
              Kilograms (kg)
            </label>
          </div>
        </div>
      </header>
      <div className="calculator-container">
        <LiftCard
          lift="Squat"
          value={squat}
          onChange={(e) => setSquat(e.target.value)}
          unit={unit}
          convertWeight={convertWeight}
          roundToNearest2_5={roundToNearest2_5}
          getConvertedUnit={getConvertedUnit}
        />
        <LiftCard
          lift="Bench Press"
          value={bench}
          onChange={(e) => setBench(e.target.value)}
          unit={unit}
          convertWeight={convertWeight}
          roundToNearest2_5={roundToNearest2_5}
          getConvertedUnit={getConvertedUnit}
        />
        <LiftCard
          lift="Deadlift"
          value={deadlift}
          onChange={(e) => setDeadlift(e.target.value)}
          unit={unit}
          convertWeight={convertWeight}
          roundToNearest2_5={roundToNearest2_5}
          getConvertedUnit={getConvertedUnit}
        />
      </div>
      <div className="total-section">
        <h2>
          Total: {roundToNearest2_5(convertWeight(calculateTotal()))}{" "}
          {getConvertedUnit()}
        </h2>
      </div>
      <footer>
        <button className="clear-button outline" onClick={clearAllData}>
          Clear All Data
        </button>
        <div className="save-indicator">
          <small>💾 Your data is automatically saved</small>
        </div>
      </footer>
    </div>
  );
}

export default App;
