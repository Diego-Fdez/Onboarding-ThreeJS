import { MeshDistortMaterial } from '@react-three/drei/native';
import { useFrame } from '@react-three/fiber/native';
import { useRef } from 'react';
import { Dimensions } from 'react-native';
import { interpolateColor } from 'react-native-reanimated';

const Abstract = ({ x }) => {
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const meshRef = useRef(null);

  useFrame(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      ['#109a78', '#1e2169', '#f15937']
    );

    const material = meshRef.current?.material;
    material.color.set(backgroundColor);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.5, 250, 250]} />
      <MeshDistortMaterial color={'green'} distort={0.3} speed={5} />
    </mesh>
  );
};

export default Abstract;
