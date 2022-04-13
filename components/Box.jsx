import React from "react";

function Box(props) {
  return (
    <mesh {...props} recieveShadow={true} castShadow={true}>
      <boxBufferGeometry />
      <meshPhysicalMaterial  color={0xffffff * Math.random()} />
    </mesh>
  );
}
export default Box;
