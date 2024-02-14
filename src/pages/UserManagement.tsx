import * as React from 'react'
import HeaderPage from "../components/Layouts/Header/index.tsx";
import ContentsPage from "../components/Layouts/Contents/index.js";
import {FirstPage as FirstPageIcon , KeyboardArrowLeft , KeyboardArrowRight , LastPage as LastPageIcon ,AccountCircle} from "@mui/icons-material";
import {Box, Button, Grid , Table , TableBody ,TableCell , TableContainer , TableFooter , TablePagination , TableRow , Paper , useTheme , IconButton , TableHead} from "@mui/material";
import {TablePaginationActionsProps , HeadCell} from "../types/userManagementTypes.ts";

function TablePaginationActions(props: TablePaginationActionsProps) : JSX.Element {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}



const UserManagement = () : JSX.Element => {
    const headCells: readonly HeadCell[] = [
        {
            id: 'profileImg',
            numeric: false,
            disablePadding: true,
            label: 'Profile picture',
        },
        {
            id: 'firstName',
            numeric: true,
            disablePadding: false,
            label: 'First name',
        },
        {
            id: 'lastName',
            numeric: true,
            disablePadding: false,
            label: 'Last name',
        },
        {
            id: 'Gender',
            numeric: true,
            disablePadding: false,
            label: 'Gender',
        },
        {
            id: 'Birthday',
            numeric: true,
            disablePadding: false,
            label: 'Birthday',
        },{
            id: 'Actions',
            numeric: true,
            disablePadding: false,
            label: 'Actions',
        },
    ];


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);




    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    enum Gender {
        male = "Male",
        female = "Female"
    }
    //Function for create new user data
    function createData(profileImg : string , firstName : string , lastName: string , gender : Gender ,birthday : string) {
        return { profileImg, firstName, lastName ,gender , birthday  };
    }

    //Function for format date DD-MMM-YYYY
    function createDate(date : string) : string {
        const newDate = new Date(date)
        const monthNames = ["January", "February", "March" ,"April" ,"May", "June" , "July" , "August" , "September" , "October" , "November" , "December"];
        const day = newDate.getDate() , month = newDate.getMonth() , year = newDate.getFullYear();
        return `${day} ${monthNames[month].slice(0 , 3)} ${year}`
    }

    const userData = [
        createData('', "Rattapong", "Sukjai" , Gender.male , createDate(`2023-06-13`)),
        createData('', "Somchai", "Rirut" ,Gender.male , createDate(`2023-04-19`)),
        createData('', "Somchai", "RirutDee",Gender.male , createDate(`2023-10-21`)),
    ].sort((a, b) => (a.firstName < b.firstName ? -1 : 1));

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userData.length) : 0;

    return (
        <Box>
            <HeaderPage>
                <Grid container columns={12} padding={2} justifyContent={"center"} alignItems={"center"}>
                    <Grid item xs={6} textAlign={"start"}>
                        User list
                    </Grid>
                    <Grid item xs={6} textAlign={"end"}>
                        <Button variant="contained">Add +</Button>
                    </Grid>
                </Grid>
            </HeaderPage>
            <ContentsPage>
                <Grid container columns={12} padding={2} justifyContent={"center"} alignItems={"center"}>
                    <Grid item xs={12} >
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                <TableHead>
                                    <TableRow>
                                        {
                                            headCells.map((headCell , index) => (
                                                <TableCell key={index} align={"center"}>
                                                    {headCell.label}
                                                </TableCell>
                                            ))
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                            ? userData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : userData
                                    ).map((row , index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" style={{ width: "10%" }} align={"center"} scope="row">
                                                <AccountCircle sx={{width : 50 , height : 50}}/>
                                            </TableCell>
                                            <TableCell style={{ width: "20%" }} align="left">
                                                {row.firstName}
                                            </TableCell>
                                            <TableCell style={{ width: "20%" }} align="left">
                                                {row.lastName}
                                            </TableCell>
                                            <TableCell style={{ width: "10%" }} align="center">
                                                {row.gender}
                                            </TableCell>
                                            <TableCell style={{ width: "20%" }} align="center">
                                                {row.birthday}
                                            </TableCell>
                                            <TableCell style={{ width: "20%" }} align="center">
                                                <Grid container columns={12} rowSpacing={1} columnSpacing={1}>
                                                    <Grid item xs={12} lg={6}>
                                                        <Button variant="contained" sx={{bgcolor : "#ffce00"}} fullWidth>
                                                            Edit
                                                        </Button>
                                                    </Grid>

                                                    <Grid item xs={12} lg={6}>
                                                        <Button variant="contained" color="error" fullWidth>
                                                            Delete
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25,50 , 100]}
                                            colSpan={12}
                                            count={userData.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            slotProps={{
                                                select : {
                                                    inputProps: {
                                                        'aria-label': 'rows per page',
                                                    },
                                                    native: true,
                                                }
                                            }}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            ActionsComponent={TablePaginationActions}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>
                    </Grid>

                </Grid>
            </ContentsPage>
        </Box>
    )
}

export default UserManagement