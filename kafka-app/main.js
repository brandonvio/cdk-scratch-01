const { Kafka } = require("kafkajs");

(async () => {
  const b1 = "ops-server.westus2.cloudapp.azure.com:9092";
  //   const b2 = "b-2.hiddenroadkafkacluster.dno6ll.c5.kafka.us-west-2.amazonaws.com:9092";
  const kafka = new Kafka({ clientId: "my-app-xyz", brokers: [b1] });
  const admin = kafka.admin();
  await admin.connect();
  const cl = await admin.describeCluster();
  console.log(cl);

  //   let topics = await admin.listTopics();
  //   console.log(topics);

  //   await admin.createTopics({
  //     topics: [
  //       {
  //         topic: "forex-price-2",
  //       },
  //     ],
  //   });

  //   topics = await admin.listTopics();
  //   console.log(topics);

  const producer = kafka.producer();
  await producer.connect();
  await producer.send({
    topic: "forex-price-2",
    messages: [{ value: "Hello KafkaJS user!" }],
  });
  await producer.disconnect();

  //   //   await admin.disconnect();
  //   //   const producer = kafka.producer();
  //   //   await producer.connect();

  //   const consumer = kafka.consumer({ groupId: "test-group" });
  //   await consumer.connect();
  //   await consumer.subscribe({ topic: "forex-price-2", fromBeginning: true });
  //   await consumer.run({
  //     eachMessage: async ({ topic, partition, message }) => {
  //       console.log({
  //         value: message.value.toString(),
  //       });
  //     },
  //   });
})();
