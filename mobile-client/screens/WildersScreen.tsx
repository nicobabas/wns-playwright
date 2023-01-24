import { View, Text, StyleSheet } from "react-native";
import { useWildersQuery } from "../gql/generated/schema";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { FlatList } from "react-native";
import WilderListItem from "../components/WilderListItem";

export default function WildersScreen() {
  const { loading: loadingWilders, data, refetch } = useWildersQuery();
  const wilders = data?.wilders || [];

  useFocusEffect(useCallback(() => refetch, []));

  return (
    <View style={style.container}>
      {loadingWilders && <Text>Loading...</Text>}
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 30 }}
        ItemSeparatorComponent={() => <View style={style.separator} />}
        ListEmptyComponent={() => <Text>No wilders for now</Text>}
        data={wilders}
        refreshing={loadingWilders}
        renderItem={({ item }) => <WilderListItem wilder={item} />}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: { backgroundColor: "lightgrey", height: 1 },
  listItem: {
    padding: 20,
  },
  listItemText: {
    fontSize: 20,
  },
});
