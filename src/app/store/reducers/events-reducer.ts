import { ADDEVENT } from "../actions/events-actions";

const eventsReducer = (state: any, action: any) => {
    let newState = [];
    if (!state) {
        state = null
    }
    switch (action.type) {
        case ADDEVENT:
            newState = action.payload.eventList;
            localStorage.setItem("eventList", JSON.stringify(newState))
            return newState;
        default:
            return state;
    }
}

export default eventsReducer;