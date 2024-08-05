// components/BorrowedBookItem.js
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function BorrowedBookItem({ book, onReturn }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{book.bookName}</Text>
      <Text style={styles.author}>{book.bookAuthor}</Text>
      <Button title="Return" onPress={() => onReturn(book.id)} />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 16,
    color: '#666',
  },
});
