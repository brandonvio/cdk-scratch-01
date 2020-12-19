import * as cdk from "@aws-cdk/core";
import { VpcStack } from "./vpc-stack";
import { JenkinsStack } from "./jenkins-stack";
import { AlbStack } from "./alb-stack";

export class CdkVpcScratchStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpcStack = new VpcStack(this, "VpcStack", props);

    const jenkinsStack = new JenkinsStack(this, "JenkinsStack", {
      vpc: vpcStack.vpc,
      env: props?.env,
    });
    jenkinsStack.addDependency(vpcStack);

    const albStack = new AlbStack(this, "AlbStack", {
      vpc: vpcStack.vpc,
      jenkinsInstance: jenkinsStack.jenkinsInstance,
      env: props?.env,
    });
    albStack.addDependency(jenkinsStack);
  }
}
