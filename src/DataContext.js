import { createContext } from "react";

export const DataContext = createContext({
  loginResponse: undefined,
  setLoginResponse: function () {
    throw new Error("Function not implemented.");
  }
});