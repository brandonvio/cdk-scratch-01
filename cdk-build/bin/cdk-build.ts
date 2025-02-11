#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { CdkBuildStack } from "../lib/cdk-build-stack";

const app = new cdk.App();
new CdkBuildStack(app, "CdkBuildStack", {
  env: {
    account: "778477161868",
    region: "us-west-2",
  },
});
