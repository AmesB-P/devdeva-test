import {useState ,MouseEvent ,ChangeEvent , FC,JSX} from 'react'
import HeaderPage from "../components/Layouts/Header/index.tsx";
import ContentsPage from "../components/Layouts/Contents/index.js";
import {
    FirstPage as FirstPageIcon,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    LastPage as LastPageIcon,
    AccountCircle
} from "@mui/icons-material";
import {
    Box,
    Button,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow,
    Paper,
    useTheme,
    IconButton,
    TableHead,
    CircularProgress
} from "@mui/material";
import {TablePaginationActionsProps, HeadCell , mapUserData} from "../types/userManagementTypes.ts";
import {Link} from 'react-router-dom'
import {useUser} from '../hooks/userDataHook.ts'

function TablePaginationActions(props: TablePaginationActionsProps): JSX.Element {
    const theme = useTheme();

    const {count, page, rowsPerPage, onPageChange} = props;

    const handleFirstPageButtonClick = (
        event: MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{flexShrink: 0, ml: 2.5}}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
            </IconButton>
        </Box>
    );
}


const UserManagement : FC = (): JSX.Element => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const userDataContext = useUser();

    if (!userDataContext) {
        // Handle the case where userDataContext is null
        return <CircularProgress/>;
    }

    const { userData, setUserData } = userDataContext;

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
        }, {
            id: 'Actions',
            numeric: true,
            disablePadding: false,
            label: 'Actions',
        },
    ];



    const handleChangePage = (
        event: MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        event?.preventDefault()
        setPage(newPage);
    };

    //Function change limit rows per page
    const handleChangeRowsPerPage = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userData.length) : 0;


    const deleteUserData = (id :string) =>{
        if (id) {
            setUserData((prevValue)=>{
                const userDataIndex = prevValue.findIndex((where) => where.id === id)
                prevValue.splice(userDataIndex , 1)
                return [
                    ...prevValue
                ]
            })
        }

    }
    return (
        <Box>
            <HeaderPage>
                <Grid container columns={12} padding={2} justifyContent={"center"} alignItems={"center"}>
                    <Grid item xs={6} textAlign={"start"} sx={{fontSize : "1.5rem"}}>
                        User list
                    </Grid>
                    <Grid item xs={6} textAlign={"end"}>
                        <Link to={"/CreateAndEditUser"}>
                            <Button variant="contained">
                                Add +
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </HeaderPage>
            <ContentsPage>
                <Grid container columns={12} padding={2} justifyContent={"center"} alignItems={"center"}>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: 500}} aria-label="custom pagination table">
                                <TableHead>
                                    <TableRow>
                                        {
                                            headCells.map((headCell, index) => (
                                                <TableCell key={index} align={"center"}>
                                                    {headCell.label}
                                                </TableCell>
                                            ))
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userData && (rowsPerPage > 0
                                            ? userData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : userData
                                    ).map((userData : mapUserData, index : number) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" style={{width: "10%"}} align={"center"}
                                                       scope="row">
                                                <AccountCircle sx={{width: 50, height: 50}}/>
                                            </TableCell>
                                            <TableCell style={{width: "20%"}} align="left">
                                                {userData.firstName}
                                            </TableCell>
                                            <TableCell style={{width: "20%"}} align="left">
                                                {userData.lastName}
                                            </TableCell>
                                            <TableCell style={{width: "10%"}} align="center">
                                                {userData.gender ? userData.gender : "-"}
                                            </TableCell>
                                            <TableCell style={{width: "20%"}} align="center">
                                                {userData.birthday === "Invalid date" ? "-" : userData.birthday}
                                            </TableCell>
                                            <TableCell style={{width: "20%"}} align="center">
                                                <Grid container columns={12} rowSpacing={1} columnSpacing={1}>
                                                    <Grid item xs={12} lg={6}>
                                                        <Link to={`/CreateAndEditUser/${userData.id}`} state={userData}>
                                                            <Button variant="contained" sx={{bgcolor: "#ffce00"}} fullWidth>
                                                                Edit
                                                            </Button>
                                                        </Link>
                                                    </Grid>

                                                    <Grid item xs={12} lg={6}>
                                                        <Button variant="contained" color="error" fullWidth onClick={()=> deleteUserData(userData.id)}>
                                                            Delete
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {emptyRows > 0 && (
                                        <TableRow style={{height: 53 * emptyRows}}>
                                            <TableCell colSpan={6}/>
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, 50, 100]}
                                            colSpan={12}
                                            count={userData.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            slotProps={{
                                                select: {
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