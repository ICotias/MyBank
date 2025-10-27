import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput ";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { TransactionType } from "@/components/TransactionTypes";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View, StyleSheet } from "react-native";

export default function Transaction() {
  const [type, setType] = useState(TransactionTypes.Input);
  const params = useLocalSearchParams<{ id: string }>();
  return (
    <View style={styles.container}>
      <PageHeader
        title="Nova Transção"
        subtitle="A cada valor guardado você ficar mais próximo da sua meta. Se esforce para guardar e evitar retirar"
      />
      <View style={styles.currencyInput}>
        <TransactionType selected={type} onChange={setType} />

        <CurrencyInput label="Valor (R$)" value={0} />

        <Input
          label="Motivo (Opcional)"
          placeholder="Ex: Investir em CDB de 110% no banco XPTO"
        />

        <Button title="Salvar" />
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
