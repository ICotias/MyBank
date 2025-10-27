import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { CurrencyInput } from "@/components/CurrencyInput ";

import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useTargetDatabase } from "@/database/useTargetDatabase";

export default function Target() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  const params = useLocalSearchParams<{ id?: string }>();
  const targetDatabase = useTargetDatabase();

  async function create() {
    await targetDatabase.create({ name, amount });
    try {
      Alert.alert("Nova meta", "Meta criada com sucesso!", [
        {
          text: "Ok",
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar a meta.");
      console.log(Error);
      setIsProcessing(false);
    }
  }

  function handleSave() {
    if (!name.trim()) {
      return Alert.alert("Atenção", "Preencha a aba de nome");
    } else if (amount <= 0) {
      return Alert.alert("Atenção", "Insira um valor maior que 0 ");
    }

    setIsProcessing(true);

    if (params.id) {
      //update
    } else {
      create();
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <PageHeader
        title="Meta"
        subtitle="Economize para alcançar sua meta financeira "
      />
      <View style={{ marginTop: 32, gap: 24 }}>
        <Input
          label="Nome da Meta (R$)"
          placeholder="Ex: Viagem para praia, Apple Watch"
          onChangeText={setName}
          value={name}
        />
        <CurrencyInput
          label="Valor alvo"
          value={amount}
          onChangeValue={setAmount}
        />
        <Button
          title="Salvar"
          onPress={handleSave}
          isProcessing={isProcessing}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
