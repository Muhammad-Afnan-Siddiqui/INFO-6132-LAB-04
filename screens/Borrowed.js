// screens/Borrowed.js
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import BorrowedBookItem from '../components/BorrowedBookItem';
import { firestore } from '../firebase/firebase';

const Borrowed = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    // Fetch the borrowed books in real-time
    const borrowedBooksCollection = collection(firestore, 'borrowed');
    const unsubscribeBorrowed = onSnapshot(borrowedBooksCollection, (snapshot) => {
      const borrowedBooksList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBorrowedBooks(borrowedBooksList);
    });

    return () => {
      unsubscribeBorrowed();
    };
  }, []);

  const returnBook = async (bookId) => {
    try {
      const bookDoc = doc(firestore, 'borrowed', bookId);
      await deleteDoc(bookDoc);
      console.log("Book returned successfully!");
    } catch (error) {
      console.error("Error returning book: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={borrowedBooks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <BorrowedBookItem book={item} onReturn={returnBook} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default Borrowed;
