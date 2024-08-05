import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import BookItem from '../components/BookItem';
import { firestore } from '../firebase/firebase';

export default function BooksList({ navigation }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);  // Add a loading state

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksCollection = collection(firestore, 'books');
        const booksSnapshot = await getDocs(booksCollection);
        const booksList = booksSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBooks(booksList);
      } catch (error) {
        console.error("Error fetching books: ", error);
      } finally {
        setLoading(false);  // Stop loading once done
      }
    };

    fetchBooks();
  }, []);

  const handlePress = (bookId) => {
    navigation.navigate('BookDetail', { bookId });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <BookItem book={item} onPress={handlePress} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
