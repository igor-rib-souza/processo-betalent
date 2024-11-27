import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';

interface SearchBarProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchQueryChange }) => {
  return (
    <View style={styles.searchContainer}>
      <Feather name="search" size={20} color="#1C1C1C" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar"
        value={searchQuery}
        onChangeText={onSearchQueryChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default SearchBar;
