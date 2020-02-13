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

## Running the commands:

### `cm setup` 
This command will set-up the ansible server and the mattermost server. It will also set-up the passwords for the mattermost users and the vault password.

# Important:
Before you can run the `cm setup` command, you must add an environment variable named `MATTERMOST_PWD`. The value of this variable will be used to secure the mattermost database and directories.

You can also run `cm playbook cm/playbook.yml cm/inventory.ini`.

If everything is working correctly, you should see that you can run your playbook and successfully ping the mattermost VM.
```
cjparnin at MacBookPro in ~/classes/csc-devops-staff/hw2 on master [!]
$ cm playbook cm/playbook.yml cm/inventory.ini 
Running ansible script...
Warning: Permanently added '192.168.33.10' (ECDSA) to the list of known hosts.
+ '[' 2 -ge 2 ']'
+ PLAYBOOK=/bakerx/cm/playbook.yml
+ INVENTORY=/bakerx/cm/inventory.ini
+ ansible-playbook /bakerx/cm/playbook.yml -i /bakerx/cm/inventory.ini

PLAY [mattermost] **************************************************************

TASK [Gathering Facts] *********************************************************
ok: [192.168.33.80]

TASK [ping : ping the webserver] ***********************************************
ok: [192.168.33.80]

PLAY RECAP *********************************************************************
192.168.33.80              : ok=2    changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0   
```

#### Check progress

You can check your progress by running:
```bash
opunit verify -i test/inventory.yml
```

### What is in this template repo

Similar to hw1 (V), here you have a cli node app called `cm`. The commands are defined in `./commands` directory, and your configuration management (Ansible) scripts are to be added in `./cm`. 

In `./cm` we included a template for the files you will need (`playbook.yml`, and `inventory.ini`), as well as an example for Ansible roles (`./cm/roles/ping`). 
