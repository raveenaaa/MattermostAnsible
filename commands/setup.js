const child = require('child_process');
const chalk = require('chalk');
const path = require('path');
const os = require('os');

const password = process.env.MATTERMOST_PWD
const scpSync = require('../lib/scp');
const sshSync = require('../lib/ssh');

exports.command = 'setup';
exports.desc = 'Provision and configure the configuration server';
exports.builder = yargs => {
    yargs.options({
        privateKey: {
            describe: 'Install the provided private key on the configuration server',
            type: 'string'
        },

        vaultpass: {
            alias: 'vp',
            describe: 'the password to be used to encrypt ansible vault',
            default: 'password',
            type: 'string'
        }
    });
};


exports.handler = async argv => {
    const { privateKey, vaultpass } = argv;

    (async () => {

        await run( privateKey, vaultpass );

    })();

};

async function run(privateKey, vaultpass) {

    console.log(chalk.greenBright('Installing configuration server!'));

    console.log(chalk.blueBright('Provisioning configuration server...'));
    let result = child.spawnSync(`bakerx`, `run ansible-srv bionic --ip 192.168.33.10 --sync`.split(' '), {shell:true, stdio: 'inherit'} );
    if( result.error ) { console.log(result.error); process.exit( result.status ); }

    console.log(chalk.blueBright('Provisioning mattermost server...'));
    result = child.spawnSync(`bakerx`, `run mattermost-srv bionic --ip 192.168.33.80`.split(' '), {shell:true, stdio: 'inherit'} );
    if( result.error ) { console.log(result.error); process.exit( result.status ); }

    console.log(chalk.blueBright('Installing privateKey on configuration server'));
    let identifyFile = privateKey || path.join(os.homedir(), '.bakerx', 'insecure_private_key');
    result = scpSync (identifyFile, 'vagrant@192.168.33.10:/home/vagrant/.ssh/mm_rsa');
    if( result.error ) { console.log(result.error); process.exit( result.status ); }

    console.log(chalk.blueBright('Running init script...'));
    result = sshSync('/bakerx/cm/server-init.sh', 'vagrant@192.168.33.10', password, vaultpass);
    if( result.error ) { console.log(result.error); process.exit( result.status ); }

    // Securing the ansible-vault using vaultpass
    result = sshSync('/bakerx/cm/vault-setup.sh', 'vagrant@192.168.33.10', vaultpass);
    if( result.error ) { console.log(result.error); process.exit( result.status ); }

}
