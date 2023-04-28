import React from "react";

const CartContext = React.createContext({
    odds: [],
    events: [],
    eventOddMap: {},
    totalRatio: 1,
    handleOddClick: (selectedEvent, odd) => {}
});

export default CartContext;