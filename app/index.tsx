import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import SearchBar from "./components/SearchBar";
import EmployeeItem from "./components/EmployeeItem";
import { fetchEmployees } from "./services/api";
import { formatPhoneNumber } from "./utils/formatters";

export default function App() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedEmployee, setExpandedEmployee] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchEmployees();
        setEmployees(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const toggleEmployee = (id: string) => {
    setExpandedEmployee(expandedEmployee === id ? null : id);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Funcionários</Text>
      <SearchBar searchQuery={searchQuery} onSearchQueryChange={setSearchQuery} />
      <FlatList
        data={filteredEmployees}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={[styles.headerText]}>Foto</Text>
            <Text style={[styles.headerTextName]}>Nome</Text>
            <View style={styles.icon}>
              <View style={styles.circle} />
            </View>
          </View>
        }
        renderItem={({ item, index }) => (
          <EmployeeItem
            item={item}
            index={index}
            expandedEmployee={expandedEmployee}
            toggleEmployee={toggleEmployee}
            formatPhoneNumber={formatPhoneNumber}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#EDEFFB",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    borderTopLeftRadius: 15,  // Aplica o borderRadius no canto superior esquerdo
    borderTopRightRadius: 15, // Aplica o borderRadius no canto superior direito
    },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 25,
},
  headerTextName: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "black",
  },
  icon: {
    padding: 10,
    alignItems: "center",
  },  
});
