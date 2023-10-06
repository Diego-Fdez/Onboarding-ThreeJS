import { View, Text, Dimensions, StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';

const RenderItem = ({ item }) => {
  const SCREEN_WIDTH = Dimensions.get('window').width;

  return (
    <View style={[styles.itemContainer, { width: SCREEN_WIDTH }]}>
      <Text style={[styles.itemText, { color: item?.textColor }]}>
        {item?.text}
      </Text>
    </View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: normalize(120),
  },
  itemText: {
    textAlign: 'center',
    fontSize: normalize(44),
    fontWeight: 'bold',
    marginHorizontal: normalize(20),
  },
});
