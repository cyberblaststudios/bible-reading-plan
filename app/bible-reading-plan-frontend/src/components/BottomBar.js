import * as React from 'react';
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import { ArrowLeftIcon, ArrowRightIcon } from "@mui/x-date-pickers/icons";
import DateSelector from "./DateSelector";

export default function BottomBar() {
    return (
        <React.Fragment>
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, alignItems: 'center'}}>
                <Toolbar>
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                        <IconButton color="inherit">
                            <ArrowLeftIcon />
                        </IconButton>
                            <DateSelector/>
                        <IconButton color="inherit">
                            <ArrowRightIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}