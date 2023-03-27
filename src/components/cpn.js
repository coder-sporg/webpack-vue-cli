import '../assets/style/style.css'
import '../assets/style/common.less'

// content
const divEl = document.createElement('div')
divEl.className = 'content'
divEl.textContent = 'HHHHH'
document.body.appendChild(divEl)

// title
const titleEl = document.createElement('h2')
titleEl.className = 'title'
titleEl.textContent = 'Hello World!'
document.body.appendChild(titleEl)
