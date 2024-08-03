// Alert.tsx

import React, {type FC} from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {create} from "react-test-renderer";

// -------------------------------------------------------------------------------------------------
type Props = {
  alertVisible: boolean;
  alertMessage: string;
  alertClose: () => void;
};

// -------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  message: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
    color: '#000000',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
});

// -------------------------------------------------------------------------------------------------
const Alert: React.FC<Props> = ({ alertVisible, alertMessage, alertClose }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={alertVisible}
      onRequestClose={alertClose}
    >
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <Text style={styles.message}>
            {alertMessage}
          </Text>
          <TouchableOpacity onPress={alertClose} style={styles.button}>
            <Text style={styles.buttonText}>
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Alert;
