import OddGroup from "../OddGroup/OddGroup";
import EventCell from "./EventCell";
import classes from './Event.module.css';
import ConditionalWrapper from "../../UI/ConditionalWrapper";

const EventHeader = (props) => {
    const title = `${props.event.D} ${props.event.DAY} ${props.event.LN}`;

    return (
        <>
            <ConditionalWrapper
                condition={props.wrapWithEventContainer}
                wrapper={children =>
                    <div className={`${classes.eventRow} ${props.wrapperType === 'mainHeaderWrapper' ? classes.mainHeaderWrapper : ''}`}>{children}</div>}
            >
                <EventCell className={props.firstCellClass && props.firstCellClass} content={title} />
                <EventCell content="Yorumlar" />
                <EventCell content="" />
                <OddGroup event={props.event} oddGroup="1" type="header" />
                <OddGroup event={props.event} oddGroup="5" type="header" />
                <OddGroup event={props.event} oddGroup="103" type="header" />
                <OddGroup event={props.event} oddGroup="2" type="header" />
                <OddGroup event={props.event} oddGroup="104" type="header" />
            </ConditionalWrapper >
        </>
    );
};

export default EventHeader;