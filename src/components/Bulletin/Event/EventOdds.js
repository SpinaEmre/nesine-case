import EventCell from "./EventCell";
import OddGroup from "../OddGroup/OddGroup";
import classes from './EventOdds.module.css'

const EventOdds = (props) => {
    const title = <strong>{props.event.C}</strong>; 
    const suffix = `${props.event.T} ${props.event.N}`;

    return (
        <>
            <EventCell>
                <span><span className={classes.bold}>{props.event.C} </span><span>{props.event.T} {props.event.N}</span></span>
            </EventCell>
            <EventCell content="Yorumlar" />
            <EventCell content="4" /> 
            {/* This is hard coded just because I don't know which MBS ratio to use. The event does not have a root value and all odds have their own MBS values. But we're not displaying MBS values for every odd. */}
            <OddGroup event={props.event} oddGroup="1" />
            <OddGroup event={props.event} oddGroup="5" />
            <OddGroup event={props.event} oddGroup="103" />
            <OddGroup event={props.event} oddGroup="2" />
            <OddGroup event={props.event} oddGroup="104" />
        </>
    );
};

export default EventOdds;