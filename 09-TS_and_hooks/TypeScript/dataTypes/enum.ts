enum Direction {
  Up,
  Down,
  Left,
  Right,
}

function doSomething(keyPressed: Direction) {
  console.log(keyPressed);
}

doSomething(Direction.Down);

