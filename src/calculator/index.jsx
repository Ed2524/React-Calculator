
import { useRef, useEffect } from "react";
import "./App.css";

export default function Calculator() {
    const inputRef = useRef();

    // Add numbers to display
    function handleClick(value) {
        if (inputRef.current.value === "0") {
            inputRef.current.value = value;
        }
        else {
            inputRef.current.value += value;
        }
    }

    // Add mathematical operators
    function nshan(value) {
        if (
            inputRef.current.value.slice(-1) === "+" ||
            inputRef.current.value.slice(-1) === "-" ||
            inputRef.current.value.slice(-1) === "/" ||
            inputRef.current.value.slice(-1) === "*"
        ) {
            let x = inputRef.current.value.split("");
            x[x.length - 1] = value;

            let a = x.join("");
            inputRef.current.value = a;
        }
        else {
            inputRef.current.value += value;
        }
    }

    // Clear display
    function clear() {
        inputRef.current.value = "0";
    }

    // Calculate result
    function calculate() {
        try {
            if (inputRef.current.value.slice(-2) === "/0") {
                throw new Error("division error");
            }

            inputRef.current.value = eval(inputRef.current.value);
        }
        catch (err) {
            inputRef.current.value = err || "Error";
        }
    }

    // Keyboard functionality
    useEffect(() => {

        function handleKeyboard(event) {

            const key = event.key;

            // Numbers 0-9
            if (/^[0-9]$/.test(key)) {
                handleClick(key);
            }

            // Mathematical operators
            else if (
                key === "+" ||
                key === "-" ||
                key === "*" ||
                key === "/"
            ) {
                nshan(key);
            }

            // Calculate using Enter or =
            else if (key === "Enter" || key === "=") {
                event.preventDefault();
                calculate();
            }

            // Clear using Escape
            else if (key === "Escape") {
                clear();
            }

            // Delete last character
            else if (key === "Backspace") {
                event.preventDefault();

                let currentValue = inputRef.current.value;

                if (currentValue.length <= 1) {
                    inputRef.current.value = "0";
                }
                else {
                    inputRef.current.value = currentValue.slice(0, -1);
                }
            }
        }

        window.addEventListener("keydown", handleKeyboard);

        return () => {
            window.removeEventListener("keydown", handleKeyboard);
        };

    }, []);

    return (
        <div className="calculator-container">

            {/* Header */}

            <div className="calculator-header">

                <div className="calculator-brand">

                    <div className="brand-icon">
                        ✳
                    </div>

                    <div>
                        <h2>Calculator</h2>
                        <p>Precision at your fingertips</p>
                    </div>

                </div>

                <div className="status-indicator">
                    <span></span>
                    READY
                </div>

            </div>

            {/* Display */}

            <div className="calculator-display">

                <span className="display-label">
                    DISPLAY
                </span>

                <input
                    ref={inputRef}
                    defaultValue="0"
                    readOnly
                />

            </div>

            {/* Calculator Buttons */}

            <div className="calculator-buttons">

                {/* First Row */}

                <button
                    className="clear-btn"
                    onClick={clear}
                >
                    C
                </button>

                <button
                    className="operator-btn"
                    onClick={() => nshan("/")}
                >
                    ÷
                </button>

                <button
                    className="operator-btn"
                    onClick={() => nshan("*")}
                >
                    ×
                </button>

                <button
                    className="operator-btn"
                    onClick={() => nshan("-")}
                >
                    −
                </button>

                {/* Second Row */}

                <button onClick={() => handleClick("7")}>
                    7
                </button>

                <button onClick={() => handleClick("8")}>
                    8
                </button>

                <button onClick={() => handleClick("9")}>
                    9
                </button>

                <button
                    className="operator-btn"
                    onClick={() => nshan("+")}
                >
                    +
                </button>

                {/* Third Row */}

                <button onClick={() => handleClick("4")}>
                    4
                </button>

                <button onClick={() => handleClick("5")}>
                    5
                </button>

                <button onClick={() => handleClick("6")}>
                    6
                </button>

                <button
                    className="equals-btn"
                    onClick={calculate}
                >
                    =
                </button>

                {/* Fourth Row */}

                <button onClick={() => handleClick("1")}>
                    1
                </button>

                <button onClick={() => handleClick("2")}>
                    2
                </button>

                <button onClick={() => handleClick("3")}>
                    3
                </button>

                {/* Fifth Row */}

                <button onClick={() => handleClick("0")}>
                    0
                </button>

            </div>

            {/* Footer */}

            <div className="calculator-footer">

                <span>
                    PREMIUM CALCULATOR
                </span>

                <span>
                    v1.0
                </span>

            </div>

        </div>
    );
}
