import {AppBar , Box, Toolbar} from '@mui/material';

import NavLeftSide from './LeftSide.tsx'
import NavRightSide from './RightSide.tsx'


export default function MenuAppBar() : JSX.Element {

    return (
            <Box sx={{ flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <NavLeftSide title={"User Management"}/>
                        <NavRightSide/>
                    </Toolbar>
                </AppBar>
            </Box>
    );
}