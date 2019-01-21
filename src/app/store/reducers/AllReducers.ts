import {combineReducers} from "redux";
import eventsReducer from "./events-reducer";
import dateReducer from "./dateReducer";

const allReducers = combineReducers({
    eventList: eventsReducer,
    name: dateReducer
});

export default allReducers;