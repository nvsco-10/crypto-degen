const formatDollar = (amount) => {
  const dollar = parseFloat(amount)
  return dollar < 1 && Math.sign(dollar) === 1 
    ? dollar?.toFixed(6).toLocaleString('en-US')
    : dollar?.toLocaleString('en-US')
}

export default formatDollar