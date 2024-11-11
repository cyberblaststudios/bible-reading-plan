import * as React from 'react';
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import { ArrowLeftIcon, ArrowRightIcon } from "@mui/x-date-pickers/icons";
import DateSelector from "./DateSelector";
import dayjs from 'dayjs';

export default function BottomBar({readingPlan, currentSelectedDate, onDateChanged}) {
    function nextDayClicked(){
        const newDate = dayjs(currentSelectedDate).add(1, 'day')
 
        onDateChanged(newDate)
    }

    function previousDayClicked(){
        const newDate = dayjs(currentSelectedDate).subtract(1, 'day');

        onDateChanged(newDate)
    }

    return (
        <React.Fragment>
            <AppBar position="sticky" color="primary" sx={{ top: 0, bottom: 'auto', alignItems: 'center'}}>
                <Toolbar>
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                        <IconButton color="inherit" onClick={previousDayClicked} sx={{scale: '1.5', marginRight: '5%'}}>
                            <ArrowLeftIcon />
                        </IconButton>
                            <DateSelector onDateChanged={(value) => onDateChanged(value)} currentDate={currentSelectedDate} readingPlan={readingPlan}/>
                        <IconButton color="inherit" onClick={nextDayClicked} sx={{scale: '1.5', marginLeft: '5%'}}>
                            <ArrowRightIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}