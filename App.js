import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import normalize from 'react-native-normalize';
import { Canvas } from '@react-three/fiber/native';
import { Float } from '@react-three/drei/native';
import useControls from 'r3f-native-orbitcontrols';
import { data } from './src/data/data';
import {
  RenderItem,
  BackDrop,
  Pagination,
  Button,
  Abstract,
} from './src/components';

export default function App() {
  const x = useSharedValue(0);
  const flatListRef = useAnimatedRef();
  const flatListIndex = useSharedValue(0);
  const [OrbitControls, events] = useControls();

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems[0] !== null) {
      flatListIndex.value = viewableItems[0].index || 0;
    }
  };

  return (
    <View style={styles.container}>
      <BackDrop x={x} />
      <View style={styles.abstractContainer} {...events}>
        <Canvas>
          <OrbitControls />
          <ambientLight intensity={2} />
          <directionalLight position={[0, 1, 0]} args={['white', 2]} />
          <directionalLight position={[0, 0, 1]} args={['white', 2]} />
          <Float speed={8} floatIntensity={3}>
            <Abstract x={x} />
          </Float>
        </Canvas>
      </View>
      <Animated.FlatList
        ref={flatListRef}
        onScroll={onScroll}
        data={data}
        renderItem={({ item }) => {
          return <RenderItem item={item} />;
        }}
        keyExtractor={(item) => item.id}
        scrollEventThrottle={16}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />
      <View style={styles.bottomContainer}>
        <Pagination data={data} x={x} />
        <Button
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
          dataLength={data.length}
          x={x}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  abstractContainer: {
    flex: 1,
  },
  bottomContainer: {
    alignItems: 'center',
    paddingVertical: normalize(30),
    position: 'absolute',
    bottom: normalize(20),
    left: 0,
    right: 0,
  },
});
