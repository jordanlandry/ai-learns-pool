import { Player } from "./player";
import "./style.scss";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Table } from "./table";
import { Game } from "./game";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.y = 25;
camera.rotation.x = -Math.PI / 2;

const pointLight = new THREE.PointLight(0xffffff, 1, 0.5);
pointLight.position.set(1, 25, 0);

scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const table = new Table();

const game = new Game();
scene.add(table.mesh);
scene.add(game.player.mesh);

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.update();

function animate() {
  renderer.render(scene, camera);

  game.player.update();
  requestAnimationFrame(animate);
}

animate();
