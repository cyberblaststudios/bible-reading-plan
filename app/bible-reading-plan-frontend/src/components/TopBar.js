import * as React from 'react';
import { AppBar, Box, Toolbar } from "@mui/material";
import dayjs from 'dayjs';
import logo from '../res/gpwhite.png'

export default function TopBar({readingPlan, currentSelectedDate, onDateChanged}) {

    return (
        <React.Fragment>
            <AppBar position="sticky" color="primary" sx={{ top: 0, bottom: 'auto', alignItems: 'center'}}>
                <Toolbar>
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                        <img src={logo} height={'auto'} width={'50%'}/>
                    </Box>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}