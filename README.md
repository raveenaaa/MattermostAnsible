# CSC 519: DevOps HW 2

To configure and set up mattermost on Ubuntu 18.04 using Ansible

## Preparing the GitHUb Repo.

### Clone and set-url
Clone the following repo. Then modify the remote so that it now will point to HW2-DevOps repo.
```bash
git clone https://github.com/CSC-DevOps/CM-Template
git remote set-url origin https://github.ncsu.edu/rmdcosta>/HW2-DevOps
git push -u origin master
```

### Install the node.js packages.
```
npm install
npm link
```

### Setting the environment variable
Before you can run the `cm setup` command, you must add an environment variable named `MATTERMOST_PWD`. The value of this variable will be used to secure the mattermost database and directories.

### Running the commands:

* `cm setup` 

This command will set-up the ansible server and the mattermost server. It will also set-up the passwords for the mattermost users and the vault password. It invokes the `server-init.sh` and `vault-setup.sh` scripts. While running this command you have the option of specifying the #vault-password# as an argument while running the command. This password is used to lock the ansible-vault which contains the mattermost user password. If nothing is provided it will be set to default.

* `cm playbook cm/playbook.yml cm/inventory.ini`

This command runs the ansible playbook. This command is given the vault-password using the `--vault-password-file` argument. 

If everything is working correctly, you should see that you can run your playbook and successfully ping the mattermost VM.

### Check progress

You can check your progress by running:
```bash
opunit verify -i test/inventory.yml
```

### Extra-credit: Mattermost-CLI

The teams and users have been created using mattermost-cli. The code for this can be found in `roles/mattermost-cli`

### Video:
* https://youtu.be/HFOva5XWkrE
