import axios from 'axios';
import { Fragment, useState } from "react";
import { formatMoney } from "../../utils/money";

export function CartItemDetails({cartItem , loadCart}) {
  const [quantity , setQuantity] = useState(cartItem.quantity);
  const [isUpdated , setIsUpdated] = useState(false);

  const keyDown = function (e) {
    if(e.key === 'Enter') {
      updateCartItem();
    }
    if(e.key === 'Escape') {
      setQuantity(cartItem.quantity);
      setIsUpdated(false);
    }
  }

  const getQuantity = function (e) {
    setQuantity(e.target.value)
  }

  const updateQuantity = async () => {
      await axios.put(`/api/cart-items/${cartItem.productId}` , {quantity: Number(quantity)})
      await loadCart();
    }

  const updateCartItem = function () {
    if(isUpdated) {
      updateQuantity() 
      setIsUpdated(false);
  }else{
    setIsUpdated(true);
  }
  } 

  const deleteCartItem = async() => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`)
    await loadCart();
  }
  return (
    <Fragment>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            {isUpdated ? <input type='text' className='quantity-input' value={quantity} onChange={getQuantity} onKeyDown={keyDown}/> : <span className="quantity-label">{cartItem.quantity}</span>}
          </span>
          <span className="update-quantity-link link-primary" onClick={updateCartItem}>Update</span>
          <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>Delete</span>
        </div>
      </div>
    </Fragment>
  );
}
