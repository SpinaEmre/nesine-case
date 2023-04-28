
import classes from './Event.module.css';
import EventHeader from './EventHeader';
import { EMPTY_EVENT_SCHEME } from '../../../assets/schemes';
import EventOdds from './EventOdds';


const Event = (props) => {
    const headerEvent = {
        ...EMPTY_EVENT_SCHEME,
        "D": props.eventItem.D,
        "DAY": props.eventItem.DAY,
        "LN": props.eventItem.LN,
    };

    return (<>
        <div key={props.eventItem.NID} className={classes.eventRow} style={props.newStyle}>
            <EventHeader event={headerEvent} />
            <EventOdds event={props.eventItem} />
        </div>
    </>
    );
};

export default Event;