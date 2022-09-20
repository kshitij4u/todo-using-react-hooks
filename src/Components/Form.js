import React, { useState, useEffect } from "react";

const getTodosFromLS = () => {
  const data = localStorage.getItem("Todos");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

export const Form = () => {
  const [todoValue, setTodoValue] = useState("");
  const [todos, setTodos] = useState(getTodosFromLS());
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = new Date().getTime();
    let todoObject = {
      ID: id,
      TodoValue: todoValue,
      isCompleted: false,
    };
    setTodos([...todos, todoObject]);
    setTodoValue("");
  };

  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(todos));
  }, [todos]);

  const handleDelete = (id) => {
    const filtered = todos.filter((todo) => {
      return todo.ID !== id;
    });
    setTodos(filtered);
  };

  const handleCheckbox = (id) => {
    let todoArray = [];
    todos.forEach((todo) => {
      if (todo.ID === id) {
        if (todo.isCompleted === false) {
          todo.isCompleted = true;
        } else if (todo.isCompleted === true) {
          todo.isCompleted = false;
        }
      }
      todoArray.push(todo);
      setTodos(todoArray);
    });
  };

  return (
    <>
      <div className="jumbotron text-center">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="input-and-button">
            <input
              type="text"
              placeholder="Add task here..."
              required
              onChange={(e) => setTodoValue(e.target.value)}
              value={todoValue}
            />
            <div className="button">
              <button type="submit">ADD</button>
            </div>
          </div>
        </form>
        {todos.length > 0 && (
          <>
            {todos.map((todo, index) => (
              <div className="todo" key={todo.ID}>
                <div>
                  <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => handleCheckbox(todo.ID)}
                  />
                  <span
                    style={
                      todo.isCompleted === true
                        ? { textDecoration: "line-through" }
                        : { textDecoration: "none" }
                    }
                  >
                    {todo.TodoValue}
                  </span>
                </div>
                <div className="delete">
                  <div onClick={() => handleDelete(todo.ID)}>
                    Remove task
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};
