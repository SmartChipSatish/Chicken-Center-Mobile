import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import StepIndicator from 'react-native-step-indicator';

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013'
};

const labels=["Ordered","Packed","Shipped","Out For Delivery","Delivered"]

const data = [
  {
    label: "Ordered",
    status: 'Your order has been placed',
    dateTime: 'Sun, 2nd Jun 2024 11:20AM'
  },
  {
    label: "Packed",
    status: 'Your order has been packed',
    dateTime: 'Sun, 2nd Jun 2024 12:00PM'
  },
  {
    label: "Shipped",
    status: 'Your item has been shipped',
    dateTime: 'Sun, 2nd Jun 2024 12:10PM'
  },
  {
    label: "Out For Delivery",
    status: 'Your item is out for delivery',
    dateTime: 'Sun, 2nd Jun 2024 12:15PM'
  },
  {
    label: "Delivered",
    status: 'Your item has been delivered',
    dateTime: 'Sun, 2nd Jun 2024 12:40PM'
  }
];

export default function TrackingTimeLine() {
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <View style={styles.container}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentStep}
        direction='vertical'
        labels={labels}
        renderLabel={({ position }) => {
          return (
            <View style={styles.labelContainer}>
              <Text style={styles.labelTitle}>{data[position].label}</Text>
              <Text style={styles.labelText}>{data[position].status}</Text>
              <Text style={styles.labelDate}>{data[position].dateTime}</Text>
            </View>
          );
        }}
      />
      <View style={styles.nextContainer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => currentStep !== 4 && setCurrentStep(currentStep + 1)}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.nextButton,{marginLeft:10}]}
          onPress={() =>  setCurrentStep(0)}
        >
          <Text style={styles.nextButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
    height:500
  },
  labelContainer: {
    // paddingLeft: 5,
    // width: 300,
    marginTop: 25
  },
  labelTitle: {
    color: '#fe7013',
    fontWeight: 'bold'
  },
  labelText: {
    color: '#333',
  },
  labelDate: {
    color: '#888',
    fontSize: 12,
  },
  nextContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  nextButton: {
    backgroundColor: '#fe7013',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});
