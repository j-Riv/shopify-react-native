import { Pressable as Btn, Text, StyleSheet } from 'react-native';

const Button = ({
  onPress,
  title,
  accessibilityLabel,
  disabled = false
}: {
  onPress: () => void;
  title: string;
  accessibilityLabel?: string;
  disabled?: boolean;
}) => {
  return (
    <Btn
      onPress={onPress}
      accessibilityLabel={accessibilityLabel ? accessibilityLabel : title}
      style={styles.button}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </Btn>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    backgroundColor: '#bc360a',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5
  },
  text: {
    color: 'white',
    textAlign: 'center',
    textTransform: 'uppercase'
  }
});

export default Button;
