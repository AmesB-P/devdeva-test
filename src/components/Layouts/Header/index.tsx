import * as React from "react";
import {Grid} from "@mui/material";

type HeaderPageProps = {
    children : React.ReactNode
}
const HeaderPage : React.FC<HeaderPageProps> = ({children}) : React.JSX.Element => {

    return (
        <Grid item xs={12}>
            {children}
        </Grid>
    )
}

export default HeaderPage