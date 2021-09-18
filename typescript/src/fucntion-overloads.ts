type Combinable = string | number
type Numeric = number | boolean

type Universal = Combinable & Numeric

function add (a: number, b: number): number
function add (a: string, b: string): string
function add (a: Combinable, b: Combinable): Combinable
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString()
  }
  return a + b
}

const result1 = add(1, 2)
const result2 = add('John', 'Smith')
const result3 = add(1, 'Smith')