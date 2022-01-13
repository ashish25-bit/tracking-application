import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { DEFAULT_CATEGORY, DEFAULT_TODOS } from "../utils/constant";

const TodoContext = createContext();

export function useTodo() {
  return useContext(TodoContext);
}

export const TodoProvider = ({ children }) => {
  const [categories, setCategories] = useLocalStorage(
    "category",
    DEFAULT_CATEGORY
  );
  const [todos, setTodos] = useLocalStorage("todos", DEFAULT_TODOS);

  function getItemFromStorage(key) {
    const jsonValue = localStorage.getItem(key);

    if (jsonValue !== null && jsonValue !== undefined)
      return JSON.parse(jsonValue);
    return jsonValue;
  }

  return (
    <TodoContext.Provider
      value={{
        categories,
        setCategories,
        getItemFromStorage,
        todos,
        setTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
