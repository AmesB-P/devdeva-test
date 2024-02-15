import {createContext, ReactNode, useCallback, useEffect, useState, useId} from 'react';
import {Gender , createUserDataTypes , userDataContextTypes} from "../types/userDataContextTypes.js";
import {v4 as uuidv4} from 'uuid';
import moment from "moment";
export const UserDataContext = createContext<userDataContextTypes | null >(null)

export default function UserDataProvider({children} : {children : ReactNode}){


    const [userData, setUserData] = useState<createUserDataTypes[]>([]);


    const initialUserData = useCallback(() => {

        //Function for create new user data
        const createUserData = (profileImg : string, firstName : string, lastName : string, gender : Gender, birthday : string ) : createUserDataTypes => {
            const userId : string = uuidv4();
            return {id : userId,  profileImg, firstName, lastName, gender, birthday : moment(birthday).format("DD MMM YYYY")};
        }
        setUserData([
            createUserData('', "Rattapong", "Sukjai", Gender.male, `2023-06-13`),
            createUserData('', "Somchai", "Rirut", Gender.male, `2023-04-19`),
            createUserData('', "Somchai", "RirutDee", Gender.male, `2023-10-21`),
        ])
    }, []);


    useEffect(() => {
        initialUserData()

        return ()=> initialUserData()
    }, [initialUserData]);

    return (
        <UserDataContext.Provider value={{userData ,setUserData}}>
            {children}
        </UserDataContext.Provider>
    )
}