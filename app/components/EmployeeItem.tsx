import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';
import { Employee } from "../types";

interface EmployeeItemProps {
  item: Employee;
  index: number;
  expandedEmployee: string | null;
  toggleEmployee: (id: string) => void;
  formatPhoneNumber: (phone: string) => string;
}

const EmployeeItem: React.FC<EmployeeItemProps> = ({ item, index, expandedEmployee, toggleEmployee, formatPhoneNumber }) => (
  <View>
    <View style={styles.employeeItem}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.employeeName}>{item.name}</Text>
      <TouchableOpacity style={styles.icon} onPress={() => toggleEmployee(item.id)}>
        <Feather name={expandedEmployee === item.id ? "chevron-up" : "chevron-down"} size={28} color="blue" />
      </TouchableOpacity>
    </View>

    {expandedEmployee === item.id && (
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>Cargo: {item.job}</Text>
        <Text style={styles.detailText}>Data de Admissão: {new Date(item.admission_date).toLocaleDateString("pt-BR")}</Text>
        <Text style={styles.detailText}>Telefone: {formatPhoneNumber(item.phone)}</Text>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  employeeItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ddd",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 15,
  },
  employeeName: {
    flex: 1,
    fontSize: 18,
  },
  icon: {
    padding: 10,
    alignItems: "center",
  },
  detailsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#F9F9F9",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  detailText: {
    fontSize: 16,
    color: "#555",
    marginVertical: 2,
  },
});

export default EmployeeItem;
