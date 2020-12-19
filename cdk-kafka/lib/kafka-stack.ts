import * as cdk from "@aws-cdk/core";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as msk from "@aws-cdk/aws-msk";
import * as elbv2 from "@aws-cdk/aws-elasticloadbalancingv2";
import * as targets from "@aws-cdk/aws-elasticloadbalancingv2-targets";
import * as assets from "@aws-cdk/aws-s3-assets";
var path = require("path");

interface KafkaStackProps extends cdk.StackProps {
  vpc: ec2.IVpc;
}

export class KafkaStack extends cdk.Stack {
  public readonly vpc: ec2.Vpc;

  constructor(scope: cdk.Construct, id: string, props: KafkaStackProps) {
    super(scope, id, props);

    const vpcSubnets = props.vpc.selectSubnets({ subnetType: ec2.SubnetType.PUBLIC });

    const cluster = new msk.CfnCluster(this, "HiddenRoadKafkaCluster", {
      clusterName: "HiddenRoadKafkaCluster",
      kafkaVersion: "2.6.0",
      encryptionInfo: {
        encryptionInTransit: {
          clientBroker: "PLAINTEXT",
        },
      },
      numberOfBrokerNodes: 2,
      brokerNodeGroupInfo: {
        clientSubnets: vpcSubnets.subnetIds,
        instanceType: "kafka.t3.small",
        storageInfo: {
          ebsStorageInfo: {
            volumeSize: 5,
          },
        },
      },
    });
  }
}
