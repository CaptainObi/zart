import { trpc } from '@zart/app/utils/trpc'
import React from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import { FlatList } from 'react-native'

export function HomeScreen() {
  const posts = trpc.useQuery(['post.all'])

  return (
    <SafeAreaView style={styles.container}>
      {posts.data ? (
        <FlatList
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                alert(`You clicked ID ${item.id} `)
              }}
            >
              <View style={styles.item}>
                <Text>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
          data={posts.data}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>{posts.status}</Text>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
})
