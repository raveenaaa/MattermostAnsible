#!/usr/bin/expect
# Lock the vault with vaultpass

set timeout 1
set vaultpass [lindex $argv 0];

spawn ansible-vault encrypt /tmp/password.txt
expect "New Vault password: "
send "$vaultpass\r"
expect "Confirm New Vault password: "
send "$vaultpass\r"
expect "Encryption successful"
expect eof
