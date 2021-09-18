console.log('code')

const age = 5
let yo = 'Yoyo'

const btn = document.querySelector('button')!

console.log('before of click handler')

function clickHandler(message: string) {
  console.log('clicked ' + message)
  console.log('next statement')
}

console.log('after of click handler')

// btn.addEventListener('click', clickHandler.bind(null, 'You\'re welcome'))
