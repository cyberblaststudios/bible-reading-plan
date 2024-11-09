import * as React from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';


// this will initialize to the current date
const initialValue = dayjs();

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? '🔴' : undefined}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

export default function DateSelector({currentDate, readingPlan, onDateChanged}) {
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([]);

  const fetchHighlightedDays = (date) => {

    // handle if the plan is not loaded yet
    if (readingPlan === null){
      setHighlightedDays([]);
      setIsLoading(false);
      return
    }

    const daysInCurrentMonth = dayjs(date).daysInMonth()
    const currentMonth = dayjs(date).month() + 1
    const currentYear = dayjs(date).year()

    const daysToHighlight = []

    for (let day = 1; day <= daysInCurrentMonth; day++) {
      const currentDateStamp = (currentMonth + '/' + day + '/' + currentYear)

      // get only the days of the month that actually have a reading passage defined
      if (currentDateStamp in readingPlan && readingPlan[currentDateStamp].passage !== '') {
        daysToHighlight.push(day)
      }
    }
    
    setHighlightedDays(daysToHighlight);
    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }
    
    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  const handleOpen = () => {
    // make sure that we clear out all of the highlighted days and re-generate
    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(currentDate);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
        value={currentDate}
        loading={isLoading}
        onMonthChange={handleMonthChange}
        onOpen={handleOpen}
        onChange={(value, context) => onDateChanged(value)}
        renderLoading={() => <DayCalendarSkeleton />}
        closeOnSelect
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
          },
        }}
      />
    </LocalizationProvider>
  );
}