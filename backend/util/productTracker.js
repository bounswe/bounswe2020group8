const ProductDataAccess = require("../dataAccess/product");
const WatcherDataAccess = require("../dataAccess/watcher");
const NotificationWare = require("../util/notification");

exports.registerProductInfo = async function ({ pid, vid, vendorData }) {
  let new_price = vendorData.price;
  let new_amount = vendorData.amountLeft;
  let clients = await WatcherDataAccess.getAllClientsOfAProductAndAVendor(pid, vid);
  let product_before_state = await ProductDataAccess.getProductByProductIDAndVendorID(pid, vid);
  product_before_state = product_before_state[0];
  if (new_price !== undefined && clients.length !== 0) {
    let price = product_before_state.vendorInfo.price;
    let ratio = (price - new_price) / price;
    if (ratio >= 0.1 && ratio < 0.25) {
      let hyperlink = `/product/${product_before_state.parentProduct}`;
      let notification = await NotificationWare.createNotification(
        "PRICE_DOWN_BELOW_THRESHOLD",
        hyperlink,
        `Previous price: ${price} -> New price: ${new_price}`
      );
      for (let i = 0; i < clients.length; i++) {
        await NotificationWare.registerNotification(clients[i].client_id, notification);
      }
    } else if (ratio >= 0.25 && ratio < 0.5) {
      let hyperlink = `/product/${product_before_state.parentProduct}`;
      let notification = await NotificationWare.createNotification(
        "PRICE_STRICTLY_DOWN_BELOW_THRESHOLD",
        hyperlink,
        `Previous price: ${price} -> New price: ${new_price}`
      );
      for (let i = 0; i < clients.length; i++) {
        await NotificationWare.registerNotification(clients[i].client_id, notification);
      }
    } else if (ratio >= 0.5) {
      let hyperlink = `/product/${product_before_state.parentProduct}`;
      let notification = await NotificationWare.createNotification(
        "PRICE_HOLY_DOWN_BELOW_THRESHOLD",
        hyperlink,
        `Previous price: ${price} -> New price: ${new_price}`
      );
      for (let i = 0; i < clients.length; i++) {
        await NotificationWare.registerNotification(clients[i].client_id, notification);
      }
    }
  }
  if (new_amount !== undefined && clients.length !== 0) {
    let amountLeft = product_before_state.vendorInfo.amountLeft;
    let ratio = (new_amount - amountLeft) / amountLeft;
    if (ratio >= 0.5 && ratio < 1) {
      let hyperlink = `/product/${product_before_state.parentProduct}`;
      let notification = await NotificationWare.createNotification(
        "AMOUNT_INCREASED",
        hyperlink,
        `Previous amount: ${amountLeft} -> New amount: ${new_amount}`
      );
      for (let i = 0; i < clients.length; i++) {
        await NotificationWare.registerNotification(clients[i].client_id, notification);
      }
    } else if (ratio >= 1 && ratio < 4) {
      let hyperlink = `/product/${product_before_state.parentProduct}`;
      let notification = await NotificationWare.createNotification(
        "AMOUNT_GREATLY_INCREASED",
        hyperlink,
        `Previous amount: ${amountLeft} -> New amount: ${new_amount}`
      );
      for (let i = 0; i < clients.length; i++) {
        await NotificationWare.registerNotification(clients[i].client_id, notification);
      }
    } else if (ratio >= 4) {
      let hyperlink = `/product/${product_before_state.parentProduct}`;
      let notification = await NotificationWare.createNotification(
        "AMOUNT_HOLILY_INCREASED",
        hyperlink,
        `Previous amount: ${amountLeft} -> New amount: ${new_amount}`
      );
      for (let i = 0; i < clients.length; i++) {
        await NotificationWare.registerNotification(clients[i].client_id, notification);
      }
    }
  }
};
