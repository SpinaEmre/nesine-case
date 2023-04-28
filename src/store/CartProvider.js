import { useState, useReducer } from 'react';
import CartContext from "./cart-context";

const defaultCartState = {
    odds: [],
    events: [],
    eventOddMap: {},
    totalRatio: 1
};

const cartReducer = (state, action) => {
    if (action.type === 'TOGGLE') {

        const existingOddIndex = state.odds.findIndex(
            (selectedOdd) => selectedOdd.ID === action.odd.ID && selectedOdd.eventID === action.event.NID
        )

        const existingEventIndex = state.events.findIndex(
            (event) => event.NID === action.event.NID
        )

        const existingEvent = state.events[existingEventIndex];
        const existingOdd = state.odds[existingOddIndex];

        let updatedEvents = [];
        let updatedOdds = [];
        let updatedEventOddMap = {};

        if (existingOdd) {
            updatedOdds = state.odds.filter(
                (item) => item.eventID !== action.odd.eventID
            );

            updatedEvents = state.events.filter(
                (item) => item.NID !== action.event.NID
            )

            updatedEventOddMap = {...state.eventOddMap};
            delete updatedEventOddMap[action.event.NID];
        }

        if (!existingOdd && existingEvent) {
            updatedOdds = state.odds.filter(
                (item) => item.eventID !== action.odd.eventID
            )

            updatedOdds = updatedOdds.concat(action.odd);
            updatedEvents = [...state.events];
            updatedEventOddMap = {...state.eventOddMap};
            updatedEventOddMap[existingEvent.NID] = action.odd.ID;
        }

        if (!existingEvent && !existingOdd) {
            updatedOdds = state.odds.concat(action.odd);
            updatedEvents = state.events.concat(action.event);
            updatedEventOddMap = {...state.eventOddMap};
            updatedEventOddMap[action.event.NID] = action.odd.ID;
        }

        const updatedTotalRatio = updatedOdds.reduce((currRat, nextRat) => { return currRat * +nextRat.O}, 1).toFixed(2);

        return {
            events: updatedEvents,
            odds: updatedOdds,
            eventOddMap: updatedEventOddMap,
            totalRatio: updatedTotalRatio
        };
    }

    return defaultCartState;
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const handleToggleOdd = (event) => {
        dispatchCartAction({
            type: 'TOGGLE',
            event: event.selectedEvent,
            odd: event.odd
        });
    };

    const cartContext = {
        events: cartState.events,
        odds: cartState.odds,
        eventOddMap: cartState.eventOddMap,
        totalRatio: cartState.totalRatio, 
        handleOddClick: handleToggleOdd
    };

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;