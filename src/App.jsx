import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import add from "./assets/svg/plus-circle.svg";

function usarEstadoFijo(defaultValue, key) {
  const [value, setValue] = useState(() => {
    const valorFijo = localStorage.getItem(key);
    return valorFijo !== null ? JSON.parse(valorFijo) : defaultValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

function App() {
  const [todos, setTodos] = usarEstadoFijo([]);

  function handleRemoveTodo(index) {
    setTodos((todos) => todos.filter((_todo, _index) => _index !== index));
  }

  function handleAddTodo(event) {
    event.preventDefault();
    const text = event.target.text.value;

    if (!text || todos.includes(text)) return;

    setTodos((todos) => todos.concat(text));

    event.target.text.value = "";
  }

  function checkTodo(index) {
    var checkbox = document.getElementById(`check${index}`);
    var text = document.getElementById(`text${index}`);
    if (checkbox.checked) {
      text.style.textDecoration = "line-through";
    } else {
      text.style.textDecoration = "none";
    }
  }

  return (
    <Router>
      <Switch>
        <Route path="/">
          <div id="main">
            <div id="hijo">
              <h1> To Do List en React! ⚛️ </h1>
              <form onSubmit={handleAddTodo}>
                <input className="texto" name="text" type="text" />
                <button>
                  <img className="icono" src={add} />
                </button>
              </form>

              <ul id="lista">
                {todos.map((todo, index) => (
                  <li
                    key={todo}
                    style={{
                      width: "100%",
                      order: -index,
                      display: "flex",
                      FlexFlow: "row nowrap",
                      justifyItems: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <input
                      id={"check" + index}
                      type="checkbox"
                      onClick={() => checkTodo(index)}
                    />
                    <span id={"text" + index} className="texto">
                      {todo}
                    </span>
                    <button onClick={() => handleRemoveTodo(index)}>
                      <span className="icono">🗑️</span>
                      {/*<img className="icono" src="../assets/svg/delete.svg" />*/}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
