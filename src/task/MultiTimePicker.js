import React, { useState } from 'react';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import koLocale from 'date-fns/locale/ko';

const MultiTimePicker = ({ label, value, getDeadlineValue }) => {
  const [selectedDate, setDate] = useState(value);

  return (
    <MuiPickersUtilsProvider locale={koLocale} utils={DateFnsUtils}>
      <KeyboardDateTimePicker
        variant="dialog"
        label={label}
        inputVariant="outlined"
        value={selectedDate}
        onChange={(date) => { setDate(date); }}
        onAccept={(date) => { getDeadlineValue(date); }}
        onError={console.log}
        disablePast
        format="yyyy/MM/dd aa h:mm "
      />
    </MuiPickersUtilsProvider>
  );
};
export default MultiTimePicker;
