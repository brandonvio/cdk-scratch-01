import * as cdk from "@aws-cdk/core";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as elbv2 from "@aws-cdk/aws-elasticloadbalancingv2";
import * as elbtargets from "@aws-cdk/aws-elasticloadbalancingv2-targets";
import * as route53 from "@aws-cdk/aws-route53";
import * as targets from "@aws-cdk/aws-route53-targets";
var path = require("path");

export interface AlbStackProps extends cdk.StackProps {
  vpc: ec2.IVpc;
  jenkinsInstance: ec2.Instance;
}

export class AlbStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: AlbStackProps) {
    super(scope, id, props);

    const lbSecurityGroup = new ec2.SecurityGroup(this, "lbSecurityGroup", {
      vpc: props.vpc,
      allowAllOutbound: true,
      description: "CDK Security Group",
    });

    lbSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.allTraffic(), "All traffic");
    // lbSecurityGroup.addEgressRule(ec2.Peer.anyIpv4(), ec2.Port.allTraffic(), "All traffic");

    const lb = new elbv2.ApplicationLoadBalancer(this, "LB", {
      securityGroup: lbSecurityGroup,
      vpcSubnets: props.vpc.selectSubnets({ subnetType: ec2.SubnetType.PUBLIC }),
      vpc: props.vpc,
      internetFacing: true,
    });

    new cdk.CfnOutput(this, "Jenkins Load Balancer ARN", {
      value: lb.loadBalancerArn,
    });

    new cdk.CfnOutput(this, "Jenkins Load Balancer DNS", {
      value: lb.loadBalancerDnsName,
    });

    const cert = elbv2.ListenerCertificate.fromArn(
      "arn:aws:acm:us-west-2:778477161868:certificate/df256547-14c7-42ad-a0b2-af9413c7f497"
    );

    const listener = lb.addListener("Listener", {
      port: 443,
      open: true,
      certificates: [cert],
    });

    listener.addTargets("JenkinsTarget", {
      port: 8080,
      targets: [new elbtargets.InstanceTarget(props.jenkinsInstance, 8080)],
      healthCheck: {
        enabled: true,
        protocol: elbv2.Protocol.HTTP,
        healthyHttpCodes: "200,403",
      },
    });

    const zone = route53.PublicHostedZone.fromHostedZoneAttributes(this, "hostedZone", {
      hostedZoneId: "Z02910872WY3GQAAWBJ50",
      zoneName: "rythm.cc",
    });

    const buildARecord = new route53.ARecord(this, "BuildARecord", {
      zone: zone,
      recordName: "build",
      target: route53.RecordTarget.fromAlias(new targets.LoadBalancerTarget(lb)),
    });
  }
}
