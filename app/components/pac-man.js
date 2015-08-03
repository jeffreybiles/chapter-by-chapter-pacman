import Ember from 'ember';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';

let PacMan = Ember.Component.extend(KeyboardShortcuts, {
  squareSize: 40,
  x: 0,
  y: 0,
  width: 800,
  height: 600,
  didInsertElement() {
    this.drawCircle();
  },

  drawCircle() {
    let canvas = document.getElementById("myCanvas");
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

  movePacMan(direction, amount){
    this.incrementProperty(direction, amount);
    this.clearScreen();
    this.drawCircle();
  },

  ctx: Ember.computed(function(){
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    return ctx;
  }),

  clearScreen() {
    let ctx = this.get('ctx');
    ctx.clearRect(0, 0, this.get('width'), this.get('height'));
  },

  keyboardShortcuts: {
    up() { this.movePacMan('y', -1);},
    down() { this.movePacMan('y', 1);},
    left() { this.movePacMan('x', -1);},
    right() { this.movePacMan('x', 1);},
  },
});

export default PacMan
