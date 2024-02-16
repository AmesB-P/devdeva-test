import {useContext} from "react";
import {UserDataContext} from "../context/UserDataContext.tsx";

export const useUser = () => useContext(UserDataContext);