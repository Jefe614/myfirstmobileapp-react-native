import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function DashboardScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📊 Dashboard</Text>
      <Text style={styles.subtitle}>Your analytics and reports are here.</Text>

      {/* Line Chart */}
      <Text style={styles.chartTitle}>Sales Trend</Text>
      <LineChart
        data={{
          labels: ["Jan", "Feb", "Mar", "Apr", "May"],
          datasets: [{ data: [50, 80, 120, 90, 140] }],
        }}
        width={screenWidth - 30}
        height={220}
        yAxisLabel="$"
        chartConfig={chartConfig}
        style={styles.chart}
      />

      {/* Bar Chart */}
      <Text style={styles.chartTitle}>Monthly Revenue</Text>
      <BarChart
        data={{
          labels: ["Jan", "Feb", "Mar", "Apr", "May"],
          datasets: [{ data: [3000, 5000, 7000, 6000, 9000] }],
        }}
        width={screenWidth - 30}
        height={220}
        yAxisLabel="$"
        chartConfig={chartConfig}
        style={styles.chart}
      />
    </ScrollView>
  );
}

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(45, 156, 219, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: { borderRadius: 16 },
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: "center", padding: 15 },
  title: { fontSize: 24, fontWeight: "bold", color: "#2D9CDB", marginBottom: 5 },
  subtitle: { fontSize: 16, color: "#333", marginBottom: 15 },
  chartTitle: { fontSize: 18, fontWeight: "bold", marginTop: 15 },
  chart: { borderRadius: 16, marginVertical: 10 },
});
