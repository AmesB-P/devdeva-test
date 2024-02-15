import * as React from 'react'
import {Gender} from './userDataContextTypes.js'
export interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
}

export interface HeadCell {
    disablePadding: boolean;
    id: number | string;
    label: string;
    numeric: boolean;
}
export interface mapUserData {
    id : string,
    firstName: string;
    lastName: string;
    gender: Gender;
    birthday: string;
}