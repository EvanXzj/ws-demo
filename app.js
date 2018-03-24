const jwt = require('jsonwebtoken')

console.log(jwt.sign({uid: 'cfF7uv0lGyL8weo', nickName: 'cfF7uv0lGyL8weo'},'secrets'), 'secrets')
console.log(jwt.sign({uid: 'cfF7uv0lGyL8weo', nickName: 'cfF7uv0lGyL8weo'},'secrets'), 'secrets')

const token = jwt.sign({uid: 'cfF7uv0lGyL8weo', nickName: 'cfF7uv0lGyL8weo'},'secrets')
console.log(jwt.verify(token,'secrets'))