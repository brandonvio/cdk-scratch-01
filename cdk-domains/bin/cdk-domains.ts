#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkDomainsStack } from '../lib/cdk-domains-stack';

const app = new cdk.App();
new CdkDomainsStack(app, 'CdkDomainsStack');
