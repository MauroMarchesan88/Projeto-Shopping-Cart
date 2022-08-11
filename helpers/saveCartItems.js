const saveCartItems = (itemList) => {
  const lista = itemList;
  localStorage.setItem('cartItems', lista);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
