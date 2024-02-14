import * as React from 'react'
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