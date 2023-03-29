import * as THREE from "three";

export class Ball {
  striped: boolean;
  value: number;

  mesh: THREE.Mesh;

  position: THREE.Vector3;
  velocity: THREE.Vector3;

  constructor(striped: boolean, value: number, position: THREE.Vector3) {
    this.striped = striped;
    this.value = value;
    this.position = position;

    // Sphere
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
    material.shininess = 100;

    this.mesh = new THREE.Mesh(geometry, material);

    this.velocity = new THREE.Vector3(0, 0, 0.0);
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
  }

  update() {
    this.position.add(this.velocity);
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
  }
}
