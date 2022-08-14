const totalDOM = document.querySelector('.container-cartTitle');
const paraPrice = document.createElement('p');
paraPrice.style.padding = 0;
paraPrice.className = 'total-price';
paraPrice.id = 'total';
totalDOM.appendChild(paraPrice);
let total = 0;

const prices = (price, action) => {
  if (action === 'add') {
    total += price;
    total = Number(total.toFixed(2))
    paraPrice.innerHTML = total;
    localStorage.setItem('price', total);
  }
  if (action === 'subs') {
    total -= price;
    total = Number(total.toFixed(2))
    paraPrice.innerHTML = total;
    localStorage.setItem('price', total);
  }
};

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

const returnItemInfo = async () => {
  const products = await fetchProducts('computador');
  const productsData = products.results;
  productsData.forEach((element) => {
    const items = document.querySelector('.items');
    const item = createProductItemElement(
      { sku: element.id, name: element.title, image: element.thumbnail },
    );
    items.appendChild(item);
  });
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  const item = event.target;
  const itemSplitted = item.innerText.split('$');
  const price = Number(itemSplitted[itemSplitted.length - 1]);
  item.remove();
  const list = document.getElementsByTagName('ol');
  if (!list.length) saveCartItems(list[0].innerHTML);
  const finalPrice = Number(price.toFixed(2));
  prices(finalPrice, 'subs');
}

function createCartItemElement({ sku, name, salePrice, thumbnail }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addItemToCart = async (event) => {
  const chosenItemButton = event.target;
  const buttonParentNode = chosenItemButton.parentElement;
  const brother = buttonParentNode.firstChild;
  const chosenItem = await fetchItem(brother.innerText);
  const finalPrice = Number(chosenItem.price.toFixed(2));
  const thumbnail = chosenItem.thumbnail;
  const img = document.createElement('img');
  img.src = thumbnail;
  img.alt = brother.innerText;
  console.log(img);
  const itemData = {
    sku: brother.innerText,
    name: chosenItem.title,
    salePrice: finalPrice,
  };
  const li = createCartItemElement(itemData);
  li.appendChild(img);
  const list = document.getElementsByTagName('ol');
  list[0].appendChild(li);
  JSON.stringify(saveCartItems(list[0].innerHTML));
  prices(finalPrice, 'add');
};

const productList = () => {
  const products = document.getElementsByClassName('item__add');
  Array.from(products).forEach((product) => {
    product.addEventListener('click', addItemToCart);
  });
};

const eventReload = () => {
  const lista = document.getElementsByClassName('cart__item');
  Array.from(lista).forEach((product) => {
    product.addEventListener('click', cartItemClickListener);
  });
};

const emptyCart = () => {
  const list = document.querySelector('ol');
  list.innerHTML = '';
  localStorage.removeItem('cartItems');
  paraPrice.innerHTML = 0;
  total = 0;
  localStorage.setItem('price', 0);
};

const loading = () => {
  document.getElementById('loader').style.display = 'block';
};

const loaded = () => {
  document.getElementById('loader').remove();
};

window.onload = async () => {
  loading();
  await returnItemInfo();
  productList();
  const list = document.querySelector('ol');
  list.innerHTML = getSavedCartItems();
  eventReload();
  paraPrice.innerHTML = localStorage.getItem('price');
  total = Number(localStorage.getItem('price'));
  const clearCart = document.querySelector('.empty-cart');
  clearCart.addEventListener('click', emptyCart);
  loaded();
};