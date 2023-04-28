import Event from "./Event/Event";
import CartSideModal from "../Cart/CartSideModal";
import CartContext from "../../store/cart-context";
import { useState, useContext, forwardRef, useEffect } from "react";
import { FixedSizeList as List } from "react-window";
//import { List } from "react-virtualized";
import classes from './Bulletin.module.css';
import AutoSizer from "react-virtualized-auto-sizer";

let events = [];
const Row = ({ index }) => {
    return (
        <Event eventItem={events[index]} eventCount={events.length} key={`event_${index}`} index={index} />
    )
};

function handleOnWheel({ deltaY }) {
    // Your handler goes here ...
    console.log("handleOnWheel()", deltaY);
}

const outerElementType = forwardRef((props, ref) => (
    <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const Bulletin = (props) => {
    const cartCtx = useContext(CartContext);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight - 75);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    let isCartVisible = cartCtx.events && cartCtx.events.length > 0;

    //let Row = <div className={classes.loadWarning}>Lütfen bekleyin, bülten yükleniyor...</div>;

    events = props.bulletin;

    const handleResize = () => {
        setWindowHeight(window.innerHeight - 75);
        setWindowWidth(window.innerWidth);
        console.log('handle resize');
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
    }, [])

    return (
        <>
            {/* {props.bulletin.length > 0 ?
                props.bulletin.map((item, index) => {
                    return (
                        <Event eventItem={item} eventCount={props.bulletin.length} key={`event_${index}`} index={index} />
                    )
                })
                :
                <div className={classes.loadWarning}>Lütfen bekleyin, bülten yükleniyor...</div>
            } */}
            {
                props.bulletin.length > 0 ?

                    <AutoSizer>
                        {({ height, width }) => (
                            <List
                                className="List"
                                height={windowHeight}
                                itemCount={events.length}
                                itemSize={56}
                                outerElementType={outerElementType}
                                width={windowWidth}
                            >
                                {Row}
                            </List>


                            // <List
                            //     className="List"
                            //     height={windowHeight}
                            //     rowCount={events.length}
                            //     rowHeight={56}
                            //     outerElementType={outerElementType}
                            //     width={windowWidth}
                            //     rowRenderer={Row}
                            // >
                            //     {Row}
                            // </List>



                        )}
                    </AutoSizer>

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