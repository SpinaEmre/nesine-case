import Event from "./Event/Event";
import CartSideModal from "../Cart/CartSideModal";
import CartContext from "../../store/cart-context";
import { useState, useContext, forwardRef, useEffect, createContext } from "react";
import { FixedSizeList as List } from "react-window";
import classes from './Bulletin.module.css';
import { EMPTY_EVENT_SCHEME } from "../../assets/schemes";
import EventHeader from "./Event/EventHeader";

let events = [];

const StickyListContext = createContext();
StickyListContext.displayName = "StickyListContext";

const ItemWrapper = ({ data, index, style }) => {
    const { ItemRenderer, stickyIndices } = data;
    if (stickyIndices && stickyIndices.includes(index)) {
        return null;
    }
    return <ItemRenderer index={index} style={style} />;
};

const Row = ({ index, style }) => {
    return (
        <Event eventItem={events[index]} eventCount={events.length} key={`event_${index}`} index={index} newStyle={style} />
    )
};

const StickyRow = ({ index, style }) => {
    return (
        <EventHeader
            event={{...EMPTY_EVENT_SCHEME, LN: events.length}}
            wrapWithEventContainer="true"
            wrapperType="mainHeaderWrapper"
        />
    )
};

const innerElementType = forwardRef(({ children, ...rest }, ref) => (
    <StickyListContext.Consumer>
        {({ stickyIndices }) => (
            <div ref={ref} {...rest}>
                {stickyIndices.map(index => (
                    <StickyRow
                        index={index}
                        key={index}
                        style={{ top: index * 35, left: 0, width: "100%", height: 35 }}
                    />
                ))}
                {children}
            </div>
        )}
    </StickyListContext.Consumer>
));

const StickyList = ({ children, stickyIndices, ...rest }) => (
    <StickyListContext.Provider value={{ ItemRenderer: children, stickyIndices }}>
        <List itemData={{ ItemRenderer: children, stickyIndices }} {...rest}>
            {ItemWrapper}
        </List>
    </StickyListContext.Provider>
);

const Bulletin = (props) => {
    const cartCtx = useContext(CartContext);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    let isCartVisible = cartCtx.events && cartCtx.events.length > 0;

    events = props.bulletin;

    const handleResize = () => {
        setWindowHeight(window.innerHeight);
        setWindowWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
    }, [])

    return (
        <>
            {
                props.bulletin.length > 0 ?
                    <StickyList
                        innerElementType={innerElementType}
                        height={windowHeight}
                        itemCount={events.length}
                        itemSize={56}
                        stickyIndices={[0]}
                        width={windowWidth}
                    >
                        {Row}
                    </StickyList>
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