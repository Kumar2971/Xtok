import React from "react";

import {
    Box,
    Typography,
} from "@material-ui/core";
import { timer } from "./assets";
import { COLORS } from "../../../framework/src/Globals";
import { EventListItem } from "./LiveFeedSchedulingController";
import moment from "moment";

export const LiveFeedItem = (props: { item: EventListItem, onEditClick: () => void, onDeleteClick: () => void }) => {

    const getStartTimerInText = (item: EventListItem) => {
        let finalDats = item.attributes?.start_date?.split('-')?.reverse()?.join('-')
        let stringDats = new Date(`${finalDats}T${newConvertTime(item?.attributes?.start_time)}`)
        let dateOb = moment(stringDats, "YYYY-MM-DDTHH:mm").toDate().getTime();
        let finalTimeInMil = dateOb - new Date().getTime()
        return new Date(finalTimeInMil).toISOString().slice(11, 19);
    }

    const newConvertTime = (newTimeStr: string) => {

        const [newTime, newModifier] = newTimeStr?.split(' ');
        let [hour, minute] = newTime.split(':');
        if (hour === '12') {
            hour = '00';
        }

        if (newModifier === 'PM') {
            hour = `${parseInt(hour, 10) + 12}`;
        }
        return `${hour}:${minute}`;
    };

    return (
        <Box sx={{ flex: 1, width: '100%', alignSelf: 'center', marginBottom: 15 }}>
            <Box sx={webStyle.newEventContainer}>
                <Typography style={{ marginBottom: 5 }}>
                    {props.item.attributes.event_name}
                </Typography>
                <Typography style={{ marginBottom: 5 }}>
                    {props.item.attributes.description}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: 10,
                        marginBottom: 10,
                        alignItems: 'center'
                    }}
                >
                    <img
                        src={timer}
                        style={{ height: 20, width: 20, marginRight: 10 }}
                    />
                    <Typography style={{ color: "grey" }}>{"Starts in - "}</Typography>
                    <Typography>{getStartTimerInText(props.item)}</Typography>
                    <div style={{ cursor: 'pointer' }} onClick={props.onEditClick}>
                        <Typography style={{ textAlign: "right", marginLeft: 20 }}>
                            Edit
                        </Typography>
                    </div>
                    <div style={{ cursor: 'pointer' }} onClick={props.onDeleteClick}>
                        <Typography style={{ textAlign: "right", marginLeft: 20 }}>
                            Delete
                        </Typography>
                    </div>
                </Box>
            </Box>
        </Box>
    );
}

const webStyle = {
    newEventContainer: {
        backgroundColor: "white",
        borderWidth: 1.3,
        borderColor: COLORS.yellow,
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 0.1,
        elevation: 5,
        border: '1px solid black',
    },
};