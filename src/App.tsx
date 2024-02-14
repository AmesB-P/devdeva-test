import {JSX} from 'react'
import './App.css'
import Navbar from './components/Layouts/Navbar/index.tsx'
import {Box, Fade, Grid} from "@mui/material";
import {Outlet} from 'react-router-dom';

function App(): JSX.Element {

    return (
        <>
            <Box sx={{flexGrow: 1, height: "100dvh", width: "100dvw"}}>
                <Fade in={true} timeout={1000}>
                    <Grid container direction="column" columns={12}>
                        <header>
                            <Grid item xs={12}>
                                <Navbar/>
                            </Grid>

                        </header>

                        <section>
                            <Grid item xs={12}>
                                <Outlet/>
                            </Grid>

                        </section>
                    </Grid>
                </Fade>

            </Box>
        </>
    )
}

export default App
