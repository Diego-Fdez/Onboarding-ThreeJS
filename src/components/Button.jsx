import {
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import normalize from 'react-native-normalize';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const Button = ({ flatListRef, flatListIndex, dataLength, x }) => {
  const WIDTH_SCREEN = Dimensions.get('window').width;

  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      width:
        flatListIndex.value === dataLength - 1
          ? withSpring(300)
          : withSpring(200),
    };
  });

  const nextTextAnimation = useAnimatedStyle(() => {
    return {
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(100)
              : withTiming(0),
        },
      ],
    };
  });

  const textAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(0)
              : withTiming(-100),
        },
      ],
    };
  });

  const animatedButonColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, WIDTH_SCREEN, 2 * WIDTH_SCREEN],
      ['#109a78', '#1e2169', '#f15937']
    );

    return {
      backgroundColor: backgroundColor,
    };
  });

  const animatedTextColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, WIDTH_SCREEN, 2 * WIDTH_SCREEN],
      ['#cde6d5', '#cfe4e4', '#faeb8a']
    );

    return {
      color: backgroundColor,
    };
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (flatListIndex.value < dataLength - 1) {
          flatListRef.current.scrollToIndex({ index: flatListIndex.value + 1 });
        } else {
          console.log('End of list');
        }
      }}
    >
      <Animated.View
        style={[styles.container, buttonAnimationStyle, animatedButonColor]}
      >
        <Animated.Text
          style={[styles.text, textAnimationStyle, animatedTextColor]}
        >
          Get Started
        </Animated.Text>
        <Animated.Text
          style={[styles.text, nextTextAnimation, animatedTextColor]}
        >
          Next
        </Animated.Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    height: normalize(65),
    width: normalize(200),
    backgroundColor: '#fff',
    borderRadius: normalize(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: normalize(18),
    position: 'absolute',
    fontWeight: 'bold',
  },
});
