import { ADDEVENT } from "../actions/events-actions";

const eventsReducer = (state: any, action: any) => {
    let newState = [];
    if (!state) {
        state = null
    }
    switch (action.type) {
        case ADDEVENT:
            if (action.payload.eventList) {
                newState = action.payload.eventList;
                localStorage.setItem("eventList", JSON.stringify(newState))
            }else{
                newState=state;
            }
            return newState;
        default:
            return state;
    }
}

export default eventsReducer;