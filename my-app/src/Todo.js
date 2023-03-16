import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import instance from "./instance";

const App = () => <TodoApp />;

const TodoApp = () => {
  const [messageList, setMessageList] = useState([]);

  const addTodo = useCallback(async () => {
    await instance.get("/fetchData").then((response) => {
      const all_todos = response?.data?.data;
      setMessageList(all_todos || []);
    });
  }, []);

  useEffect(() => {
    addTodo();
  }, [addTodo]);

  return (
    <div id="app">
      <TodoHeader />
      <TodoForm addTodo={addTodo} /> <br /> {/* Why */}
      <TodoList messageList={messageList} callbackFunction={addTodo} />
    </div>
  );
};

const TodoHeader = () => (
  <div id="header">
    <h2>Todo List</h2>
  </div>
);

const TodoForm = ({ addTodo }) => {
  const [input, setInput] = useState("");

  const changeHandler = (event) => {
    setInput(event.target.value);
  };

  const submitHandler = useCallback(
    async (e) => {
      e.preventDefault();
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("secret_mission")}`,
        },
      };
      let body = {
        data: input,
        _id: localStorage.getItem("user_info")._id,
      };
      await instance.post("/addData", body).then((response) => {
        addTodo();
        setInput("");
        console.log(response);
      });
    },
    [addTodo, input]
  );

  return (
    <div id="form">
      <input
        id="form__input"
        type="text"
        value={input}
        onChange={changeHandler}
      />
      <button id="form__submit" onClick={submitHandler}>
        Add Todo
      </button>
    </div>
  );
};

const TodoList = ({ messageList, callbackFunction, index }) => {
  return (
    <>
      <ol id="todolist">
        {messageList.length > 0 &&
          messageList.map((message, index) => {
            return (
              <Todo
                message={message}
                callbackFunction={callbackFunction}
                key={index}
              />
            );
          })}
      </ol>
    </>
  );
};

const Todo = ({ message, callbackFunction }) => {
  const handleDelete = async (event) => {
    let body = {
      _id: event,
    };
    await instance.post("/deleteData", body).then((response) => {
      callbackFunction();
    });
  };

  return (
    <li id="todo">
      <span id="todo__label">{message?.data + "  "}</span>
      <button
        id="todo__delete"
        onClick={() => {
          handleDelete(message?._id);
        }}
      >
        Delete
      </button>
    </li>
  );
};

export default App;
