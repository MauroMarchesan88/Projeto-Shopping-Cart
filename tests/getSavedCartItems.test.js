const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('1- O metodo localStorage.setItem deve ser chamado', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  })
  it('2- O metodo localStorage.setItem deve ser chamado com o parametro "cartItems"', () => {
    getSavedCartItems();
    const parameter = 'cartItems';
    expect(localStorage.getItem).toHaveBeenCalledWith(parameter);
  })
});
