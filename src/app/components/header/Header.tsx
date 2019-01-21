import * as React from 'react';
import "./header.css";
import { DateProps } from "./types/dateProps";
import { DateState } from "./types/dateState";
import { connect } from 'react-redux';
import { onUpdateEventList } from "../../store/actions/events-actions";
import * as moment from 'moment';
import { Link } from "react-router-dom";
class Header extends React.Component<DateProps, DateState> {
    constructor(props: DateProps, context: any) {
        super(props, context);
        this.state = { "addButtonLogic": "hrefDecoration", "currentDate": this.props.currentDate }
    }

    showUpdatedDate = (flag: string) => {
        let newDate = "";
        if (flag == "prev") {
            newDate = moment(this.props.currentDate).subtract(1, 'days').format('DD MMM, YYYY');
        } else if (flag == "next") {
            newDate = moment(this.props.currentDate).add(1, 'days').format('DD MMM, YYYY');
        } else {
            newDate = moment(new Date()).format('DD MMM, YYYY');
        }
        this.props.updateState(newDate);
        this.props.onUpdateEventList({
            date: newDate
        });
        this.setAddButton(newDate);
    }
    setAddButton = (newDate: any) => {
        if ((moment(newDate).format("DD/MM/YYYY")) >= (moment(new Date()).format("DD/MM/YYYY"))) {
            this.setState({ "addButtonLogic": "hrefDecoration" });
        } else {
            this.setState({ "addButtonLogic": "hideButton" })
        }
    }
    render() {
        let currenDate = this.props.currentDate;
        let formData = { "title": "", "startTimeMin": "", "startTimeHr": "", "endTimeHr": "", "endTimeMin": "", "startTime": "AM", "endTime": "AM", "allDay": "" };
        return (
            <div className="header">
                <table className="table headerSeparater">
                    <tbody>
                        <tr>
                            <td className="width10">
                                <button className="button" onClick={() => this.showUpdatedDate("prev")}> <i className="fa fa-angle-left iconSize" ></i></button>
                                <button className="button" onClick={() => this.showUpdatedDate("next")}><i className="fa fa-angle-right iconSize" ></i></button>
                            </td>
                            <td className="width40">
                                <button className="button buttonOuter" onClick={() => this.showUpdatedDate("todaysDate")}>Today</button>
                            </td>
                            <td className="width45 headingFont">{currenDate}</td>
                            <td className="width5">
                                <Link to={{ pathname: '/addEvent', param: { formData }, "heading": "Add" }} className={this.state.addButtonLogic}> <button className="button buttonOuter" >Add</button></Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
const mapActionsToProps = {
    onUpdateEventList: onUpdateEventList,
};

export default connect(undefined, mapActionsToProps)(Header);