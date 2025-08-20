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
    return weight * 0.9; // 90% of the weight
  }

  const calculateReachWeight = (weight) => {
    if (!weight || isNaN(weight)) return ""; 
    return weight * 1.1; // 110% of the weight
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
        <div className="lift-column">
          <h2>Squat</h2>
          <div className="input-group">
            <label htmlFor="squat">Weight ({unit})</label>
            <input
              id="squat"
              type="number"
              value={squat}
              onChange={(e) => setSquat(e.target.value)}
              placeholder={`Enter weight in ${unit}`}
            />
          </div>
          {squat && (
            <div className="calculated-weights">
              <div className="variant">
                <strong>Converted:</strong> {roundToNearest2_5(convertWeight(squat))} kgs
              </div>
              <div className="variant">
                <strong>Safe (90%):</strong> {roundToNearest2_5(calculateSafeWeight(convertWeight(squat)))} kgs
              </div>
              <div className="variant">
                <strong>Reach (110%):</strong> {roundToNearest2_5(calculateReachWeight(convertWeight(squat)))} kgs
              </div>
            </div>
          )}
        </div>

        <div className="lift-column">
          <h2>Bench Press</h2>
          <div className="input-group">
            <label htmlFor="bench">Weight ({unit})</label>
            <input
              id="bench"
              type="number"
              value={bench}
              onChange={(e) => setBench(e.target.value)}
              placeholder={`Enter weight in ${unit}`}
            />
          </div>
          {bench && (
            <div className="calculated-weights">
              <div className="variant">
                <strong>Converted:</strong> {roundToNearest2_5(convertWeight(bench))} kgs
              </div>
              <div className="variant">
                <strong>Safe (90%):</strong> {roundToNearest2_5(calculateSafeWeight(convertWeight(bench)))} kgs
              </div>
              <div className="variant">
                <strong>Reach (110%):</strong> {roundToNearest2_5(calculateReachWeight(convertWeight(bench)))} kgs
              </div>
            </div>
          )}
        </div>

        <div className="lift-column">
          <h2>Deadlift</h2>
          <div className="input-group">
            <label htmlFor="deadlift">Weight ({unit})</label>
            <input
              id="deadlift"
              type="number"
              value={deadlift}
              onChange={(e) => setDeadlift(e.target.value)}
              placeholder={`Enter weight in ${unit}`}
            />
          </div>
          {deadlift && (
            <div className="calculated-weights">
              <div className="variant">
                <strong>Converted:</strong> {roundToNearest2_5(convertWeight(deadlift))} kgs
              </div>
              <div className="variant">
                <strong>Safe (90%):</strong> {roundToNearest2_5(calculateSafeWeight(convertWeight(deadlift)))} kgs
              </div>
              <div className="variant">
                <strong>Reach (110%):</strong> {roundToNearest2_5(calculateReachWeight(convertWeight(deadlift)))} kgs
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="total-section">
        <h2>
          Total: {calculateTotal().toFixed(1)} {unit}
        </h2>
        {calculateTotal() > 0 && (
          <p>
            ({convertWeight(calculateTotal())} {getConvertedUnit()})
          </p>
        )}
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
