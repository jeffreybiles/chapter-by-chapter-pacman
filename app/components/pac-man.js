import Ember from 'ember';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';

let PacMan = Ember.Component.extend(KeyboardShortcuts, {
  squareSize: 40,
  x: 50,
  y: 100,
  width: 800,
  height: 600,
  didInsertElement() {
    this.drawCircle();
  },

  drawCircle() {
    let canvas = document.getElementById("myCanvas");
    let ctx = this.get('ctx')
    let radius = this.get('squareSize')/2;
    let x = this.get('x');
    let y = this.get('y');

    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
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
    up() { this.movePacMan('y', -1 * this.get('squareSize'))},
    down() { this.movePacMan('y', this.get('squareSize'))},
    left() { this.movePacMan('x', -1 * this.get('squareSize'))},
    right() { this.movePacMan('x', this.get('squareSize'))},
  },
});

export default PacMan
