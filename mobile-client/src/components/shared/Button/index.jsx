import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';



import colors from '../../../utils/styles/themes/colors';
import {ButtonStyles} from './Button.styles';

getButtonType = type => {
  switch (type) {
    case 'filled':
      return ButtonStyles.filled;
    case 'outlined':
      return ButtonStyles.outlined;
    default:
      return ButtonStyles.filled;
  }
};

export default Button = props => {
  return (
    <TouchableOpacity
      style={styles(props.type, props.width).button}
      onPress={props.onPress}>
      <Text style={ButtonStyles.buttonLabel}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const styles = (type, width) =>
  StyleSheet.create({
    button: {
      ...getButtonType(type),
      width: width,
    },
  });
