import {Typography} from "@mui/material";

type NavLeftSideProps = {
    title : string
}
const NavLeftSide = ({title} : NavLeftSideProps) : JSX.Element => {

    return (
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
        </Typography>
    )
}
export default NavLeftSide