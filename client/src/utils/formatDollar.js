const formatDollar = (amount) => {
  return amount < 1 && Math.sign(amount) === 1 
    ? `${amount?.toFixed(6).toLocaleString('en-US')}` 
    : `${amount?.toLocaleString('en-US')}` 
}

export default formatDollar