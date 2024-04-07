import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const MultiTimePicker = ({ label, value, setDeadline }) => (
  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ko'>
    <DatePicker
      inputVariant="outlined"
      onChange={(date) => { setDeadline(date); }}
    />
  </LocalizationProvider>
);
export default MultiTimePicker;
