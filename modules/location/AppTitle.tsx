import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TypingAnimation } from 'react-native-typing-animation';
import { TEXT_COLORS } from '../GlobalStyles/GlobalStyles';

const TypingText: React.FC<{ text: string; typingSpeed?: number; deletingSpeed?: number }> = ({
  text,
  typingSpeed = 150,
  deletingSpeed = 50,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting && index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      } else if (isDeleting && index > 0) {
        setDisplayedText((prev) => prev.slice(0, -1));
        setIndex((prev) => prev - 1);
      } else if (!isDeleting && index === text.length) {
        setTimeout(() => setIsDeleting(true), 1000); 
      } else if (isDeleting && index === 0) {
        setTimeout(() => setIsDeleting(false), 500); 
      }
    };

    const interval = setInterval(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearInterval(interval);
  }, [text, typingSpeed, deletingSpeed, isDeleting, index]);
  
  return (
    <Text style={styles.typingText}>{displayedText !==''? displayedText :' Maalasa My Chicken'}<TypingAnimation dotColor="black" /></Text>
  );
};

const AppTitle: React.FC = () => {
  return (
    <View style={styles.container}>
      <TypingText text="Maalasa My Chicken" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  typingText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight:'bold',
    color:TEXT_COLORS.primary
  },
});

export default AppTitle;

