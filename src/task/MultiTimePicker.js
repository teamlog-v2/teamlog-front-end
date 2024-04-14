import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const MultiTimePicker = ({ value, setDeadline }) => (
  < LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ko' >
    <DatePicker
      inputVariant="outlined"
      defaultValue={dayjs((value))}
      onChange={(date) => {
        setDeadline(date.format('YYYY-MM-DDTHH:mm:ss'));
      }}
    />
  </LocalizationProvider >
)
export default MultiTimePicker;
