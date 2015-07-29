import Ember from 'ember';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';

let PacMan = Ember.Component.extend(KeyboardShortcuts, {
  squareSize: 40,
  x: 50,
  y: 100,
  didInsertElement() {
    this.drawCircle();
  },

  drawCircle() {
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    let radius = this.get('squareSize')/2;
    let x = this.get('x');
    let y = this.get('y');

    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
  },

  keyboardShortcuts: {
    up() { this.decrementProperty('y', this.get('squareSize')); this.drawCircle()},
    down() { this.incrementProperty('y', this.get('squareSize')); this.drawCircle()},
    left() { this.decrementProperty('x', this.get('squareSize')); this.drawCircle()},
    right() { this.incrementProperty('x', this.get('squareSize')); this.drawCircle()},
  },
});

export default PacMan
