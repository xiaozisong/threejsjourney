import * as THREE from 'three';
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Camera from './Camera';

// 单例模式
let instance = null;

export default class Experience {
  constructor(canvas) {
    this.canvas = canvas;
    window.Experience = this;

    if (instance) {
      return instance;
    }
    instance = this;

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new Camera();

    // setup
    this.sizes = new Sizes();
    this.time = new Time();

    // Resize event
    this.sizes.on('resize', this.resize.bind(this, null));

    // Time event
    this.time.on('tick', () => {
      this.update();
    })
  }

  resize () {
    console.log(this)
  }

  update() {

  }
}