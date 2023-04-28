import classes from './Odd.module.css';
import CartContext from '../../../store/cart-context';
import { useContext } from 'react';

const Odd = (props) => {
    const cartCtx = useContext(CartContext);
    const title = (props.oddGroup && props.oddGroup.N ? props.oddGroup.N : '?') + ' - ' + (props.odd && props.odd.N ? props.odd.N : ' ? ');
    const clickable = props.type !== 'header' && props.odd && props.odd.O !== '';

    let isSelected;
    if (clickable) {
        isSelected = cartCtx.eventOddMap[props.parentEvent.NID] === props.odd.ID;
    }

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        cartCtx.handleOddClick({
            selectedEvent: props.parentEvent, 
            odd: {...props.odd, eventID: props.parentEvent.NID}
        });
    }

    return (
        <div
            title={title}
            className={`${clickable ? classes.clickable : ''} ${isSelected ? classes.selected : ''}`}
            onClick={clickable ? handleClick : null}
        >
            {props.odd ? (props.type === 'header' ? props.odd.N : props.odd.O) : ''}
        </div>
    );
};

export default Odd;