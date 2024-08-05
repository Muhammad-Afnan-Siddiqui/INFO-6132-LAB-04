// screens/BookDetailScreen.js
import { addDoc, collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { firestore } from '../firebase/firebase';

export default function BookDetail({ route, navigation }) {
  const { bookId } = route.params;
  const [book, setBook] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [isBorrowed, setIsBorrowed] = useState(false);

  useEffect(() => {
    // Fetch the book details
    const bookDocRef = doc(firestore, 'books', bookId);
    const unsubscribeBook = onSnapshot(bookDocRef, (doc) => {
      setBook({ id: doc.id, ...doc.data() });
    });

    // Fetch all borrowed books by the user (assuming user ID is hardcoded as 'userId')
    const userBorrowedQuery = query(collection(firestore, 'borrowed'), where('userId', '==', 'userId'));
    const unsubscribeBorrowed = onSnapshot(userBorrowedQuery, (snapshot) => {
      const userBorrowed = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBorrowedBooks(userBorrowed);
      setIsBorrowed(userBorrowed.some(borrowedBook => borrowedBook.bookId === bookId));
    });

    return () => {
      unsubscribeBook();
      unsubscribeBorrowed();
    };
  }, [bookId]);

  const handleBorrow = async () => {
    if (borrowedBooks.length >= 3) {
      Alert.alert('You cannot borrow more than 3 books at a time.');
      return;
    }

    try {
      await addDoc(collection(firestore, 'borrowed'), {
        bookId: book.id,
        userId: 'userId', // Replace with actual user ID
        bookName: book.name,
        bookAuthor: book.author,
        bookRating: book.rating,
        borrowedAt: new Date(),
      });
      setIsBorrowed(true);
    } catch (error) {
      console.error('Error borrowing book: ', error);
      Alert.alert('Error borrowing book. Please try again.');
    }
  };

  if (!book) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book.name}</Text>
      <Text style={styles.author}>{book.author}</Text>
      <Text style={styles.rating}>Rating: {book.rating}</Text>
      <Button title="Borrow" onPress={handleBorrow} disabled={isBorrowed} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  cover: {
    width: 150,
    height: 200,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 18,
    color: '#666',
  },
  rating: {
    fontSize: 16,
    marginVertical: 8,
  },
  summary: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 16,
  },
});
