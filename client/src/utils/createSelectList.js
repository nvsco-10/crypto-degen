const createSelectList = (coinsData) => {
  const list = coinsData.map(coin => (
    {
      value: coin.coinId, 
      label: coin.name, 
      qty: coin.qty
    }
  ))

  return list
}

export default createSelectList