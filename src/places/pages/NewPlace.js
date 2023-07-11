import { Paper } from "@mui/material";
import NewPlaceForm from "../components/NewPlaceForm";

function NewPlace(){
    return (
        <Paper sx={{m:2}} elevation={3}>
            <NewPlaceForm/>
        </Paper>
    );
}

export default NewPlace;