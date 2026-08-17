import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as iam from "aws-cdk-lib/aws-iam";

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // --- DynamoDB Tables ---
    const usersTable = new dynamodb.Table(this, "UsersTable", {
      tableName: "sportily_users",
      partitionKey: { name: "email", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    usersTable.addGlobalSecondaryIndex({
      indexName: "id-index",
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
    });

    const inquiriesTable = new dynamodb.Table(this, "InquiriesTable", {
      tableName: "sportily_inquiries",
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    // --- IAM Role for EC2 (access DynamoDB) ---
    const ec2Role = new iam.Role(this, "EC2Role", {
      assumedBy: new iam.ServicePrincipal("ec2.amazonaws.com"),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonDynamoDBFullAccess"),
      ],
    });

    // --- VPC (default) ---
    const vpc = ec2.Vpc.fromLookup(this, "DefaultVpc", { isDefault: true });

    // --- Security Group ---
    const sg = new ec2.SecurityGroup(this, "BackendSG", {
      vpc,
      description: "Sportily backend security group",
      allowAllOutbound: true,
    });
    sg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), "SSH");
    sg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), "HTTP");
    sg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443), "HTTPS");
    sg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(8000), "FastAPI");

    // --- EC2 Instance ---
    const instance = new ec2.Instance(this, "BackendInstance", {
      vpc,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T2,
        ec2.InstanceSize.MICRO
      ),
      machineImage: ec2.MachineImage.latestAmazonLinux2023(),
      securityGroup: sg,
      role: ec2Role,
      keyPair: ec2.KeyPair.fromKeyPairName(this, "KeyPair", "sportily-key"),
    });

    // --- Elastic IP ---
    const eip = new ec2.CfnEIP(this, "BackendEIP", {
      instanceId: instance.instanceId,
    });

    // --- Outputs ---
    new cdk.CfnOutput(this, "EC2PublicIP", {
      value: eip.ref,
      description: "EC2 Elastic IP — use this as your backend host",
    });

    new cdk.CfnOutput(this, "UsersTableName", {
      value: usersTable.tableName,
    });

    new cdk.CfnOutput(this, "InquiriesTableName", {
      value: inquiriesTable.tableName,
    });
  }
}
