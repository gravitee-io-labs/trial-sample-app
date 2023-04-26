import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "todo-app",
  brokers: ["app-kafka-broker:29092"],
});
