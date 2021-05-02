import React, { useState } from 'react';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import koLocale from 'date-fns/locale/ko';

const MultiTimePicker = ({ label, getDeadlineValue }) => {
  const [selectedDate, setDate] = useState(new Date());

  return (
    <MuiPickersUtilsProvider locale={koLocale} utils={DateFnsUtils}>
      <KeyboardDateTimePicker
        variant="dialog"
        minutesStep={15}
        label={label}
        inputVariant="outlined"
        value={selectedDate}
        onChange={setDate}
        onAccept={(date) => getDeadlineValue(date)}
        onError={console.log}
        disablePast
        format="yyyy/MM/dd aa h:mm "
      />
    </MuiPickersUtilsProvider>
  );
};
export default MultiTimePicker;
