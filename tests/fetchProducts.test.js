require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('1- Deve ser uma função', async () => {
    const response = fetchProducts;
    expect(typeof response).toBe('function');
  })
  it('2- Deve chamar a função fetch quando o argumento for "computador"', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })
  it('3- Deve chamar fetch com o endpoint correto', async () => {
    const url = "https://api.mercadolibre.com/sites/MLB/search?q=computador";
    const argument = 'computador'
    await fetchProducts(argument);
    expect(fetch).toHaveBeenCalledWith(url);
  })
  it('4- Deve retornar uma estrutura de dados igual ao objeto "computadorSearch"', async () => {
    const fetchFunction = await fetchProducts('computador');
    expect(fetchFunction).toEqual(computadorSearch);
  })
  it('5- Deve retornar erro se não for passado um argumento', async () => {
    const fetchFunction = await fetchProducts();
    expect(fetchFunction).toStrictEqual(new Error('You must provide an url'));
  })
});
