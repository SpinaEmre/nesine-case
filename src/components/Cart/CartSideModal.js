import React from "react";
import ReactDOM from "react-dom";
import Cart from "./Cart";

const CartSideModal = (props) => {
    return (
        <>
            {ReactDOM.createPortal(
                <Cart />,
                document.getElementById('cartWrapper')
            )}
        </>
    );
};

export default CartSideModal;