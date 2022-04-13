import React from "react";
import { useRef } from "react";
import * as THREE from "three";
import css from "../styles/Home.module.css";
import { useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

//load the gltf model from ./models/space/earth.glb and return react object
function Earth(camera) {
  //import gltf models from ./models/space/
  const speed = 0.1;
  const scale = 0.3;
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(.4*scale, 50, 50),
    new THREE.ShaderMaterial({
      vertexShader: vertexShader(),
      fragmentShader: fragmentShader(),
      transparent: true, 
      opacity: 0.9,
      uniforms: 
      { 
          "c":   { type: "f", value: 0.3 },
          "p":   { type: "f", value: 2.0 },
          glowColor: { type: "c", value: new THREE.Color(0x33b0ff) },
          viewVector: { type: "v3", value: camera.position },

      },                  
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,

    })
  )


const glowSphere = new THREE.Mesh(
new THREE.SphereGeometry(.45*scale, 50, 50),
new THREE.ShaderMaterial({
  vertexShader: vertexShader(),
  fragmentShader: fragmentShader(),

  uniforms: 
  { 
      "c":   { type: "f", value: 0.8 },
      "p":   { type: "f", value: 1.5 },
      glowColor: { type: "c", value: new THREE.Color(0x777777) },
      viewVector: { type: "v3", value: camera.position },

  },                  
  side: THREE.FrontSide,
  blending: THREE.AdditiveBlending,
  transparent: true,
})
)
  const earthGltf = useLoader(GLTFLoader, "./models/space/earth.glb");
  const moonGltf = useLoader(GLTFLoader, "./models/space/moon.glb");
 let groupItems = [];
  groupItems.push(earthGltf.scene);
    groupItems.push(moonGltf.scene);
    groupItems.push(sphere);
    groupItems.push(glowSphere);
  const group = useRef(
    useFrame(() => (


        group.current.rotation.y += 0.001*speed,
        groupItems[0].rotation.y += 0.026*speed,
        groupItems[1].rotation.y += 0.001*speed
        ))
  );
  return (
    <group ref={group}>
      <primitive
        className={css.earth}
        object={groupItems[0]}
        scale={[0.001*scale, 0.001*scale, 0.001*scale]}
        rotation={[0, 0, 0]}

      />
      ;
      <primitive
        className={css.moon}
        object={groupItems[1]}
        scale={[0.00027*scale, 0.00027*scale, 0.00027*scale]}
        position={[-27.9*scale, 0, 0]}
        rotation={[0, 0, 0]}

      />
      <primitive
        className={css.sphere}
        object={groupItems[2]}
        scale={[1.35, 1.35, 1.35]}


        />
        <primitive
        className={css.sphere}
        object={groupItems[3]} 
        scale={[1.3, 1.3, 1.3]}
        />
      ;
    </group>
  );
}
function vertexShader() {
    return `
    uniform vec3 viewVector;
    uniform float c;
    uniform float p;
    varying float intensity;
    void main() 
    {
        vec3 vNormal = normalize( normalMatrix * normal );
        vec3 vNormel = normalize( normalMatrix * viewVector );
        intensity = pow( c - dot(vNormal, vec3(0,0,1.0)), p );
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
    `
  }

  function fragmentShader() {
    return `
    uniform vec3 glowColor;
    varying float intensity;
    void main() 
    {
        vec3 glow = glowColor * intensity;
        gl_FragColor = vec4( glow, 1.0 );
    }
`
  }
export default Earth;
