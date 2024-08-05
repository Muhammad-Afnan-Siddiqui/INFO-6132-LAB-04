// components/BookItem.js
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function BookItem({ book, onPress }) {
  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(book.id)}>
      <Text style={styles.title}>{book.name}</Text>
      <Text style={styles.author}>{book.author}</Text>
      <Text style={styles.author}>{book.rating}</Text>
    </TouchableOpacity>
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
