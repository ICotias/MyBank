import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput ";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { TransactionType } from "@/components/TransactionTypes";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, StyleSheet, Alert, StatusBar } from "react-native";

export default function Transaction() {
  const [type, setType] = useState(TransactionTypes.Input);
  const [amount, setAmount] = useState(0);
  const [isCreating, setIsCreating] = useState(false);
  const [observation, setObservation] = useState("");

  const params = useLocalSearchParams<{ id: string }>();
  const transactionDatabase = useTransactionsDatabase();

  async function handleCreate() {
    try {
      if (!amount || amount <= 0) {
        return Alert.alert(
          "Atenção",
          "Preencha o valor. A transação deve ser maior que 0."
        );
      }
      setIsCreating(true);
      await transactionDatabase.create({
        target_id: Number(params.id),
        amount: type === TransactionTypes.Output ? amount * -1 : amount,
        observation,
      });
      Alert.alert("Sucesso", "Transação efetuada com sucesso", [
        { text: "Ok", onPress: router.back },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar a transação.");
      console.log(error);
      setIsCreating(false);
    }
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Nova Transção"
        subtitle="A cada valor guardado você ficar mais próximo da sua meta. Se esforce para guardar e evitar retirar"
      />
      <View style={styles.currencyInput}>
        <TransactionType selected={type} onChange={setType} />

        <CurrencyInput
          label="Valor (R$)"
          value={amount}
          onChangeValue={setAmount}
        />

        <Input
          label="Motivo (Opcional)"
          placeholder="Ex: Investir em CDB de 110% no banco XPTO"
          onChangeText={setObservation}
          value={observation}
        />

        <Button
          title="Salvar"
          isProcessing={isCreating}
          onPress={handleCreate}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  currencyInput: {
    marginTop: 32,
    gap: 24,
  },
});
