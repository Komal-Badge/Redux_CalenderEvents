import { appStore } from '../../store/AppStore';
export const UPDATE_LIST = 'event:updateList';
export const ADDEVENT = 'event:addEvent';

export function onUpdateEventList(currentDate: any) {
    return {
        type: UPDATE_LIST,
        payload: {
            event: currentDate
        }
    }
}
export function addEvent(eventData: any) {
    appStore.dispatch({
        type: ADDEVENT,
        payload: {
            eventList: eventData.eventList
        }
    })
}
