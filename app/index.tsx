import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons'; // Para o ícone da setinha

export default function Page() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Buscar os dados da API usando fetch
  const fetchData = async () => {
    try {
      const response = await fetch("http://10.0.2.2:3000/employees");
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
        setLoading(false);
      } else {
        console.error("Erro ao buscar dados da API");
        setLoading(false);
      }
    } catch (error) {
      console.error("Erro ao buscar dados da API", error);
      setLoading(false);
    }
  };

  // useEffect para carregar os dados ao iniciar
  useEffect(() => {
    fetchData();
  }, []);

  // Função para filtrar os funcionários
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

      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={20} color="#1C1C1C" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>



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
        renderItem={({ item }) => (
          <View style={styles.employeeItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.employeeName}>{item.name}</Text>
            <TouchableOpacity style={styles.icon}>
              <FontAwesome name="caret-down" size={24} color="blue" />
            </TouchableOpacity>
          </View>
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 30,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchIcon: {
    height: 24,
    width: 24,
    color: "#1C1C1C"
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#1C1C1C",
  },
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
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#F0F0F0",
    borderBottomWidth: 1,
    borderColor: "#ddd",
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
  });
