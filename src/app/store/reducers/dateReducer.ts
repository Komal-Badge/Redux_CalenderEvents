import { Name } from "../../model/Name";
import { UPDATE_LIST } from "../actions/events-actions";
const dateReducer = (state: any, action: any) => {
    if (!state) {
        state = null
    }
    switch (action.type) {
        case UPDATE_LIST:
            return action.payload.event;
        default:
            return state;
    }
}

export default dateReducer;