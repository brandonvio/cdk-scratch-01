#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkBuildStack } from '../lib/cdk-build-stack';

const app = new cdk.App();
new CdkBuildStack(app, 'CdkBuildStack');
