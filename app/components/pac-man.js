import Ember from 'ember';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';

let PacMan = Ember.Component.extend(KeyboardShortcuts, {
  squareSize: 40,
  x: 0,
  y: 0,
  width: Ember.computed(function(){
    return this.get('grid.firstObject.length')
  }),
  height: Ember.computed(function(){
    return this.get('grid.length')
  }),
  pixelHeight: Ember.computed(function(){
    return this.get('height') * this.get('squareSize')
  }),
  pixelWidth: Ember.computed(function(){
    return this.get('width') * this.get('squareSize')
  }),
  grid: [
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 1, 0, 1, 0, 0, 0, 1],
    [0, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
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

    let grid = this.get('grid');
    grid.forEach(function(row, rowIndex){
      row.forEach(function(cell, columnIndex){
        if(cell == 1){
          ctx.fillRect(columnIndex * squareSize,
                       rowIndex * squareSize,
                       squareSize,
                       squareSize)
        }
      })
    })
  },

  movePacMan(direction, amount){
    this.incrementProperty(direction, amount);

    if(this.collidedWithBorder() || this.collidedWithWall()) {
      this.decrementProperty(direction, amount)
    }
    this.clearScreen();
    this.drawWalls();
    this.drawCircle();
  },

  collidedWithWall: function(){
    let x = this.get('x');
    let y = this.get('y');
    let grid = this.get('grid');

    return grid[y][x] == 1
  },

  collidedWithBorder: function(){
    let x = this.get('x');
    let y = this.get('y');
    let height = this.get('height');
    let width = this.get('width');

    let pacOutOfBounds = x < 0 ||
                         y < 0 ||
                         x >= width ||
                         y >= height
    return pacOutOfBounds
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
