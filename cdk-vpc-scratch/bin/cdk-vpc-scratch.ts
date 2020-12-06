#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { CdkVpcScratchStack } from "../lib/_cdk-vpc-scratch-stack";

const app = new cdk.App();
new CdkVpcScratchStack(app, "CdkVpcScratchStack");
