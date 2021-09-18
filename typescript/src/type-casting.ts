const input = document.getElementById('user-input')! as HTMLInputElement
input.value = 'Hi There!!'

interface ErrorContainer {
  [prop: string]: string
}

const errors1: ErrorContainer = {}
const errors2: ErrorContainer = {
  email : 'Invalid Email!'
}

// const errors3: ErrorContainer = {
//   email : 2
// }
const errors4: ErrorContainer = {
  1: 'Invalid Email!'
}

interface ErrorContainer2 {
  [prop: number]: string
}

const errors5: ErrorContainer2 = {
  1: 'Invalid Email!'
}
// const errors6: ErrorContainer2 = {
//   email: 'Invalid Email!'
// }
