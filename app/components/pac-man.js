import Ember from 'ember';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';

let PacMan = Ember.Component.extend(KeyboardShortcuts, {
  squareSize: 40,
  x: 0,
  y: 0,
  width: 20,
  height: 15,
  pixelHeight: Ember.computed(function(){
    return this.get('height') * this.get('squareSize')
  }),
  pixelWidth: Ember.computed(function(){
    return this.get('width') * this.get('squareSize')
  }),
  walls: [
    {x: 1, y: 1},
    {x: 10, y: 5}
  ],


  didInsertElement() {
    this.drawWalls();
    this.drawCircle();
  },

  drawCircle() {
    let ctx = this.get('ctx')
    let squareSize = this.get('squareSize');
    let x = this.get('x');
    let y = this.get('y');

    let pixelX = (x+1/2) * squareSize;
    let pixelY = (y+1/2) * squareSize;

    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(pixelX, pixelY, squareSize/2, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
  },

  drawWalls: function(){
    let squareSize = this.get('squareSize');
    let ctx = this.get('ctx');
    ctx.fillStyle = '#000';

    this.get('walls').forEach((wall)=>{
      ctx.fillRect(wall.x * squareSize,
                   wall.y * squareSize,
                   squareSize,
                   squareSize)
    })
  },

  movePacMan(direction, amount){
    this.incrementProperty(direction, amount);
    let x = this.get('x');
    let y = this.get('y');
    let height = this.get('height');
    let width = this.get('width');

    let pacOutOfBounds = x < 0 ||
                         y < 0 ||
                         x >= width ||
                         y >= height
    if(pacOutOfBounds) {
      this.decrementProperty(direction, amount)
    }
    this.clearScreen();
    this.drawWalls();
    this.drawCircle();
  },

  ctx: Ember.computed(function(){
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    return ctx;
  }),

  clearScreen() {
    let ctx = this.get('ctx');
    ctx.clearRect(0, 0, this.get('pixelWidth'), this.get('pixelHeight'));
  },

  keyboardShortcuts: {
    up() { this.movePacMan('y', -1);},
    down() { this.movePacMan('y', 1);},
    left() { this.movePacMan('x', -1);},
    right() { this.movePacMan('x', 1);},
  },
});

export default PacMan
