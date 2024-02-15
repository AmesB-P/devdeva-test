
import { AccountCircle} from '@mui/icons-material';
import {IconButton } from "@mui/material";

const NavLeftSide = () : JSX.Element => {

    return (
        <div>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
            >
                <AccountCircle />
            </IconButton>

        </div>
    )
}
export default NavLeftSide