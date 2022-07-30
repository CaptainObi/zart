import { proxy, trpc } from '../../utils/trpc'
import { FlatList, View, Text, Pressable } from 'dripsy'
import React from 'react'
export function HomeScreen() {
  const posts = proxy.post.all.useQuery()

  return (
    <View sx={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {posts.data ? (
        <FlatList
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                alert(`You clicked ID ${item.id} `)
              }}
            >
              <View
                sx={{
                  flex: 1,
                  backgroundColor: '#f9c2ff',
                  padding: 20,
                }}
              >
                <Text>{item.title}</Text>
              </View>
            </Pressable>
          )}
          data={posts.data}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>{posts.status}</Text>
      )}
    </View>
  )
}
