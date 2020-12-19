import * as cdk from "@aws-cdk/core";
import { CodeBuildStack } from "./codebuild-stack";

export class CdkBuildStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const codebuildStack = new CodeBuildStack(this, "CodeBuildStack", {});
  }
}
