import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";

const ASSESSMENTS = ["Assignment", "Mid", "Project", "Final"];

export default function App() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState("");
  const [selected, setSelected] = useState([]);
  const [continuous, setContinuous] = useState("");
  const [finalExam, setFinalExam] = useState("");

  const [result, setResult] = useState({
    id: "",
    name: "",
    gender: "",
    course: "",
    assessments: "",
    score: 0,
    grade: "",
  });

  const toggleAssessment = (item) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((a) => a !== item));
      return;
    }
    const continuousCount = selected.filter((a) => a !== "Final").length;
    if (item !== "Final" && continuousCount >= 2) {
      Alert.alert(
        "Not allowed",
        "Select only two continuous assessments and the Final exam."
      );
      return;
    }
    setSelected([...selected, item]);
  };

  const calculateGrade = () => {
    if (!id || !name || !gender || !course) {
      Alert.alert("Missing data", "Please fill ID, Name, Gender and Course.");
      return;
    }
    if (!selected.includes("Final") || selected.length !== 3) {
      Alert.alert(
        "Assessment",
        "Select two continuous assessments and the Final exam."
      );
      return;
    }

    const cont = parseFloat(continuous);
    const fin = parseFloat(finalExam);

    if (isNaN(cont) || isNaN(fin)) {
      Alert.alert("Invalid score", "Enter both scores as numbers.");
      return;
    }
    if (cont < 0 || cont > 50 || fin < 0 || fin > 50) {
      Alert.alert("Invalid score", "Continuous max is 50 and Final max is 50.");
      return;
    }

    const total = cont + fin;

    let grade;
    if (total >= 90) {
      grade = "A+";
    } else if (total >= 85) {
      grade = "A";
    } else if (total >= 80) {
      grade = "A-";
    } else if (total >= 75) {
      grade = "B+";
    } else if (total >= 70) {
      grade = "B";
    } else if (total >= 65) {
      grade = "B-";
    } else if (total >= 60) {
      grade = "C+";
    } else if (total >= 50) {
      grade = "C";
    } else if (total >= 45) {
      grade = "C-";
    } else if (total >= 40) {
      grade = "D";
    } else {
      grade = "F";
    }

    setResult({
      id,
      name,
      gender: gender === "Male" ? "M" : "F",
      course,
      assessments: selected.join(", "),
      score: total,
      grade,
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.box}>
          <TextInput
            style={styles.input}
            placeholder="Id"
            value={id}
            onChangeText={setId}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Gender:</Text>
          {["Male", "Female"].map((g) => (
            <TouchableOpacity
              key={g}
              style={styles.radioWrap}
              onPress={() => setGender(g)}
            >
              <View style={styles.radioOuter}>
                {gender === g && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.label}>{g}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.pickerWrap}>
          <Picker selectedValue={course} onValueChange={(v) => setCourse(v)}>
            <Picker.Item label="select course" value="" />
            <Picker.Item label="Programming" value="Programming" />
            <Picker.Item label="Database" value="Database" />
            <Picker.Item label="Networking" value="Networking" />
            <Picker.Item label="Mobile Development" value="Mobile Development" />
          </Picker>
        </View>

        <Text style={styles.label}>Assessment Type:</Text>
        <View style={[styles.row, styles.boxRow]}>
          {ASSESSMENTS.map((a) => (
            <View key={a} style={styles.checkWrap}>
              <Checkbox
                value={selected.includes(a)}
                onValueChange={() => toggleAssessment(a)}
                color={selected.includes(a) ? "#00897B" : undefined}
              />
              <Text style={styles.checkText}>{a}</Text>
            </View>
          ))}
        </View>

        <View style={styles.box}>
          <TextInput
            style={styles.input}
            placeholder="Continuous Assessments score(50%)"
            value={continuous}
            onChangeText={setContinuous}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Final examination score (50%)"
            value={finalExam}
            onChangeText={setFinalExam}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={calculateGrade}>
          <Text style={styles.buttonText}>GRADE</Text>
        </TouchableOpacity>

        <View style={styles.output}>
          <Text style={styles.outText}>Id: {result.id}</Text>
          <Text style={styles.outText}>Name: {result.name}</Text>
          <Text style={styles.outText}>Gender: {result.gender}</Text>
          <Text style={styles.outText}>Course: {result.course}</Text>
          <Text style={styles.outText}>Assessments: {result.assessments}</Text>
          <Text style={styles.outText}>Score: {result.score}</Text>
          <Text style={styles.outText}>Grade: {result.grade}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f4f6fb",
    paddingTop: 30,
  },
  header: {
    height: 28,
    backgroundColor: "#4682B4",
    marginRight: 11,
    marginLeft: 11,
    borderRadius: 6,
  },
  container: { padding: 10 },
  box: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 6,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 4,
    backgroundColor: "#fff",
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  label: {
    fontSize: 15,
    marginRight: 8,
  },
  radioWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#6750A4",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
  },
  radioInner: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#6750A4",
  },
  pickerWrap: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 4,
    backgroundColor: "#fff",
    marginBottom: 6,
  },
  boxRow: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 8,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  checkWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkText: {
    marginLeft: 4,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  output: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 8,
    backgroundColor: "#fff",
  },
  outText: {
    fontSize: 15,
    marginVertical: 1,
  },
});
