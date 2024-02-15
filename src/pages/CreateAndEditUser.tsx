import {useState, FC} from 'react'
import {useParams, useLocation, Link,useNavigate  } from "react-router-dom";
import HeaderPage from "../components/Layouts/Header/index.js";
import {
    TextField,
    Button,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    Dialog, DialogTitle, DialogActions,
    Alert
} from '@mui/material';
import ContentsPage from "../components/Layouts/Contents/index.js";
import {AccountCircle} from "@mui/icons-material";
import * as React from "react";
import {useUser} from "../hooks/userDataHook.ts";
import moment from "moment";
import {v4 as uuidv4} from 'uuid';
import {Gender} from "../types/userDataContextTypes.js";

const CreateAndEditUser: FC = (): JSX.Element => {
    // Get the userId param from the URL.
    const {id} = useParams();
    const {state} = useLocation();
    const navigate  = useNavigate ();

    const [openConfirmAlert, setOpenConfirmAlert] = useState(false); // State to manage alert visibility
    const [openWarningAlert, setOpenWarningAlert] = useState(false); // State to manage alert visibility

    const [formData, setFormData] = useState({
        id: state?.id ? state.id : '',
        firstName: state?.firstName ? state.firstName : '',
        lastName: state?.lastName ? state.lastName : '',
        gender: state?.gender ? state.gender : '',
        birthday: state?.birthday ? moment(state?.birthday).format("YYYY-MM-DD") : '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const {name, value} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const {setUserData} = useUser();


    const confirmSubmit =()=>{
        try {
            if(!formData.firstName || !formData.lastName){
                setOpenWarningAlert(true)
            }else{
                handleSubmit()
            }

        }catch (err) {
            setOpenWarningAlert(false)
            // console.log(err)
        }
    }

    const handleCloseWarning = () => {
        setOpenWarningAlert(false); // Close the dialog
    };

    interface userDataType {
        id: string,
        firstName: string;
        lastName: string;
        gender: Gender;
        birthday: string;
    }


    const handleSubmit = async () : Promise<void> => {
        try {
            setUserData((prevValue: userDataType[]) => {

                if (id) {
                    const userDataIndex = prevValue.findIndex(where => where.id === id)
                    prevValue[userDataIndex] = {
                        ...formData,
                        birthday: moment(formData.birthday).format("DD MMM YYYY"),
                    }
                    return [
                        ...prevValue
                    ]

                } else {
                    const userId: string = uuidv4();

                    const newData = {
                        ...formData,
                        birthday: moment(formData.birthday).format("DD MMM YYYY"),
                        id: userId
                    }
                    return [
                        ...prevValue,
                        newData
                    ]
                }

            })
            setFormData({
                id: '',
                firstName: '',
                lastName: '',
                gender: '',
                birthday: '',
            })

            // Redirect to UserManagement page
            navigate("/UserManagement")
        } catch (err) {
            // console.log(err)
        }

    };

    const handleClose = () => {
        setOpenConfirmAlert(false); // Close the dialog
    };


    return (
        <>
            <HeaderPage>
                <Grid container columns={12} padding={2} justifyContent={"center"} alignItems={"center"}>
                    <Grid item xs={6} textAlign={"start"} sx={{fontSize: "1.5rem"}}>
                        {state ? `Edit user ${state.firstName}` : `Create new user`}
                    </Grid>
                    <Grid item xs={6} textAlign={"end"}>
                        <Link to={"/CreateAndEditUser"} state={null}>
                            <Button variant="contained" onClick={() => setFormData({
                                id: '',
                                firstName: '',
                                lastName: '',
                                gender: '',
                                birthday: '',
                            })}>
                                Add +
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </HeaderPage>
            <ContentsPage>
                <Grid container columns={12} alignItems={"center"} sx={{height: "90%"}}>
                    <Grid item xs={12} lg={6} sx={{height: "auto"}}>
                        <Grid container gap={1} columns={12} direction={"row"} justifyContent={"center"}
                              alignItems={"center"}
                              sx={{height: "100%"}}>
                            <Grid item xs={12} sx={{display: "flex", justifyContent: "center"}}>
                                <AccountCircle sx={{height: "20%", width: "20%", justifyContent: "center"}}/>
                            </Grid>
                            <Grid item xs={12} sx={{display: "flex", justifyContent: "center"}}>
                                <Button variant={"contained"}>Upload Profile Picture</Button>
                            </Grid>
                            <Grid item xs={12} sx={{display: "flex", justifyContent: "center"}}>
                                <Button variant={"contained"} color={"error"}>Delete Picture</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} lg={6} sx={{height: "auto"}}>
                        <Grid container gap={1} columns={12} direction={"column"} justifyContent={"center"}
                              alignItems={"center"}
                              sx={{height: "100%"}}
                              padding={5}
                        >
                            <form>
                                <Grid container spacing={2} justifyContent="center" alignItems={"center"}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="First Name"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder={`Please enter First name`}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Last Name"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder={`Please enter Last name`}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <FormControl fullWidth>
                                            <InputLabel>Gender</InputLabel>
                                            <Select
                                                value={formData.gender}
                                                onChange={handleChange}
                                                name="gender"
                                            >
                                                <MenuItem disabled value="">
                                                    <em> - Please select Gender - </em>
                                                </MenuItem>
                                                <MenuItem value="Male">Male</MenuItem>
                                                <MenuItem value="Female">Female</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Birthday"
                                            type="date"
                                            name="birthday"
                                            value={formData.birthday}
                                            onChange={handleChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                </Grid>

                            </form>

                        </Grid>

                    </Grid>
                    <Grid item xs={12}>
                        <Grid container gap={1} justifyContent={"end"} paddingRight={15}>
                            <Grid item>
                                <Link to={"/userManagement"}>
                                    <Button variant="contained" color="error" >
                                        cancel
                                    </Button>
                                </Link>

                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary" type="submit" onClick={confirmSubmit}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>


                    </Grid>
                </Grid>

                {/* Dialog component for displaying the alert */}
                <Dialog open={openConfirmAlert} onClose={handleClose}>
                    <DialogTitle>
                        <Alert severity="info" sx={{marginTop: 2}}>
                            Confirm form Submit?
                        </Alert>

                    </DialogTitle>

                    <DialogActions>
                        <Link to={"/userManagement"}>
                            <Button onClick={handleSubmit} color="primary">
                                OK
                            </Button>
                        </Link>
                    </DialogActions>
                </Dialog>

                {/* Dialog component for displaying the warning alert */}
                <Dialog open={openWarningAlert} onClose={handleCloseWarning}>
                    <DialogTitle>
                        <Alert severity="warning" sx={{marginTop: 2}}>
                            Empty First name or Last name!!
                        </Alert>

                    </DialogTitle>

                    <DialogActions>
                            <Button onClick={handleCloseWarning} color="primary">
                                OK
                            </Button>
                    </DialogActions>
                </Dialog>


            </ContentsPage>
        </>
    )
}

export default CreateAndEditUser