import { useThree } from "@react-three/fiber";
import { CubeTextureLoader } from "three";
import { CubeRefractionMapping, RGBFormat, LinearFilter } from "three";

function Skybox(){
    const { scene } = useThree();
    const loader = new CubeTextureLoader();
    const texture = loader.load([
        "./skybox/space-front.png",
        "./skybox/space-back.png",
        "./skybox/space-top.png",
        "./skybox/space-bottom.png",
        "./skybox/space-right.png",
        "./skybox/space-left.png"
    ]);


    scene.background = texture;


    texture.mapping = CubeRefractionMapping;
    texture.format = RGBFormat;
    texture.magFilter = LinearFilter;


    return null;

}
export default Skybox;