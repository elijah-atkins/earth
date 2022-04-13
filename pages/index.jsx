import { Canvas } from "@react-three/fiber";
import css from "../styles/Home.module.css";
import Earth from "../components/Earth";
import LightBulb from "../components/LightBulb";
import OrbitControls from "../components/OrbitControls";
import {Suspense} from "react";
import Skybox from "../components/Skybox";

export default function Home() {


  return (
    <div className={css.scene}>
      <Canvas

        className={css.canvas}
        camera={{
          fov: 50,
          position: [2, 0, -2 ], 
          near: 0.1,
          far: 100000

        }}
      >
        <directionalLight intensity={5.5} color={0xdddddd} position={[0, 3, 11663]}/>
        <LightBulb position={[0, 3, 11663*0.3]}/>
        <Suspense>

            <Earth camera={Canvas.camera}/>
            <Skybox/>
          </Suspense>


        <OrbitControls />
      </Canvas>
    </div>
  );
}
