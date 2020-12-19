const { Kafka } = require("kafkajs");

(async () => {
  const b1 = "ops-server.westus2.cloudapp.azure.com:9092";
  //   const b2 = "b-2.hiddenroadkafkacluster.dno6ll.c5.kafka.us-west-2.amazonaws.com:9092";
  const kafka = new Kafka({ clientId: "my-app-xyz", brokers: [b1] });
  const admin = kafka.admin();
  await admin.connect();
  const cl = await admin.describeCluster();
  console.log(cl);

  const producer = kafka.producer();
  await producer.connect();

  for (let i = 0; i < 10000; i++) {
    await producer.send({
      topic: "forex-price-2",
      messages: [{ value: "Hello KafkaJS user! " + i }],
    });
  }

  await producer.disconnect();
})();
