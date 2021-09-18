class Car {
  drive() {
    console.log('driving a car');
  }
}

class Truck {
  drive() {
    console.log('driving a truck');
  }

  loadCargo() {
    console.log('loading cargo');
  }
}

type Vehicle = Car | Truck
const v1 = new Car()
const v2 = new Truck()

function useVehicle(vehicle: Vehicle) {
  vehicle.drive()
  if (vehicle instanceof Truck) {
    vehicle.loadCargo()
  }
}

useVehicle(v1)
useVehicle(v2)
