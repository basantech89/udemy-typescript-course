interface Greetable {
  name?: string
  gender?: string
  greet(phrase: string): void
}

class Person implements Greetable {
  name?: string
  age = 30
  constructor(n?: string) {
    if (n) {
      this.name = n
    }
  }

  greet(phrase: string) {
    if (this.name) {
      console.log(phrase + ' ' + this.name);
    } else {
      console.log('Hi!!');
      
    }
  }
}

let user: Greetable = new Person('Max')
let user2: Greetable = new Person() // name would be undefined
user.greet('Good Morning')
user2.greet('')