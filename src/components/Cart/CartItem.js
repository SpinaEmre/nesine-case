import classes from './CartItem.module.css';

const CartItem = (props) => {
    return (
        <div className={classes.cartItem}>
            <span>{props.odd.MBS} Kod: {props.event.C} | Maç: {props.event.N}</span> | <span className={classes.bold}>Oran: {props.odd.O}</span>
        </div>
    );
};

export default CartItem;