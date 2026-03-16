import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const car = require("@/assets/images/car.png");
const DOWN_PAYMENT = [5, 10, 15, 20, 25, 30];
const MONEY_OPTION = [24, 36, 48, 60, 72, 84];
export default function Input() {
  const [carPrice, setCarPrice] = useState("");
  const [carDownPayment, setCarDownPayment] = useState("");
  const [carMonth, setCarMonth] = useState("");
  const [carInstallment, setCarInstallment] = useState("");
  const [carInterest, setCarInterest] = useState("");
  const handleCalClick = () => {
    if (
      carPrice === "" ||
      carDownPayment === "" ||
      carMonth === "" ||
      carInterest === ""
    ) {
      Alert.alert("คำเตือน", "กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    let downPayment = (Number(carPrice) * Number(carDownPayment)) / 100;
    // ยอดจัด
    let carPayment = Number(carPrice) - downPayment;
    // คำนวณดอกเบี้ยทั้งหมด
    let totalInterest =
      (carPayment + Number(carInterest) / 100) * (Number(carMonth) / 12);
    // คำนวณยอดผ่อนต่อเดือน
    let installmentPay = (carPayment + totalInterest) / Number(carMonth);

    router.push({
      pathname: "/result",
      params: {
        downPayment: downPayment.toFixed(2),
        carPayment: carPayment.toFixed(2),
        carPrice: Number(carPrice).toFixed(2),
        installmentPay: installmentPay.toFixed(2),
      },
    });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <Image source={car} style={styles.car} />
        <View style={styles.inputContainer}>
          <Text style={{ fontFamily: "Kanit_700Bold", fontSize: 20 }}>
            คำนวณค่างวดรถ
          </Text>
          <Text style={styles.inputTitle}>ราคา (บาท)</Text>
          <TextInput
            placeholder="เช่น 850000"
            keyboardType="numeric"
            style={styles.inputValue}
            onChangeText={setCarPrice}
          />
          <Text style={styles.inputTitle}>เลือกเงินดาวน์ (%)</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {DOWN_PAYMENT.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.downPayment,
                  carDownPayment === item.toString() &&
                    styles.downPaymentSelect,
                ]}
                onPress={() => setCarDownPayment(item.toString())}
              >
                <Text
                  style={[
                    styles.downLabel,
                    ,
                    carDownPayment === item.toString() &&
                      styles.downLabelSelect,
                  ]}
                >
                  {item}%
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text style={styles.inputTitle}>ระยะเวลาผ่อน (งวด)</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {MONEY_OPTION.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.moneyPayment,
                  carMonth === item.toString() && styles.monthPaymentSelect,
                ]}
                onPress={() => setCarMonth(item.toString())}
              >
                <Text
                  style={[
                    styles.moneyLabel,
                    carMonth === item.toString() && styles.monthLabelSelect,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.inputTitle}>ดอกเบี้ย (% ต่อปี)</Text>
          <TextInput
            placeholder="เช่น 2.59"
            keyboardType="numeric"
            style={styles.inputValue}
            onChangeText={setCarInterest}
          />
          <TouchableOpacity style={styles.btnCal} onPress={handleCalClick}>
            <Text style={styles.labelCal}>คำนวณค่างวด</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  btnCal: {
    backgroundColor: "blue",
    padding: 25,
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  labelCal: {
    fontFamily: "Kanit_600SemiBold",
    fontSize: 20,
    color: "white",
  },
  downPaymentSelect: {
    backgroundColor: "black",
  },
  downLabelSelect: {
    fontFamily: "Kanit_600SemiBold",
    fontSize: 16,
    color: "white",
  },
  monthPaymentSelect: {
    backgroundColor: "black",
  },
  monthLabelSelect: {
    fontFamily: "Kanit_600SemiBold",
    fontSize: 16,
    color: "white",
  },
  downLabel: {
    fontFamily: "Kanit_600SemiBold",
    fontSize: 16,
  },
  downPayment: {
    backgroundColor: "white",
    padding: 15,
    margin: 5,
    paddingVertical: 20,
    paddingHorizontal: 30,
    // width: 70,
    // height: 50,
    // alignItems: "center",
    // justifyContent: "center",
    borderRadius: 8,
  },
  moneyLabel: {
    fontFamily: "Kanit_600SemiBold",
    fontSize: 16,
  },
  moneyPayment: {
    backgroundColor: "white",
    padding: 15,
    margin: 5,
    paddingVertical: 20,
    paddingHorizontal: 30,
    // width: 70,
    // height: 50,
    // alignItems: "center",
    // justifyContent: "center",
    borderRadius: 8,
  },
  inputValue: {
    fontFamily: "Kanit_600SemiBold",

    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "white",
    backgroundColor: "white",
  },
  car: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  inputContainer: {
    backgroundColor: "lightgray",
    marginTop: -50,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
  },
  inputTitle: {
    fontFamily: "Kanit_600SemiBold",
    fontSize: 18,
    marginTop: 10,
  },
});
