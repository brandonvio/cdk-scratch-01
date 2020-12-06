import * as cdk from "@aws-cdk/core";
import { VpcStack } from "./vpc-stack";
import { JenkinsStack } from "./jenkins-stack";
import { AlbStack } from "./alb-stack";

export class CdkVpcScratchStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const vpcStack = new VpcStack(this, "VpcStack", {
      env: {
        account: "778477161868",
        region: "us-west-2",
      },
    });

    const jenkinsStack = new JenkinsStack(this, "JenkinsStack", {
      vpc: vpcStack.vpc,
      env: {
        account: "778477161868",
        region: "us-west-2",
      },
    });
    jenkinsStack.addDependency(vpcStack);

    const albStack = new AlbStack(this, "AlbStack", {
      vpc: vpcStack.vpc,
      jenkinsInstance: jenkinsStack.jenkinsInstance,
      env: {
        account: "778477161868",
        region: "us-west-2",
      },
    });
    albStack.addDependency(jenkinsStack);
  }
}
