import Ember from 'ember';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';

let PacMan = Ember.Component.extend(KeyboardShortcuts, {
  didInsertElement() {
    this.drawCircle();
  },

  drawCircle() {
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    let radius = 20;
    let x = 50;
    let y = 100;

    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
  },

  keyboardShortcuts: {
    up() { console.log('up')},
    down() { console.log('down')},
    left() { console.log('left')},
    right() { console.log('right')},
  },
});

export default PacMan
