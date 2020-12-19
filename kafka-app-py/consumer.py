from kafka import KafkaConsumer

hidden-road-pipeline

consumer = KafkaConsumer('forex-price-2',
                         group_id='my-app-xyz',
                         bootstrap_servers='ops-server.westus2.cloudapp.azure.com:9092')

for msg in consumer:
    print(msg)



from kafka.admin import KafkaAdminClient, NewTopic
import kafka
from src.EnvUtil import EnvUtil

confluent_sasl_plain_username = EnvUtil.get_secret("confluent_sasl_plain_username")
confluent_sasl_plain_password = EnvUtil.get_secret("confluent_sasl_plain_password")
kafka_bootstrap_servers = EnvUtil.get_env("bootstrap_servers")
stream_topic = EnvUtil.get_env("STREAM_TOPIC")

admin_client = KafkaAdminClient(
    bootstrap_servers=[kafka_bootstrap_servers],
    security_protocol="SASL_SSL",
    sasl_mechanism="PLAIN",
    sasl_plain_username=confluent_sasl_plain_username,
    sasl_plain_password=confluent_sasl_plain_username
)

topics = admin_client.describe_topics()
print(topics)

try:
    topic_list = []
    topic_list.append(NewTopic(name=stream_topic,
                               num_partitions=1,
                               replication_factor=3))

    response = admin_client.create_topics(new_topics=topic_list, validate_only=False)
    print(response)
except kafka.errors.TopicAlreadyExistsError:
    print("Topic already exists.")



from kafka import KafkaConsumer

consumer = KafkaConsumer("rythm-oanda-price-stream-topic",
                         bootstrap_servers=["pkc-4kgmg.us-west-2.aws.confluent.cloud:9092"],
                         security_protocol="SASL_SSL",
                         sasl_mechanism="PLAIN",
                         sasl_plain_username=None,
                         sasl_plain_password=None)

for msg in consumer:
    print(msg)


from kafka import KafkaProducer
import kafka


kafka_producer = KafkaProducer(
    bootstrap_servers=["pkc-4kgmg.us-west-2.aws.confluent.cloud:9092"],
    security_protocol="SASL_SSL",
    sasl_mechanism="PLAIN",
    sasl_plain_username=None,
    sasl_plain_password=None
)


RythmCluster

rythm-price-micro-serv-repo

rythm-oanda-price-stream-topic

rythm-price-micro-serve-codebuild




778477161868.dkr.ecr.us-west-2.amazonaws.com/rythm-price-micro-serv-repo:latest
778477161868.dkr.ecr.us-west-2.amazonaws.com/rythm-price-micro-serv-repo:latest




  credentials: {
    accessKeyId: "AKIA3KQG2ZWGP3LPVXGJ",
    secretAccessKey: "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",
  },
  region: "us-west-2",