import React from "react";

function LightBulb(props) {
  return (
    <mesh {...props} >
      <pointLight castShadow />
      <sphereBufferGeometry args={[32.7, 30, 10]} />
      <meshPhongMaterial emissive={"yellow"}  />
    </mesh>
  );
}

export default LightBulb;