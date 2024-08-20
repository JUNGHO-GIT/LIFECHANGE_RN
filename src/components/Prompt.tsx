// Prompt.tsx

import React, { useState, FC } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

// -------------------------------------------------------------------------------------------------
type PromptProps = {
  promptVisible: boolean;
  promptMessage: string;
  initialValue?: string;
  onSubmit: (value: string) => void;
  onCancel: () => void;
};

// -------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  promptContainer: {
    minWidth: 200,
    width: "auto",
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
  input: {
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 16,
    color: '#000000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
});

// -------------------------------------------------------------------------------------------------
const Prompt: FC<PromptProps> = ({ promptVisible, promptMessage, initialValue = '', onSubmit, onCancel }) => {
  const [inputValue, setInputValue] = useState(initialValue);

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={promptVisible}
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.promptContainer}>
          <Text style={styles.message}>
            {promptMessage}
          </Text>
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Enter your response"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => onSubmit(inputValue)} style={styles.button}>
              <Text style={styles.buttonText}>
                Submit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCancel} style={[styles.button, styles.cancelButton]}>
              <Text style={styles.buttonText}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Prompt;
