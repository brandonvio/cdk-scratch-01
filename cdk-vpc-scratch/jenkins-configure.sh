#!/bin/bash

# update
sudo apt-get update

# install java.
sudo apt-get install openjdk-8-jdk -y

# version
java -version

## jenkins
# get key
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -

# add repo
sudo apt-add-repository "deb https://pkg.jenkins.io/debian-stable binary/"

# install
sudo apt-get install jenkins -y

# start
sudo systemctl start jenkins

# status
sudo systemctl status jenkins

## node
# get source
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -

# install
sudo apt-get install -y nodejs

# version
node --version

## aws cli
# install unzip
sudo apt install unzip -y

# get install
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"

# unzip
unzip awscliv2.zip

# link
sudo ./aws/install -i /usr/local/aws-cli -b /usr/local/bin

# version
aws --version

## cdk
sudo npm install -g aws-cdk

# version
cdk --version

## typescript
sudo npm install -g typescript

# version
tsc --version

## gatsby
sudo npm install -g gatsby-cli install -g

# version
gatsby --version

# password
echo "Jenkins Initial Password!"

# password
sudo cat /var/lib/jenkins/secrets/initialAdminPassword