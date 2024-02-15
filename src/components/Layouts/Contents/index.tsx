import * as React from "react";
import {Grid} from "@mui/material";

type ContentsPageProps = {
    children : React.ReactNode | React.ReactElement
}
const ContentsPage : React.FC<ContentsPageProps> = ({children}) : React.JSX.Element => {
    return (
        <Grid item xs={12} >
            {children}
        </Grid>
    )
}
export default ContentsPage