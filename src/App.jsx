import { useState, useEffect } from "react";
import "./App.css";

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
    localStorage.setItem("powerlifting-squat", squat);
  }, [squat]);

  useEffect(() => {
    localStorage.setItem("powerlifting-bench", bench);
  }, [bench]);

  useEffect(() => {
    localStorage.setItem("powerlifting-deadlift", deadlift);
  }, [deadlift]);

  useEffect(() => {
    localStorage.setItem("powerlifting-unit", unit);
  }, [unit]);

  const convertWeight = (weight) => {
    if (!weight || isNaN(weight)) return "";

    if (unit === "lbs") {
      // Convert lbs to kg and round to nearest 2.5
      return Math.round(((weight / 2.205).toFixed(1))/2.5) * 2.5;
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

  const calculateSafeWeight = (weight) => {
    if (!weight || isNaN(weight)) return ""; 
    return weight * 0.95;
  }

  const calculateReachWeight = (weight) => {
    if (!weight || isNaN(weight)) return ""; 
    return weight * 1.05;
  }

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

  const LiftCard = ({ lift, value, onChange, unit }) => (
    <div className="lift-column">
      <h2>{lift}</h2>
      <div className="input-group">
        <label htmlFor="{lift}">Weight ({unit})</label>
        <input
          id={lift}
          type="number"
          value={value}
          onChange={onChange}
          placeholder={`Enter weight in ${unit}`}
        />
      </div>
      {value && (
        <div className="calculated-weights">
          <div className="variant">
            Safe (90%): {roundToNearest2_5(calculateSafeWeight(convertWeight(value)))} {getConvertedUnit()}
          </div>
          <div className="variant">
            {roundToNearest2_5(convertWeight(value))} {getConvertedUnit()}
          </div>
          <div className="variant">
            Reach (110%): {roundToNearest2_5(calculateReachWeight(convertWeight(value)))} {getConvertedUnit()}
          </div>
        </div>
      )}
    </div>
  );

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
        />
        <LiftCard 
          lift="Bench Press"
          value={bench}
          onChange={(e) => setBench(e.target.value)}
          unit={unit}
        />
        <LiftCard 
          lift="Deadlift"
          value={deadlift}
          onChange={(e) => setDeadlift(e.target.value)}
          unit={unit}
        />
      </div>
      <div className="total-section">
        <h2>
          Total: {convertWeight(calculateTotal())} kgs
        </h2>
      </div>
      <div></div>
      <footer>
        <button className="clear-button outline" onClick={clearAllData}>
          Clear All Data
        </button>
        <div className="save-indicator">
          <small>💾 Your data is automatically saved</small>
        </div>
      </footer>
      '
    </div>
  );
}

export default App;
