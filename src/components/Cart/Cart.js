import { useContext } from "react";
import CartItem from "./CartItem";
import CartSubTotal from "./CartSubTotal";
import CartContext from "../../store/cart-context";
import classes from './Cart.module.css';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);

    return (
        <div className={classes.cart}>
            {cartCtx.events.map((event) => {
                const [selectedOdd] = cartCtx.odds.filter((odd) => odd.eventID === event.NID);
                return <CartItem
                    key={`cart_event${event.NID}`}
                    event={event}
                    odd={selectedOdd}
                />
            })
            }
            <CartSubTotal totalRatio={cartCtx.totalRatio} />
        </div>
    );
};

export default Cart;