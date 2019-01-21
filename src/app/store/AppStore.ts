import { createStore } from 'redux';
import allReducers from "./reducers/AllReducers";
import { Name } from "../model/Name";
import * as moment from 'moment';
import eventsJson = require('../events.json');
let todaysDate = (new Date());
let eventList;
if (JSON.parse(localStorage.getItem("eventList"))) {
    eventList = JSON.parse(localStorage.getItem("eventList"));
} else {
    eventList = (eventsJson);
    localStorage.setItem("eventList", JSON.stringify(eventList));
}
this.state = {
    currentDate: moment(todaysDate).format("DD MMM, YYYY"),
    eventList: eventList
}

export interface IAppState {
    name: Name
}
const INITIAL_STATE: IAppState = {
    name: { "date": this.state.currentDate, "eventList": this.state.eventList }
}
const appStore = createStore(
    allReducers,
    INITIAL_STATE as any,
    ((window) as any).devToolsExtension &&
    ((window) as any).devToolsExtension());
export { appStore };