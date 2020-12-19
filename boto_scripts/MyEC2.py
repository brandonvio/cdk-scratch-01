import boto3
import botostubs
from botocore.config import Config

boto3.setup_default_session(profile_name='scratch-account-01')

my_config = Config(
    region_name='us-west-2',
    signature_version='v4',
    retries={
        'max_attempts': 10,
        'mode': 'standard'
    }
)

ec2: botostubs.EC2.Ec2Resource = boto3.resource('ec2', config=my_config)


class MyEC2:
    def get_instances(self):
        instances = ec2.instances.all()
        for instance in instances:
            print(instance.id, instance.instance_type, instance.state, instance.tags)
        return instances

    def stop_all_instances(self):
        instances = self.get_instances()
        for instance in instances:
            print(instance.id, instance.instance_type, instance.state)
            if instance.state["Code"] == 16:
                print("stopping instance " + instance.id)
                instance.stop()

    def start_all_instances(self):
        instances = self.get_instances()
        for instance in instances:
            print(instance.id, instance.instance_type, instance.state)
            if instance.state["Code"] == 80:
                print("starting instance " + instance.id)
                # instance.start()
