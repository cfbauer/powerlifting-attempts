import { useDocumentTitle } from "@uidotdev/usehooks";
import { useLocalStorage } from "@uidotdev/usehooks";
import "./App.css";

interface LiftCardProps {
  lift: string;
  value: string;
  setValue: (val: string) => void;
  unit: string;
  convertWeight: (weight: number) => number;
  roundToNearest2_5: (num: number) => number;
  getConvertedUnit: () => string;
}

const LiftCard = ({
  lift,
  value,
  setValue,
  unit,
  convertWeight,
  roundToNearest2_5,
  getConvertedUnit,
}: LiftCardProps) => {
  const step = 2.5;

  const increment = () => {
    const current = parseFloat(value) || 0;
    setValue(String(current + step));
  };

  const decrement = () => {
    const current = parseFloat(value) || 0;
    const next = current - step;
    setValue(next >= 0 ? String(next) : "0");
  };
  const calculateAttemptWeight = (weight: number, percentage: number) => {
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
        <div className="number-input-wrapper">
          <button type="button" className="step-btn decrement" onClick={decrement} aria-label="Decrease weight">−</button>
          <input
            id={lift.toLowerCase().replace(" ", "-")}
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={`Enter ${unit}`}
          />
          <button type="button" className="step-btn increment" onClick={increment} aria-label="Increase weight">+</button>
        </div>
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

  const [squat, setSquat] = useLocalStorage("powerlifting-squat", "");
  const [bench, setBench] = useLocalStorage("powerlifting-bench", "");
  const [deadlift, setDeadlift] = useLocalStorage("powerlifting-deadlift", "");
  const [unit, setUnit] = useLocalStorage("powerlifting-unit", "lbs");

  const convertWeight = (weight: number) => {
    if (!weight || isNaN(weight)) return "";

    if (unit === "lbs") {
      // Convert lbs to kg and round to nearest 2.5
      return Math.round((weight / 2.205).toFixed(1) / 2.5) * 2.5;
    } else {
      return Math.round(weight / 2.5) * 2.5;
    }
  };

  const getConvertedUnit = (): "kg" | "lbs" => {
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
  };

  const roundToNearest2_5 = (num: number) => {
    if (!num || isNaN(num)) return "";
    return Math.round(num / 2.5) * 2.5;
  };

  const total = roundToNearest2_5(convertWeight(calculateTotal()));
  useDocumentTitle( total ? `Total: ${total} ${getConvertedUnit()} | Powerlifting Attempt Selector` : "Powerlifting Attempt Selector");

  return (
    <div className="app">
      <header className="app-header">
        <h1>Powerlifting Meet Attempt Selector</h1>
        <div className="header-controls">
          <div className="unit-toggle">
            <label>
              <input
                type="radio"
                name="unit"
                value="lbs"
                checked={unit === "lbs"}
                onChange={(e) => setUnit(e.target.value)}
              />
              Pounds (lbs)
            </label>
            <label>
              <input
                type="radio"
                name="unit"
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
          setValue={setSquat}
          unit={unit}
          convertWeight={convertWeight}
          roundToNearest2_5={roundToNearest2_5}
          getConvertedUnit={getConvertedUnit}
        />
        <LiftCard
          lift="Bench Press"
          value={bench}
          setValue={setBench}
          unit={unit}
          convertWeight={convertWeight}
          roundToNearest2_5={roundToNearest2_5}
          getConvertedUnit={getConvertedUnit}
        />
        <LiftCard
          lift="Deadlift"
          value={deadlift}
          setValue={setDeadlift}
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
          <small>Your data is automatically saved</small>
        </div>
      </footer>
    </div>
  );
}

export default App;
