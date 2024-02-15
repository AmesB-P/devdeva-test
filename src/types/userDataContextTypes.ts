import * as React from 'react'
export enum Gender {
    male = "Male",
    female = "Female"
}
export type createUserDataTypes = {
    id : string,
    profileImg : string,
    firstName : string,
    lastName : string,
    gender : Gender,
    birthday : string
}

export interface userDataContextTypes {
    userData : createUserDataTypes[],
    setUserData : React.Dispatch<React.SetStateAction<createUserDataTypes[]>>
}
