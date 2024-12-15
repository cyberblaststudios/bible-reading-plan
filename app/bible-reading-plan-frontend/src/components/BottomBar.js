import * as React from 'react';
import { AppBar, Box, IconButton, Button, Link } from "@mui/material";
import { ArrowLeftIcon, ArrowRightIcon } from "@mui/x-date-pickers/icons";
import DateSelector from "./DateSelector";
import dayjs from 'dayjs';
import logo from '../res/gpwhite.png'
import downloadIcon from '../res/5623460_arrow_direction_down_download_pdf_icon.png'

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
        <AppBar position="fixed" color="primary" sx={{ alignItems: 'center'}}>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                <img src={logo} height={'auto'} width={'50%'} alt='GracePoint Logo'/>
                <Button variant='text' LinkComponent={Link} href='./readingplan.pdf' download="readingplan.pdf" sx={{position: 'absolute', right: '0px'}}>
                    <img src={downloadIcon} alt='Download the reading plan as PDF button'/>
                </Button>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingBottom: '5px'}}>
                <IconButton color="inherit" onClick={previousDayClicked} sx={{scale: '1.5', marginRight: '5%'}}>
                    <ArrowLeftIcon />
                </IconButton>
                    <DateSelector onDateChanged={(value) => onDateChanged(value)} currentDate={currentSelectedDate} readingPlan={readingPlan}/>
                <IconButton color="inherit" onClick={nextDayClicked} sx={{scale: '1.5', marginLeft: '5%'}}>
                    <ArrowRightIcon />
                </IconButton>
            </Box>
        </AppBar>
    </React.Fragment>
    );
}