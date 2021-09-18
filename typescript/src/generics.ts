function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB)
}

console.log(merge({ name: 'John' }, { name: 'James', age: 30 }))

interface Lengthy {
  length: number
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let description = 'Got no value.'
  if (element.length > 0) {
    description = `Got ${element.length} ${element.length > 1 ? 'elements' : 'element'}.`
  }
  return [element, description]
}

console.log(countAndDescribe('Hi There'));

function extract<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key]
}

console.log(extract({ name: 'Max' }, 'name'));


class DataStorage<T extends string | number | boolean> {
  private data: T[] = []

  addItem(item: T) {
    this.data.push(item)
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1)
  }

  getItems() {
    return [...this.data]
  }
}

const textStorage = new DataStorage<string>()
textStorage.addItem('Max')
textStorage.addItem('Manu')
console.log(textStorage.getItems())

const numberStorage = new DataStorage<number>()
numberStorage.addItem(10)
numberStorage.addItem(20)

// const objectStorage = new DataStorage<object>()
// objectStorage.addItem({ name: 'Max' })
// objectStorage.addItem({ name: 'Manu' })
// objectStorage.removeItem({ name: 'Max' })
// objectStorage.getItems()
