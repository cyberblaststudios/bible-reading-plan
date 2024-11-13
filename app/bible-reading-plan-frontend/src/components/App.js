import React, { useEffect, useState } from 'react';
import BottomBar from './BottomBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, CssBaseline, Skeleton, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import Reading from './Reading';
import Video from './Video';
import TopBar from './TopBar';

const plan_server = origin + '/apiv1/bibleplan';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#5782a1',
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

function getVideoEmbedIds(readingPlan, currentDate) {
    const formattedDate = getFormattedDate(currentDate)
    
    let currentDay = {}

    try{
        currentDay = readingPlan[formattedDate]

        if (currentDay.passage === '') {
            return []
        }
    } catch {
        return []
    }

    const videoFullLinks = []

    videoFullLinks.push(currentDay.video1)
    videoFullLinks.push(currentDay.video2)
    videoFullLinks.push(currentDay.video3)
    videoFullLinks.push(currentDay.video4)

    const videoEmbedIds = []

    for (const videoFullLink of videoFullLinks) {
        if (videoFullLink !== "" && videoFullLink !== null) {
            videoEmbedIds.push(videoFullLink.match(/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?‌​[\w\?‌​=]*)?/)[1])
        }
    }

    return videoEmbedIds
}

export default function App(){
    // initialize the current day
    const [selectedDate, setSelectedDate] = useState(dayjs());

    // holds the state of the actual reading plan (all of the days are stored here)
    const [readingPlan, setReadingPlan] = useState(null);

    // holds the current readings of the current reading plan day
    const [readings, setReadings] = useState([])

    // holds the curent youtube video embed ids of the current reading plan day
    const [videos, setVideos] = useState([])

    // holds the state when we are loading in content
    const [isLoading, setIsLoading] = useState(false)

    const initializeDay = (date, currentReadingPlan) => {
        const parsedReadings = getReadingLinks(currentReadingPlan, date)
        const videoEmbedIds = getVideoEmbedIds(currentReadingPlan, date)
        
        setReadings(parsedReadings)
        setVideos(videoEmbedIds)
        setIsLoading(false)
    }

    const onDateChanged = (value) => {
        setIsLoading(true)
        setSelectedDate(value)
        initializeDay(value, readingPlan)
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
            setIsLoading(true)

            fetchBibleReadingPlan().then((planData) => {
                setReadingPlan(planData)

                // initialize current day
                initializeDay(dayjs(), planData)

            })
        }

    }, [])

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <Stack>
                <BottomBar readingPlan={readingPlan} onDateChanged={onDateChanged} currentSelectedDate={selectedDate}/>
            </Stack>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                <Stack spacing={2} alignSelf={'center'} width={'90%'} maxWidth={'20cm'} maxHeight={'100cm'} marginTop={'4cm'} marginBottom={'2cm'}>
                    { 
                        (readings.length <= 0 && !isLoading) ? <Typography variant='h4' align='center'>
                        Saturday and Sunday are days set aside intentionally for you to catch up on any readings you've missed over the past few weeks.
                        If you are up to date, take a break from your reading and spend some time in prayer for the GracePoint family!
                            </Typography> : null
                    }
                    {
                        isLoading && <Stack spacing={2} alignSelf={'center'} width={'90%'} maxWidth={'20cm'} maxHeight={'100cm'}>
                            <Skeleton variant='rounded' height={'2cm'}/>
                            <Skeleton variant='rounded' height={'2cm'}/>
                            <Skeleton variant='rounded' height={'4cm'}/>
                            <Skeleton variant='rounded' height={'4cm'}/>
                            <Skeleton variant='rounded' height={'4cm'}/>
                            <Skeleton variant='rounded' height={'4cm'}/>
                        </Stack>
                    }
                    {
                        readings.map((item, index) => (
                            !isLoading ? <Reading key={index} reading={item.verseSeries} bibleLink={item.bibleLink}/> : null
                        ))
                    }
                    {
                        videos.map((item, index) => (
                            !isLoading ? <Video key={index} embedId={item}/> : null
                        ))
                    }
                </Stack>
            </Box>
        </ThemeProvider>
    );
}