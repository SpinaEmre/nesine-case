const EventCell = (props) => {
    return (
        <div>
            {props.content ? props.content : props.children}
        </div>
    );
};

export default EventCell;