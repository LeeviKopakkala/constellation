import { Component, Host, h, getAssetPath, Listen, Prop } from '@stencil/core';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
//import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

@Component({
  tag: 'constellation-component',
  styleUrl: 'constellation-component.css',
  assetsDirs: ['assets'],
})
export class ConstellationComponent {

  @Prop() backgroundColor: string;

  @Prop() elementColor: string;

  camera: any;
  renderer: any;
  width: number;
  height: number;

  @Listen('resize', { target: 'window' })
  handleScroll() {
    this.onWindowResize();
  }

  componentDidLoad() {
    // Set background
    const scene = new THREE.Scene();
    let backgroundColor: string = `#${this.backgroundColor}`;
    let elementColor: string = `#${this.elementColor}`;
    scene.background = new THREE.Color(backgroundColor);

    // Set camera
    this.getParentDimensions('test');
    const camera = new THREE.PerspectiveCamera( 45, this.width / this.height, 0.1, 1000 );
    this.camera = camera;
    camera.position.z = 0.5;
    camera.position.x = -0.6;

    // Init renderer
    const renderer = new THREE.WebGLRenderer();
    this.renderer = renderer;
    renderer.setSize( this.width, this.height );
    document.getElementById('test').appendChild(renderer.domElement);
    
    // Set light
    const light = new THREE.AmbientLight(elementColor, 1 );
    light.position.set( 50, 50, 50 );
    scene.add( light );

    // Set controls
    const controls = new OrbitControls( this.camera, renderer.domElement );
    controls.enableZoom = false;
    controls.enablePan = false;
    renderer.setSize( this.width, this.height );
    
    // Load models
    let modelObj: THREE.Group;
    let location = getAssetPath('./assets/globe.obj');

    new OBJLoader().load( location, function ( model ) {       
      modelObj = model;
      model.scale.setX(0.2);
      model.scale.setY(0.2);
      model.scale.setZ(0.2);
      scene.add( modelObj );
      animate();
    });       

    // Animate
    const animate = function () {
      requestAnimationFrame( animate );
      modelObj.rotation.x += 0.001;
      modelObj.rotation.y += 0.002;
      renderer.render( scene, camera );
    };
  }

  /**
   * When user resizes window -> Adjust viewport
   */
  onWindowResize() {
    console.log("Resized");
    let element = document.getElementById('test');
    let width = element.offsetWidth;
    let height = element.offsetHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( width, height );
  }

  /**
   * Set element dimensions
   * @param id 
   */
  getParentDimensions(id: string) {
    let element = document.getElementById(id);
    this.width = element.offsetWidth;
    this.height = element.offsetHeight;
  }
  render() {
    return (
      <Host id="test">
        <slot>
        </slot>
      </Host>
    );
  }

}
