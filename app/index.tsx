import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image, TextInput, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';

export default function Page() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedEmployee, setExpandedEmployee] = useState<string | null>(null); // Estado para controlar qual funcionário está expandido

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

  const formatPhoneNumber = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, ""); // Remove caracteres não numéricos
    const match = cleaned.match(/^(\d{2})(\d{2})(\d{1})(\d{4})(\d{4})$/);
    if (match) {
      return `+${match[1]} ${match[2]} ${match[3]}${match[4]}-${match[5]}`;
    }
    return phone; // Retorna o original se não corresponder ao padrão
  };


  useEffect(() => {
    fetchData();
  }, []);

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleEmployee = (id: string) => {
    setExpandedEmployee(expandedEmployee === id ? null : id);
  };

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
        <Feather name="search" size={20} color="#1C1C1C" style={styles.searchIcon} />
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
        renderItem={({ item, index }) => (
          <View>
            <View
              style={[
                styles.employeeItem,
                index === filteredEmployees.length - 1 && {
                  borderBottomLeftRadius: 15,  // Aplica o borderRadius no canto inferior esquerdo
                  borderBottomRightRadius: 15, // Aplica o borderRadius no canto inferior direito
                  overflow: 'hidden',          // Necessário para evitar que o arredondamento seja cortado
                },
              ]}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.employeeName}>{item.name}</Text>
              <TouchableOpacity style={styles.icon} onPress={() => toggleEmployee(item.id)}>
                <Feather
                  name={expandedEmployee === item.id ? "chevron-up" : "chevron-down"}
                  size={28}
                  color="blue"
                />
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
    color: "#1C1C1C",
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
  });
