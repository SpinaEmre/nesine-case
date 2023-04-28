import Event from "./Event/Event";
import CartSideModal from "../Cart/CartSideModal";
import CartContext from "../../store/cart-context";
import { useContext } from "react";
import classes from './Bulletin.module.css';

const Bulletin = (props) => {
    const cartCtx = useContext(CartContext);
    let isCartVisible = cartCtx.events && cartCtx.events.length > 0;

    return (
        <>
            {props.bulletin.length > 0 ?
                props.bulletin.map((item, index) => {
                    return (
                        <Event eventItem={item} eventCount={props.bulletin.length} key={`event_${index}`} index={index} />
                    )
                })
                :
                <div className={classes.loadWarning}>Lütfen bekleyin, bülten yükleniyor...</div>
            }
            
            {isCartVisible && 
                <CartSideModal />
             }
        </>
    );
};

export default Bulletin;