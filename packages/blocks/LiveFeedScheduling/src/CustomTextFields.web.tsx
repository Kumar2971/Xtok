import React, { useState } from "react";

import {
    Input,
} from "@material-ui/core";

import {
    TimePicker,
    DatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import MomentUtils from "@date-io/moment";
import moment, { isDuration } from "moment";

export const TextInputField = (props: { textValue: string, field_name: string, multiline: boolean, field_type: string, handleInputChange: (text: string | undefined) => void }) => {
    const [textValue, setTextValue] = useState(props.textValue ?? '')
    return (
        <Input
            data-test-id="txtInputText"
            multiline={props.multiline}
            style={{ height: props.multiline ? '120px' : 'auto' }}
            defaultValue={textValue}
            value={textValue}
            placeholder={props.field_name ?? ""}
            fullWidth={true}
            onChange={(event: { target: { value: string } }) => {
                props.handleInputChange(event.target.value)
                setTextValue(event.target.value)
            }
            }
        />
    );
}


export const DatePickerField = (props: { isEdit: boolean, date: string, field_name: string, handleInputChange: (text: string | undefined) => void }) => {
    const [date, setDate] = useState<string | null>(props.date ?? null);

    return (
        <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                    data-test-id="txtInputAvailableDate"
                    placeholder="DD-MM-YYYY"
                    format={"DD-MM-YYYY"}
                    fullWidth
                    value={date ? moment(date, "DD-MM-YYYY") : null}
                    onChange={(availableDate) => {
                        setDate(availableDate);
                        props.handleInputChange(moment(availableDate).format("DD-MM-YYYY"));
                    }}
                    animateYearScrolling
                />
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    );
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#000000',
        },
    },
});

export const TimePickerField = (props: {format:string, isEdit: boolean, time: string, field_name: string, isDuration: boolean, handleInputChange: (event: string | undefined) => void }) => {
    const [time, setTime] = useState<string | null>(props.time ?? null);
    return (
        <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <TimePicker
                    data-test-id="txtInputAvaialblefrom"
                    placeholder={props.isDuration ? "hh:mm" : "hh:mm A"}
                    format={props.format}
                    fullWidth

                    value={time ? moment(time, props.format) : null}
                    onChange={(available_from) => {
                        setTime(available_from);
                        props.handleInputChange(moment(available_from).format(props.isDuration ? "hh:mm" : "hh:mm A"));
                    }}
                />
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    );

}