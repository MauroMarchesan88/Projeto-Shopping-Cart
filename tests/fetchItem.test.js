require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('1- Deve ser uma função', async () => {
    const response = fetchItem;
    expect(typeof response).toBe('function');
  })
  it('2- Deve chamar a função fetch quando o argumento for "MLB1615760527"', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  })
  it('3- Deve chamar fetch com o endpoint correto', async () => {
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    const argument = 'MLB1615760527'
    await fetchItem(argument);
    expect(fetch).toHaveBeenCalledWith(url);
  })
  it('4- Deve retornar uma estrutura de dados igual ao objeto "item"', async () => {
    const fetchFunction = await fetchItem('MLB1615760527');
    expect(fetchFunction).toEqual(item);
  })
  it('5- Deve retornar erro se não for passado um argumento', async () => {
    const fetchFunction = await fetchItem();
    expect(fetchFunction).toStrictEqual(new Error('You must provide an url'));
  })
});
