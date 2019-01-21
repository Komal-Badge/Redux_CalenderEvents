import * as React from 'react';
import "./eventsCalender.css";
import timeJson = require('../../time.json');
import { ITimingListProps } from "./types/ITimingListProps";
import * as moment from 'moment';
import { appStore } from '../../store/AppStore';
import { connect } from 'react-redux';
import { onUpdateEventList } from '../../store/actions/events-actions';
import { Link } from "react-router-dom";
class EventsCalender extends React.Component<ITimingListProps, any> {
    constructor(props: ITimingListProps, context: any) {
        super(props, context);
        this.state = appStore.getState();
    }
    renderTime = () => {
        return (timeJson || []).map((item: any, index: number) => {
            return (
                <tr key={index}>
                    <td className="width20">{item}</td>
                    <td className="width60"></td>
                </tr>
            );
        });
    }
    deleteEvent = (id: any) => {
        let val = confirm("Are you sure you want to delete this event?");
        let data=appStore.getState();
        if (val == true) {
            let eventList = data.name.eventList;
            let currentDate = data.name.date;
            (eventList || []).map((items: any) => {
                if (currentDate == items.date) {
                    (items.events || []).map((event: any, index: number) => {
                        if (event.id.toString().trim() == id.toString().trim()) {
                            items.events.splice(index, 1)
                        }
                    })
                }
            }
            );
            if(eventList){
                localStorage.setItem("eventList", JSON.stringify(eventList));
            }
            window.location.reload();
        }
    }
    renderEvents = () => {
        let currentDate = appStore.getState().name.date;
        let eventListItems;
        let eventsJson = [];
        if (this.state) {
            if (this.state.name.eventList) {
                eventsJson = this.state.name.eventList;
            }
        }
        let eventsList = (eventsJson || []).filter((items: any) =>
            currentDate.toString() == items.date.toString()
        );
        if (eventsList.length > 0) { eventListItems = eventsList[0].events }
        return (eventListItems || []).map((item: any, index: number) => {
            let startTime = moment(item.startTime, "HH:mm A");
            let endTime = moment(item.endTime, "HH:mm A");
            let diffInHrs = endTime.diff(startTime, 'hours');
            let diffInMins = moment.utc(moment(endTime, "HH:mm A").diff(moment(startTime, "HH:mm"))).format("mm");
            let startTimeHr = startTime.hour();
            let startTimeMin = startTime.minute();
            if (startTimeMin == 0) { startTimeMin = 17 }
            let topStyle = ((startTimeHr - 1) * 40) + startTimeHr + (startTimeMin);
            let tempDiff = diffInHrs - 1;
            let timeInMins = (tempDiff * 40) + (40) + tempDiff + parseInt(diffInMins);
            if (timeInMins < 25) { timeInMins = 25 }
            let divStyle = {
                top: topStyle,
                border: "3px solid #c1dae8",
                backgroundColor: "honeydew",
                marginLeft: "10%",
                width: "80%",
                height: timeInMins,
            };
            return (
                <div key={index} style={divStyle} className="position">
                    <table className="table fontSizeTable">
                        <tbody>
                            <tr>
                                <td className="width20">
                                    {item.startTime} -- {item.endTime}
                                </td>
                                <td>
                                    {item.title}
                                </td>
                                <td className="width10" >
                                    <Link to={{ pathname: '/addEvent', param: { "formData": item }, heading: "Update" }}   > <i className="fa fa-pencil fontSize" aria-hidden="true"></i></Link>
                                </td>
                                <td className="width10" onClick={() => this.deleteEvent(item.id)}>
                                    <i className="fa fa-close fontSize" aria-hidden="true"></i>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        });
    }
    render() {
        return (
            <div className="header tableOuter ">
                <table className="table borderTd">
                    <tbody>
                        {this.renderTime()}

                    </tbody>
                </table>
                {this.renderEvents()}
            </div>
        )
    }
}
const mapStateToProps = () => ({
    onUpdateEventList: onUpdateEventList
})

export default connect(mapStateToProps)(EventsCalender);

