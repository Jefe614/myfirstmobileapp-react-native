import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Button({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#6200ee',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
