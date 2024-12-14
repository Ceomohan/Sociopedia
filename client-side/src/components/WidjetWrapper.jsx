import { Box } from "@mui/material";
import {styled} from "@mui/system";

const WidjetWrapper = styled(Box)(({theme})=>({
    padding: "1.5rem 1.5rem 0.75rem 1.5rem",
    backgroundColor:theme.palette.background.alt,
    borderRadius:"1.75rem"
}))

export default WidjetWrapper