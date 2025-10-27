import { View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/Progress";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { List } from "@/components/List";
import { Transaction } from "@/components/Transaction";
import { Button } from "@/components/Button";

export default function inProgress() {
  const params = useLocalSearchParams<{ id: string }>();

  const details = {
    current: "580,00",
    target: "1.790,00",
    percentage: 25,
  };

  const transactions = [
    {
      id: "1",
      value: "R$ 20,00",
      date: "12/12/2025",
      type: TransactionTypes.Output,
    },
    {
      id: "2",
      value: "R$ 300,00",
      date: "12/12/2025",
      description: "CDB de 110% no banco XPTO ",
      type: TransactionTypes.Input,
    },
  ];

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title="Apple Watch"
        rightbutton={{
          icon: "edit",
          onPress: () => {},
        }}
      />
      <Progress data={details} />

      <List
        title="Transações"
        data={transactions}
        renderItem={({ item }) => (
          <Transaction data={item} onRemove={() => {}} />
        )}
        emptyMessage="Nenhuma transação. Toque em nova transação para guardar seu dinheiro aqui."
      />

      <Button
        title="Nova Transação"
        onPress={() => router.navigate(`/transactions/${params.id}`)}
      />
    </View>
  );
}
