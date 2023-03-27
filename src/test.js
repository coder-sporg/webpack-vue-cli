import './assets/style/index.less'
import './components/cpn'

import { sum, mul } from './utils/math'

const message = 'Hello World'
console.log(message)

const foo = () => {
  console.log('foo function exec~')
}

foo()

if(false) {
  console.log(666)
}

console.log(sum(10, 20))
console.log(sum(50, 50))
