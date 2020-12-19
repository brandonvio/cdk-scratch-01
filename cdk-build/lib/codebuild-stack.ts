import * as cdk from "@aws-cdk/core";
import * as codebuild from "@aws-cdk/aws-codebuild";
import * as codepipeline from "@aws-cdk/aws-codepipeline";
import * as codepipeline_actions from "@aws-cdk/aws-codepipeline-actions";
import * as events from "@aws-cdk/aws-events";

export class CodeBuildStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const pipeline = new codepipeline.Pipeline(this, "HiddenRoadPipeline", {
      pipelineName: "hidden-road-pipeline",
    });

    const sourceOutput = new codepipeline.Artifact();
    const sourceAction = new codepipeline_actions.GitHubSourceAction({
      actionName: "GitHub_Source",
      owner: "awslabs",
      repo: "aws-cdk",
      oauthToken: cdk.SecretValue.secretsManager("my-github-token"),
      output: sourceOutput,
      branch: "develop", // default: 'master'
    });
    pipeline.addStage({
      stageName: "Source",
      actions: [sourceAction],
    });

    const buildAction = new codepipeline_actions.CodeBuildAction({
      actionName: "Build1",
      input: sourceOutput,
      project: new codebuild.PipelineProject(this, "Project", {
        buildSpec: codebuild.BuildSpec.fromObject({
          version: "0.2",
          env: {
            "exported-variables": ["MY_VAR"],
          },
          phases: {
            build: {
              commands: 'export MY_VAR="some value"',
            },
          },
        }),
      }),
      variablesNamespace: "MyNamespace", // optional - by default, a name will be generated for you
    });

    pipeline.addStage({
      stageName: "Source2",
      actions: [buildAction],
    });
  }
}
