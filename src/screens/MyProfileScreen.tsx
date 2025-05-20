import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import BackgroundPages from "../components/BackgroundPages";
import NavBarClient from "../components/NavBarClient";
import { colors } from "../styles/colors";

export default function MyProfileScreen() {
  const cpf = "123.456.789-00";
  const placaMoto = "ABC-1234";
  const dataDevolucao = "25/05/2025";

  return (
    <BackgroundPages>
      <NavBarClient currentPage="Perfil" />
      <View style={styles.container}>
        <Image
          source={require("../../assets/NoPhotoProfile.png")}
          style={styles.avatar}
          resizeMode="contain"
        />
        <Text style={styles.title}>Meu Perfil</Text>
        <Text style={styles.info}>CPF: {cpf}</Text>

        <Text style={styles.sectionTitle}>Alugação:</Text>
        <Text style={styles.info}>Placa da Moto: {placaMoto}</Text>
        <Text style={styles.info}>Data de Devolução: {dataDevolucao}</Text>
      </View>
    </BackgroundPages>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 24,
    marginTop: 40,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ccc",
    marginBottom: 24,
  },
  title: {
    color: colors.white,
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
  },
  sectionTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 16,
  },
  info: {
    color: "#ccc",
    fontSize: 16,
    marginTop: 8,
  },
});
