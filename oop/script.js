'use strict';

const Car= function(make ,speed){
    this.make =make;
    this.speed=speed;  
      
}
// Car.prototype.accelerate=function() {
//     this.speed += 10;
//     console.log(`${this.make} is going at ${this.speed} km/h`);
//   }
Car.prototype.break=function(){
      this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
}

const Ev =function(make ,speed,battery){
    Car.call(this,make ,speed);
    this.battery=battery;
}
Ev.prototype.chargeBattery=function(chargeTo){
this.battery=chargeTo;
}
Ev.prototype.accelerate=function(){
    this.speed-=20;
    this.battery-=.01;
    console.log(`'Tesla going at ${this.speed} km/h, with a charge of ${this.battery*100}%';`)
}

Ev.prototype.__proto__=Car.prototype;
// Ev.prototype= Object.create(Car.prototype);
// Ev.prototype.constructor=Ev;

let electric=new Ev(20,140,.9);

console.log(electric.accelerate());