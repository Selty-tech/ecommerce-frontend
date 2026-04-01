import { CartItemDetails } from './CartItemDetails';
import { DeliveryOPtions } from './DeliveryOptions';
import { DeliveryDate } from './DeliveryDate';

export function OrdersSummary({ cart, deliveryOptions, loadCart, deleteCartItem}) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          return (
            <div key={cartItem.productId} className="cart-item-container">
              <DeliveryDate
                cartItem={cartItem}
                deliveryOptions={deliveryOptions}
              />
              <div className="cart-item-details-grid">
                <CartItemDetails 
                  cartItem={cartItem}
                  deleteCartItem={deleteCartItem} 
                />
                <DeliveryOPtions
                  cartItem={cartItem}
                  deliveryOptions={deliveryOptions}
                  loadCart={loadCart}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
