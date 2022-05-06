const users = [
  {
    id: 1,
    name: 'A'
  },

  {
    id: 2,
    name: 'B'
  },
  {
    id: 3,
    name: 'C'
  },
]

const findUserById = (number) => {
  if(number === undefined){
    return 'Parameter missing'
  }
  if(typeof number !== 'number' && number !== undefined) {
    return 'Parameter must be a number'
  }

  const user = users.find(user => user.id === number)
  return user
}
module.exports = findUserById;
