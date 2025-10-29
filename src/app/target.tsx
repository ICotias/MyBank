import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { CurrencyInput } from "@/components/CurrencyInput ";

import { useEffect, useState } from "react";
import { Alert, StyleSheet, View, StatusBar } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useTargetDatabase } from "@/database/useTargetsDatabase";

export default function Target() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  const params = useLocalSearchParams<{ id?: string }>();
  const targetDatabase = useTargetDatabase();

  async function update() {
    try {
      await targetDatabase.update({ id: Number(params.id), name, amount });
      Alert.alert("Sucesso!", "Meta atualizada com sucesso!", [
        {
          text: "Ok",
          onPress: router.back,
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar a meta.");
      console.log(error);
      setIsProcessing(false);
    }
  }

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
      update();
    } else {
      create();
    }
  }

  async function fetchDetails(id: number) {
    try {
      const response = await targetDatabase.show(id);
      setName(response.name);
      setAmount(response.amount);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os detalhes da meta.");
      console.log(error);
    }
  }

  async function handleRemove() {
    if (!params.id) {
      return;
    }
    Alert.alert("Remover", "Deseja realmente remover?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: remove,
      },
    ]);

    async function remove() {
      try {
        setIsProcessing(true);

        await targetDatabase.remove(Number(params.id));
        Alert.alert("Meta", "Meta removida.", [
          { text: "Ok", onPress: () => router.navigate("/") },
        ]);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível remover a meta.");
        console.log(error);
      }
    }
  }

  useEffect(() => {
    if (params.id) {
      fetchDetails(Number(params.id));
    }
  }, [params.id]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <PageHeader
        title="Meta"
        subtitle="Economize para alcançar sua meta financeira "
        rightButton={
          params.id
            ? { icon: "delete", onPress: () => handleRemove() }
            : undefined
        }
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
