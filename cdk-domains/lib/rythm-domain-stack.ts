import * as cdk from "@aws-cdk/core";
import * as route53 from "@aws-cdk/aws-route53";
import * as targets from "@aws-cdk/aws-route53-targets";
import * as elb from "@aws-cdk/aws-elasticloadbalancingv2";
import * as acm from "@aws-cdk/aws-certificatemanager";
import { VerificationEmailStyle } from "@aws-cdk/aws-cognito";

export class RythmDomainStack extends cdk.Stack {
  public readonly zone: route53.HostedZone;
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const zone = new route53.PublicHostedZone(this, "RythmHostedZone", {
      zoneName: "rythm.cc",
    });

    const cert = new acm.Certificate(this, "RythmCertificate", {
      subjectAlternativeNames: ["rythm.cc"],
      domainName: "*.rythm.cc",
      validation: acm.CertificateValidation.fromDns(zone),
    });

    new cdk.CfnOutput(this, "Rythm Certificate ARN", {
      value: cert.certificateArn,
    });

    this.zone = zone;
  }
}
