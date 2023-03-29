interface ICollision {
  m: number; // mass
  u: number; // initial velocity
  v: number; // final velocity
}

// m1 * u1 + m2 * u2 = m1 * v2 + m2 * v2
// m = mass, u = initial velocity, v = final velocity
export function calcCollision(object1: ICollision, object2: ICollision) {
  const m1 = object1.m;
  const m2 = object2.m;
  const u1 = object1.u;
  const u2 = object2.u;

  const v1 = ((m1 - m2) / (m1 + m2)) * u1 + ((2 * m2) / (m1 + m2)) * u2;
  const v2 = ((2 * m1) / (m1 + m2)) * u1 + ((m2 - m1) / (m1 + m2)) * u2;

  return { v1, v2 };
}
