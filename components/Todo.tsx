'use client'
import React, { useState } from "react";

interface TodoItem {
  text: string;
  completed: boolean;
}

export default function Todo() {
  const [inputValue, setInputValue] = useState<string>("");
  const [storeValue, setStoreValue] = useState<TodoItem[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      setStoreValue([...storeValue, { text: inputValue, completed: false }]);
      setInputValue("");
    }
  };

  const toggleTodo = (index: number) => {
    setStoreValue((prevState) => {
      const updatedTodos = [...prevState];
      updatedTodos[index] = {
        ...updatedTodos[index],
        completed: !updatedTodos[index].completed,
      };
      return updatedTodos;
    });
  };

const DeleteHandler = (index: number) => {
  setStoreValue((prevState) => prevState.filter((_, indx) => indx !== index));
};

  return (
    <div>
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center uppercase  mt-5">
        todo next + and typescript
      </h1>

      <form onSubmit={handleSubmit} className="max-w-xs lg:max-w-4xl mx-auto mt-8 flex flex-col lg:flex-row gap-5 justify-center items-center ">
        <label htmlFor="todoInput" className="sr-only">
          Add Todo
        </label>
        <input
          id="todoInput"
          type="text"
          placeholder="Add Todo"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          aria-label="Add Todo"
        />
        <button
          type="submit"
          className="mt-2 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold  px-10 rounded focus:outline-none focus:shadow-outline block "
        >
          Add
        </button>
      </form>
      <div className="w-full min-h-screen mt-6">
        {storeValue.map((todo, index) => (
          <div key={index} className="w-full flex flex-row justify-around gap-5 py-3 items-end">
            <label htmlFor="myCheck" className="sr-only">check</label>
            <input
              type="checkbox"
              id="myCheck"
              className="w-4 h-4"
              checked={todo.completed}
              onChange={() => toggleTodo(index)}
            />
            <h1
              className={`px-4 text-lg uppercase w-1/3 ${
                todo.completed ? "line-through text-red-600" : ""
              }`}
            >
              {todo.text}
            </h1>
            <button  type="submit" onClick={()=>DeleteHandler(index)} className="bg-red-800 text-white rounded-md px-2 py-1" >Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
