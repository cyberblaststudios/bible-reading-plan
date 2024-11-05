import React, { useCallback, useEffect, useState } from 'react';
import BottomBar from './BottomBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, CssBaseline, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import Reading from './Reading';

const plan_server = origin + '/apiv1/bibleplan';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });

function getFormattedDate(dayJsDate){
    return dayJsDate.format('M/D/YYYY')
}   

function getReadingLinks(readingPlan, currentDate) {
    const formattedDate = getFormattedDate(currentDate)

    let readingsString = ''

    try{
        readingsString = readingPlan[formattedDate].passage
    } catch {
        return []
    }

    if (readingsString === '') {
        return []
    }

    const splitReadings = readingsString.split('; ')

    let readingResult = []

    for (const reading of splitReadings) {
        const lastSpaceLocation = reading.lastIndexOf(' ')
        const verseNumber = reading.substring(lastSpaceLocation + 1, reading.length)
        const book = reading.substring(0, lastSpaceLocation)

        const generatedBibleLink = 'https://www.biblegateway.com/passage/?search=' + book + '+' + verseNumber + '&version=ESV'

        readingResult.push({verseSeries: reading, bibleLink: generatedBibleLink})
    }

    return readingResult
}

export default function App(){
    // initialize the current day
    const [selectedDate, setSelectedDate] = useState(dayjs());

    // holds the state of the actual reading plan (all of the days are stored here)
    const [readingPlan, setReadingPlan] = useState(null);

    // holds the current readings of the current reading plan day
    const [readings, setReadings] = useState([])

    // holds the curent videos of the current reading plan day
    const [videos, setVideos] = useState([])

    const initializeDay = () => {
        const parsedReadings = getReadingLinks(readingPlan, selectedDate)
        setReadings(parsedReadings)
    }

    const onDateChanged = (value) => {
        setSelectedDate(value)
        initializeDay()
    }

    useEffect(() => {

        const fetchBibleReadingPlan = async () => {
            return await fetch(plan_server, {method: 'GET'}).then((response) => {
                return response.json()
            }).then((data) => {
                return data
            }).catch((error) => {
                console.error(error)
            })
        }

        if (!readingPlan){
            fetchBibleReadingPlan().then((data) => {
                setReadingPlan(data)

                // initialize current day

            })
        }

    }, [readingPlan])

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                    <Stack spacing={1} alignSelf={'center'} width={'90%'} maxWidth={'35cm'}>
                        <Typography>Today's Reading</Typography>
                        {
                            readings.map((item, index) => (
                                <Reading key={index} reading={item.verseSeries} bibleLink={item.bibleLink}/>
                            ))
                        }
                    </Stack>
                </Box>
            <BottomBar readingPlan={readingPlan} onDateChanged={onDateChanged} currentSelectedDate={selectedDate}/>
        </ThemeProvider>
    );
}