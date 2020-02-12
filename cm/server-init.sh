#!/bin/bash
# Exit on error
set -e

# Trace commands as we run them:
set -x

# Script used to initialize your ansible server after provisioning.
sudo add-apt-repository ppa:ansible/ansible -y
sudo apt-get update
sudo apt-get install ansible -y
sudo apt-get install expect -y

# Ensure security key has proper permissions
chmod 700 ~/.ssh/mm_rsa

# Populate /tmp/password.txt with mattermost password
echo $1 | tee /tmp/password.txt

# Populate .vault_pass with the vault-password
echo $2 | tee vault_pass.txt