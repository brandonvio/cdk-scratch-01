import * as cdk from "@aws-cdk/core";
import * as ec2 from "@aws-cdk/aws-ec2";
import { KafkaStack } from "./kafka-stack";

export class CdkKafkaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = ec2.Vpc.fromLookup(this, "vpc", {
      vpcId: "vpc-0f71af096d6ba9b0d",
    });

    const kafkaStack = new KafkaStack(this, "KafkaStack", {
      vpc: vpc,
    });
    // kafkaStack.addDependency(vpcStack);
  }
}
