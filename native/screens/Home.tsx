import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useHelloQuery } from "../generated/graphql";

const Home = () => {
  const [{ data }] = useHelloQuery({
    variables: { helloName: "hhh" },
  });

  if (data) {
    return (
      <View style={styles.container}>
        <Text>{data.hello}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
