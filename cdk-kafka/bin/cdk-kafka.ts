#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { CdkKafkaStack } from "../lib/cdk-kafka-stack";

const app = new cdk.App();
new CdkKafkaStack(app, "CdkKafkaStack", {
  env: {
    account: "778477161868",
    region: "us-west-2",
  },
});
