import React,{ createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    },
    wish: {
        wishItems: localStorage.getItem('wishItems') ? JSON.parse(localStorage.getItem('wishItems')) : [], //empty wish default
    }
};

function reducer(state, action) {
    switch (action.type) {
        case 'CART_ADD_ITEM': {
            
            //add to cart
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find((item) => item._id === newItem._id);
            const cartItems = existItem ? state.cart.cartItems.map((item) => item._id === existItem._id ? newItem : item) : [...state.cart.cartItems, newItem];
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return { ...state, cart: { ...state.cart, cartItems } };
        }

        case 'WISH_ADD_ITEM': {
            //add to wish
            const newItem = action.payload;
            const existItem = state.wish.wishItems.find((item) => item._id === newItem._id);
            const wishItems = existItem ? state.wish.wishItems.map((item) => item._id === existItem._id ? newItem : item) : [...state.wish.wishItems, newItem];
            localStorage.setItem('wishItems', JSON.stringify(wishItems));
            return {...state, wish: {...state.wish, wishItems: [...state.wish.wishItems, action.payload]}};
            }

        case 'CART_REMOVE_ITEM': {
            const cartItems = state.cart.cartItems.filter((item) => item._id !== action.payload._id);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            return { ...state, cart: { ...state.cart, cartItems } };
        }

        case 'CART_CLEAR':
            return { ...state, cart: { ...state.cart, cartItems: [] } };

        case 'WISH_REMOVE_ITEM': {
            const wishItems = state.wish.wishItems.filter((item) => item._id !== action.payload._id);
            localStorage.setItem('wishItems', JSON.stringify(wishItems));
            return { ...state, wish: { ...state.wish, wishItems } };
        }

        default:
            return state;
    }
}

export function StoreProvider(props) {
    const[state, dispatch] = useReducer(reducer, initialState);
    const value = {state, dispatch};

    return <Store.Provider value={value}>{props.children}</Store.Provider>


}


// import {ADD_CART_ITEM, REMOVE_CART_ITEM, UPDATE_CART_ITEM_COUNT } from "./action-types";

// export default (state, action) =>{
//     switch(action.type){
//         case ADD_CART_ITEM:
//             return [...state, action.payload];
//         case REMOVE_CART_ITEM:
//             let currrentState=  state.filter(item => item.id !== action.payload.id);
//             return currrentState;
//         case UPDATE_CART_ITEM_COUNT:
//             var index = state.findIndex(x=> x.id === action.payload.id);
//             return [...state.slice(0,index),
//             Object.assign( state[index], action.payload),
//             ...state.slice(index+1)]
//         default:
//             return state;
//     }
// }