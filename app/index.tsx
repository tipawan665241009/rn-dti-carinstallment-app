import { router } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
const carlogo = require("@/assets/images/carlogo.png");
export default function Index() {
  useEffect(() => {
    setTimeout(() => {
      router.replace("/input");
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <Image source={carlogo} style={styles.carlogo} />
      <Text style={styles.appnameth}>Smart auto Loan</Text>
      <Text style={styles.appnameth}>วางแผนออกรถฉบับมือโปร</Text>
      <ActivityIndicator
        size={"large"}
        color={"black"}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  appnameen: {
    fontFamily: "Kanit_700Bold",
    fontSize: 20,
  },
  appnameth: {
    fontFamily: "Kanit_700Bold",
    fontSize: 20,
  },
  carlogo: {
    width: 200,
    height: 200,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
  },
});
