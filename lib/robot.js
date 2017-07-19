'use strict';

function Robot() {
  this.directions = ['north', 'east', 'south', 'west']
  this.instructionGuide = {
    "L": "turnLeft",
    "R": "turnRight",
    "A": "advance"
  }
}

Robot.prototype.orient = function(direction){
  if (this.directions.includes(direction)){
    this.bearing = direction
  } else {
    throw new Error("Invalid Robot Bearing")
  }
}

Robot.prototype.at = function(x, y){
  this.x = x,
  this.y = y,
  this.coordinates = [this.x, this.y]
}

Robot.prototype.place = function(object){
  this.at(object.x,object.y)
  this.orient(object.direction)
}

Robot.prototype.turnRight = function(){
  let bearing_index = this.directions.indexOf(this.bearing)
  if (bearing_index < 3){
    bearing_index += 1
    this.bearing = this.directions[bearing_index]
  } else if (bearing_index == 3){
    bearing_index = 0
    this.bearing = this.directions[bearing_index]
  } else {
    throw new Error("Something weird happened with bearing!")
  }
}

Robot.prototype.turnLeft = function(){
  let bearing_index = this.directions.indexOf(this.bearing)
  if (bearing_index > 0){
    bearing_index -= 1
    this.bearing = this.directions[bearing_index]
  } else if (bearing_index == 0){
    bearing_index = 3
    this.bearing = this.directions[bearing_index]
  } else {
    throw new Error("Something weird happened with bearing!")
  }
}

Robot.prototype.advance = function(){
  switch(this.bearing) {
    case "north":
        this.y++
        break;
    case "east":
        this.x++
        break;
    case "south":
        this.y--
        break;
    case "west":
        this.x--
        break;
      }
    this.at(this.x, this.y)
}

Robot.prototype.instructions = function(instructions){
  let instructionArray = []
  instructions.split("").forEach(character => {
    instructionArray.push(this.instructionGuide[character])
  })
  return instructionArray
}

Robot.prototype.evaluate = function(instructions){
  let commands = this.instructions(instructions)
  commands.forEach(command => {
    this[command]()
  })
}

// var robot = new Robot()
// console.log(robot.instructions("LALRALA"))
