import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { DEFAULT_CATEGORY } from '../utils/constant';

const TodoContext = createContext();

export function useTodo() {
  return useContext(TodoContext);
}

export const TodoProvider = ({ children }) => {
  const [categories, setCategories] = useLocalStorage("category", DEFAULT_CATEGORY);

  return <TodoContext.Provider value={{
    categories,
    setCategories
  }}>
    {children}
  </TodoContext.Provider>
}