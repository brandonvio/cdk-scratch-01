import * as cdk from "@aws-cdk/core";
import { RythmDomainStack } from "./rythm-domain-stack";
import { SubdomainsStack } from "./subdomains-stack";

export class CdkDomainsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const stack1 = new RythmDomainStack(this, "RythmDomainStack", {
      env: {
        account: "778477161868",
        region: "us-west-2",
      },
    });

    const stack2 = new SubdomainsStack(this, "SubdomainsStack", {
      zone: stack1.zone,
      env: {
        account: "778477161868",
        region: "us-west-2",
      },
    });
  }
}
