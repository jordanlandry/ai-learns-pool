import * as THREE from "three";
import { sizes } from "./properties";

export class Table {
  mesh: THREE.Mesh;

  constructor() {
    const geometry = new THREE.BoxGeometry(sizes.tableWidth, 0.1, sizes.tableHeight);
    const material = new THREE.MeshPhongMaterial({ color: 0x55aa33 });

    const borderMaterial = new THREE.MeshStandardMaterial({ color: 0x964b00 });
    const borderGeometry = new THREE.BoxGeometry(sizes.tableWidth + sizes.borderThickness, 0, sizes.tableHeight + sizes.borderThickness);

    this.mesh = new THREE.Mesh(geometry, material);
    const border = new THREE.Mesh(borderGeometry, borderMaterial);

    const cornerMeshes = this.getCornerMeshes();
    const sideMeshes = this.getSidePocketMeshes();

    cornerMeshes.forEach((corner) => this.mesh.add(corner));
    sideMeshes.forEach((side) => this.mesh.add(side));

    this.mesh.add(border);
  }

  getCornerMeshes() {
    const locations = [
      new THREE.Vector3(-sizes.tableWidth / 2, 0, -sizes.tableHeight / 2),
      new THREE.Vector3(sizes.tableWidth / 2, 0, -sizes.tableHeight / 2),
      new THREE.Vector3(-sizes.tableWidth / 2, 0, sizes.tableHeight / 2),
      new THREE.Vector3(sizes.tableWidth / 2, 0, sizes.tableHeight / 2),
    ];

    const cornerPocketGeometry = new THREE.CylinderGeometry(sizes.cornerPocketRadius, sizes.cornerPocketRadius, 0.1, 32);

    const cornerMeshes = locations.map((location) => {
      const cornerPocket = new THREE.Mesh(cornerPocketGeometry, new THREE.MeshStandardMaterial({ color: 0 }));
      cornerPocket.position.set(location.x, location.y, location.z);
      return cornerPocket;
    });

    return cornerMeshes;
  }

  getSidePocketMeshes() {
    const locations = [
      new THREE.Vector3(-sizes.tableWidth / 2 - sizes.sidePocketRadius / 2, 0, 0),
      new THREE.Vector3(sizes.tableWidth / 2 + sizes.sidePocketRadius / 2, 0, 0),
    ];

    const sidePocketGeometry = new THREE.CylinderGeometry(sizes.sidePocketRadius, sizes.sidePocketRadius, 0.1, 32);

    const sideMeshes = locations.map((location) => {
      const sidePocket = new THREE.Mesh(sidePocketGeometry, new THREE.MeshStandardMaterial({ color: 0 }));
      sidePocket.position.set(location.x, location.y, location.z);
      return sidePocket;
    });

    return sideMeshes;
  }
}
