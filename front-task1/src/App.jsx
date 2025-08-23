import { useState } from "react";
import "./App.css";

export default function App() {
  const [products, setProducts] = useState([
    {
      id: 101,
      title: "Laptop",
      price: 750,
      quantity: 1,
      picture: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    },
    {
      id: 102,
      title: "Headphones",
      price: 50,
      quantity: 1,
      picture: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MQTQ3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=dkp4djAxbnA1NnpYWDIvVklnLzRpUWtuVHYzMERCZURia3c5SzJFOTlPZ3oveDdpQVpwS0ltY2w2UW05aU90T1lYTmlwOFY3ZXdFd0FRY2dWaUc5UlE",
    },
    {
      id: 103,
      title: "Smartphone",
      price: 600,
      quantity: 1,
      picture: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    },
    {
      id: 104,
      title: "Keyboard",
      price: 40,
      quantity: 1,
      picture: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    },
    {
      id: 105,
      title: "Mouse",
      price: 25,
      quantity: 1,
      picture: "https://www.power-x.in/cdn/shop/files/Front.jpg?v=1737709078",
    },
    {
      id: 106,
      title: "Monitor",
      price: 200,
      quantity: 1,
      picture: "https://alogic.in/cdn/shop/files/ClarityMax32_UHD4KMonitorwith65WPowerDelivery_v1_1.webp?v=1723102737&width=2048",
    },
    {
      id: 107,
      title: "Tablet",
      price: 300,
      quantity: 1,
      picture: "https://media.tatacroma.com/Croma%20Assets/Computers%20Peripherals/Tablets%20and%20iPads/Images/265565_ituyae.png",
    },
    {
      id: 108,
      title: "Camera",
      price: 500,
      quantity: 1,
      picture: "https://images-cdn.ubuy.co.in/65fe64a89de64a706c0120dc-canon-eos-5d-mark-iv-dslr-camera-with.jpg",
    },
    {
      id: 109,
      title: "Printer",
      price: 150,
      quantity: 1,
      picture: "https://webobjects2.cdw.com/is/image/CDW/8107149?$product-main$",
    },
    {
      id: 110,
      title: "Speaker",
      price: 80,
      quantity: 1,
      picture: "https://m.media-amazon.com/images/I/81oRzXfs2zL._UF1000,1000_QL80_.jpg",
    },
  ]);

  const [basket, setBasket] = useState([]);
  const movetoCart = (product) => {
    const found = basket.find((item) => item.id == product.id);
    if (!found) {
      setBasket([...basket, product]);
      return;
    }
    setBasket(
      basket.map((elm) => elm.id == product.id? {...elm, quantity: elm.quantity + 1}: elm)
    );
  };
  const sort = key => {
    if (key != 'subtotal') {
      setBasket([...basket.sort((a, b) => a[key] - b[key])]);
    }
    else {
      setBasket([...basket.sort((a, b) => (a.price * a.quantity) - (b.price * b.quantity))])
    }
  }
  const update = (product, operation) => {
    if (operation == "+") {
      setBasket(
        basket.map((item) =>
          item == product
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else if (operation == "-") {
      setBasket(
        basket.map((item) =>
          item == product
            ? {
                ...item,
                quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity
              }
            : item
        )
      );
    } else {
      setBasket(basket.filter((item) => item.id != product.id));
    }
  };

  return (
    <div className="">
      <h1 className="title">Shopping Card</h1>
      <div className="app-box">
        <div className="product-box">
          <h2>Product</h2>
          <div className="products">
            {products.map((product) => (
              <div key={product.id} className="product">
                <b className="product-title">{product.title}</b>
                <img className="img" src={product.picture} alt={product.title} />
                <span className="price">{product.price}</span>
                <button onClick={() => movetoCart(product)}>add basket</button>
              </div>
            ))}
          </div>
        </div>
        <div className="basket-box">
          <h4>Basket</h4>
          <table className="table">
            <thead className="thead">
              <tr>
                <th>product</th>
                <th onClick={() => sort("quantity")}>quantity</th>
                <th onClick={() => sort("subtotal")}>subtotal</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {basket.map((item) => (
                <tr key={item.id}>
                  <td className="item-title">{item.title}</td>
                  <td className="item-quantity">{item.quantity}</td>
                  <td className="item-subtotal">{item.price * item.quantity} USD</td>
                  <td>
                    <button onClick={() => update(item, "+")}>+</button>
                    <button onClick={() => update(item, "-")}>-</button>
                    <button onClick={() => update(item, "x")}>x</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
