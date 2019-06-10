function chart(method) {
  let res = null
  switch (method) {
    case 'GET':
      res = [30, 40, 78, 10, 30, 58]
      break
    default:
      res = null
  }

  return res
}

module.exports = chart