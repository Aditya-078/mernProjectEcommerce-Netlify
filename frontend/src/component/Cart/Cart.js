import React, { Fragment, useState } from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";
import { validateCoupon } from "../../actions/couponAction";

const Cart = ({ history }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  const applyCoupon = () => {
    setCouponError(''); // Clear any previous error
    dispatch(validateCoupon(couponCode))
      .then((response) => {
        console.log('Coupon validation response:', response); // Check what the actual response is
        if (response && response.success) {
          setDiscount(response.discountPercentage); // Update the discount state
          setIsCouponApplied(true); // Update the coupon applied state
        } else {
          // Handle case where success is false or undefined
          setCouponError(response?.message || 'Coupon is not valid');
          setIsCouponApplied(false);
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the API call
        console.error('Error validating coupon:', error);
        setCouponError(error?.response?.data?.message || 'Failed to apply coupon');
        setIsCouponApplied(false);
      });
  };

  const increaseQuantity = (id, quantity, stock) => {
    if (stock > quantity) {
      dispatch(addItemsToCart(id, quantity + 1));
    }
  };

  const decreaseQuantity = (id, quantity) => {
    if (quantity > 1) {
      dispatch(addItemsToCart(id, quantity - 1));
    }
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const getTotalPrice = () => {
    const subtotal = cartItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    const totalDiscount = isCouponApplied ? (subtotal * discount) / 100 : 0;
    return subtotal - totalDiscount;
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };
  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems.map((item) => (
              <div className="cartContainer" key={item.product}>
                <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                <div className="cartInput">
                  <button onClick={() => decreaseQuantity(item.product, item.quantity)}>
                    -
                  </button>
                  <input type="number" value={item.quantity} readOnly />
                  <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>
                    +
                  </button>
                </div>
                <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
              </div>
            ))}

       <div className="couponSection">
          <input
            type="text"
            placeholder="Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            disabled={isCouponApplied}
          />
          <button onClick={applyCoupon} disabled={isCouponApplied}>Apply</button>
          {couponError && <p className="couponError">{couponError}</p>}
        </div>

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${getTotalPrice()}`}</p>
              </div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
