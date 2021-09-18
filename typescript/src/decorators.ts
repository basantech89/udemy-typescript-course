function Logger(logString: string) {
  console.log('LOGGER FACTORY')
  return function (constructor: Function) {
    console.log(logString)
    console.log(constructor)
  }
}

function WithTemplate(template: string, hookId: string) {
  console.log('TEMPLATE FACTORY')
  return function (constructor: any) {
    console.log('Rendering with template decorator')
    const hookEl = document.getElementById(hookId)
    const person = new constructor()
    if (hookEl) {
      hookEl.innerHTML = template
      hookEl.querySelector('h1')!.textContent = person.name
    }
  }
}

@Logger('LOGGING - PERSON')
@WithTemplate('<h1> My Decorator </h1> ', 'app')
class APerson {
  name = 'Max'

  constructor() {
    console.log('Creating person object...')
  }
}

const person = new APerson()

// ---

function Log(target: any, propertyName: string | Symbol) {
  console.log('Property decorator')
  console.log(target, propertyName)
}

function Log2(
  target: any,
  accessorName: string,
  descriptor: PropertyDescriptor
) {
  console.log('Accessor Decorator!')
  console.log(target, accessorName, descriptor)
}

function Log3(target: any, methodName: string, descriptor: PropertyDescriptor) {
  console.log('Method Decorator!')
  console.log(target, methodName, descriptor)
}

function Log4(target: any, methodName: string, argumentPosition: number) {
  console.log('Parameter Decorator!')
  console.log(target, methodName, argumentPosition)
}

class Product {
  @Log
  title: string
  private _price: number

  constructor(title: string, price: number) {
    this.title = title
    this._price = price
  }

  @Log2
  set price(value: number) {
    if (value > 0) {
      this._price = value
    } else {
      throw new Error('Invalid Price - should be positive!')
    }
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax)
  }
}
