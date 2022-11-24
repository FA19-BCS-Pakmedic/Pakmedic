import {TouchableHighlight, Text} from 'react-native';

import colors from '../../../utils/styles/themes/colors';

export default Button = props => {
  return (
    <TouchableHighlight
      style={props.styles}
      onPress={props.onPress}
      activeOpacity={0.9}
      underlayColor={colors.primaryUnderlay}>
      <Text style={props.textStyle}>{props.label}</Text>
    </TouchableHighlight>
  );
};
