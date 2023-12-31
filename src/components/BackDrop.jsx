import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';

const BackDrop = ({ x }) => {
  const SCREEN_WIDTH = Dimensions.get('window').width;

  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      ['#cde6d5', '#cfe4e4', '#faeb8a']
    );

    return {
      backgroundColor: backgroundColor,
    };
  });

  return <Animated.View style={[styles.container, animatedColor]} />;
};

export default BackDrop;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
