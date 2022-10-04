import {View, Text} from 'react-native';

export const TextDivider = props => {
  return (
    <View style={props.divider}>
      <View style={[props.halfDivider, {backgroundColor: props.color}]}></View>
      <Text style={props.text}>{props.label}</Text>
      <View style={[props.halfDivider, {backgroundColor: props.color}]}></View>
    </View>
  );
};
