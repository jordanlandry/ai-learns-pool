import * as THREE from "three";
import { calcCollision } from "./helpers/calcCollision";
import { sizes } from "./properties";

export class Player {
  name: string;
  score: number;
  mesh: THREE.Mesh;
  diameter: number;

  position: THREE.Vector3;
  velocity: THREE.Vector3;

  constructor(name: string, score: number) {
    this.name = name;
    this.score = score;

    this.diameter = sizes.ballRadius;
    const z = sizes.tableHeight / 2 - this.diameter - sizes.tableHeight / 10;

    const initialPosition = new THREE.Vector3(0, 0, z);

    // Sphere
    const geometry = new THREE.SphereGeometry(sizes.ballRadius, 32, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff });
    material.shininess = 100;

    this.mesh = new THREE.Mesh(geometry, material);

    this.velocity = new THREE.Vector3(0, 0, 0.0);

    this.position = initialPosition;
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);

    window.addEventListener("keydown", (event) => {
      if (event.key === " ") this.applyForce(new THREE.Vector3(0, 0, -0.1));
    });
  }

  update() {
    this.position.add(this.velocity);
    this.checkCollision();
    this.handleFriction();
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
  }

  applyForce(force: THREE.Vector3) {
    const xVel = calcCollision({ m: sizes.cueMass, u: 0 }, { m: sizes.ballMass, u: 0 });
    const zVel = calcCollision({ m: sizes.cueMass, u: -0.1 }, { m: sizes.ballMass, u: 0 });

    this.velocity.x = xVel.v2;
    this.velocity.z = zVel.v2;
  }

  handleFriction() {
    this.velocity.multiplyScalar(0.99);
  }

  checkCollision() {
    if (this.position.x > sizes.tableWidth / 2 - this.diameter) {
      this.position.x = sizes.tableWidth / 2 - this.diameter;
      this.velocity.x *= -0.9;
    }

    if (this.position.x < -sizes.tableWidth / 2 + this.diameter) {
      this.position.x = -sizes.tableWidth / 2 + this.diameter;
      this.velocity.x *= -0.9;
    }

    if (this.position.z > sizes.tableHeight / 2 - this.diameter) {
      this.position.z = sizes.tableHeight / 2 - this.diameter;
      this.velocity.z *= -0.9;
    }

    if (this.position.z < -sizes.tableHeight / 2 + this.diameter) {
      this.position.z = -sizes.tableHeight / 2 + this.diameter;
      this.velocity.z *= -0.9;
    }
  }

  addPower() {
    this.score++;
  }
}
