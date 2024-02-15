import {useContext} from "react";
import {UserDataContext} from "../context/UserDataContext.tsx";
// import {userDataContextTypes} from "../types/userDataContextTypes.ts";

export const useUser = () => useContext(UserDataContext);