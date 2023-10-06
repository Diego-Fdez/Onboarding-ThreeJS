import { View, StyleSheet } from 'react-native';
import normalize from 'react-native-normalize';
import Dot from './Dot';

const Pagination = ({ data, x }) => {
  return (
    <View style={styles.paginationContainer}>
      {data?.map((_, index) => (
        <Dot index={index} x={x} key={index} />
      ))}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    marginBottom: normalize(10),
  },
});
