import classes from './CartSubTotal.module.css';

const CartSubTotal = (props) => {
    return (
        <div className={classes.cartSubTotal}>
        Toplam Tutar: {props.totalRatio} TL
        </div>
    );
};

export default CartSubTotal;