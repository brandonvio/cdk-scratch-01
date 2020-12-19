from kafka import KafkaProducer
import json
producer = KafkaProducer(bootstrap_servers='ops-server.westus2.cloudapp.azure.com:9092')

for i in range(100):
    print(i)
    res = producer.send('forex-price-2', b'some_message_bytes')

producer.flush()
