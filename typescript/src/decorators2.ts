function WithTemplate(template: string, hookId: string) {
  console.log('TEMPLATE2 FACTORY')
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(...args: any[]) {
        super()
        console.log('Rendering with template2 decorator')
        const hookEl = document.getElementById(hookId)
        if (hookEl) {
          hookEl.innerHTML = template
          hookEl.querySelector('h1')!.textContent = this.name
        }
      }
    }
  }
}

@WithTemplate('<h1> My Decorator </h1> ', 'app')
class APerson3 {
  name = 'Mavin'

  constructor() {
    console.log('Creating person2 object...')
  }
}

const person2 = new APerson3()

function Autobind(
  _: any,
  _2: string | Symbol | number,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value
  const adjacentDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this)
      return boundFn
    }
  }
  return adjacentDescriptor
}

class Printer {
  message = 'This works!'

  @Autobind
  showMessage() {
    console.log(this.message)
  }
}

const printer = new Printer()

const button = document.querySelector('button')!
button.addEventListener('click', printer.showMessage)

// ---

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]
  }
}

const registeredValidators: ValidatorConfig = {}

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      'required'
    ]
  }
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      'positive'
    ]
  }
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name]
  if (!objValidatorConfig) {
    return true
  }

  let isValid = true
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop]
        case 'positive':
          isValid = isValid && obj[prop] > 0
      }
    }
  }
  return isValid
}

class Course {
  @Required
  title: string
  @PositiveNumber
  price: number

  constructor(t: string, p: number) {
    this.title = t
    this.price = p
  }
}

const courseForm = document.querySelector('form')!
courseForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const titleEl = <HTMLInputElement>document.getElementById('course-title')
  const priceEl = <HTMLInputElement>document.getElementById('course-price')
  const title = titleEl.value
  const price = +priceEl.value

  const course = new Course(title, price)

  if (!validate(course)) {
    alert('Invalid input, please try again!')
    return
  }

  console.log(course)
})
