import React, { useEffect, useState } from 'react';
import BottomBar from './BottomBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, CssBaseline, Stack, Typography } from '@mui/material';
import { getBibleReadingPlan } from '../services/BiblePlan';
import dayjs from 'dayjs';
import Reading from './Reading';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });

export default function App(){
    // initialize the current day
    const [selectedDate, setSelectedDate] = useState(dayjs());

    // holds the state of the actual reading plan
    const [readingPlan, setReadingPlan] = useState(null);
    
    useEffect(() => {
        const fetchedReadingPlan = getBibleReadingPlan();
        setReadingPlan(fetchedReadingPlan)
    }, [])

    const onDateChanged = (value) => {
        console.log(value)
        setSelectedDate(value)
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                    <Stack spacing={1} alignSelf={'center'} width={'90%'} >
                        <Typography>Today's Reading!</Typography>
                        <Reading reading={"James 1:13"}/>
                        <Reading reading={"James 1:13"}/>
                        <Reading reading={"James 1:13"}/>
                        <Reading reading={"James 1:13"}/>
                    </Stack>
                </Box>
            <BottomBar readingPlan={readingPlan} onDateChanged={onDateChanged} currentSelectedDate={selectedDate}/>
        </ThemeProvider>
    );
}