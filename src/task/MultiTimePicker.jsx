import React, { useState } from 'react';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import koLocale from 'date-fns/locale/ko';

const MultiTimePicker = (props) => {
  const [selectedDate, setDate] = useState(new Date());
  const getDeadlineValue = (date) => {
    props.getDeadlineValue(date);
  };

  return (
    <MuiPickersUtilsProvider locale={koLocale} utils={DateFnsUtils}>
      <KeyboardDateTimePicker
        variant="dialog"
        minutesStep={15}
        label={props.label}
        inputVariant="outlined"
        value={selectedDate}
        onChange={setDate}
        onAccept={getDeadlineValue}
        onError={console.log}
        disablePast
        format="yyyy/MM/dd aa h:mm "
      />
    </MuiPickersUtilsProvider>
  );
}
export default MultiTimePicker;