import { useContext } from "react";
import { AuthContext } from "./context/context";

export const useAuth =() => {

  return useContext(AuthContext)
}