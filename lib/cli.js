'use strict';


const request = require('request'),
    config = require('../.gitcommitrc.json');


function getOpenIssues() {
    let done = this.async(),
        auth = `Basic ${new Buffer(`${config.gitUsername}:${config.gitPassword}`).toString('base64')}`,
        openIssues = [];

    request.get({
        url: `https://api.github.com/repos/${config.organization}/${config.repository}/issues`,
        headers: {
            'User-Agent': 'git-commit-helper',
            'Authorization': auth
        },
        json: true
    }, function (error, response, body) {
        if (error) {
            console.error(`ERROR: ${error}`);
        }

        body.forEach(function (item) {
            if (typeof item.pull_request === 'undefined') {
                openIssues.push({
                    name: `#${item.number} - ${item.title}`,
                    value: item.number
                });
            }
        });

        done(openIssues);
    });
}


function getSubsystemChoices() {
    return config.subsystems;
}


function execute() {
    const inquirer = require('inquirer');

    function prompt() {
        let questions = [
            {
                type: 'list',
                name: 'subsystem',
                message: 'Subsystem',
                choices: getSubsystemChoices
            },
            {
                type: 'input',
                name: 'shortDescription',
                message: 'Succinct description of changes (72 characters or less)',
                validate: function (value) {
                    if (value.length <= 72) {
                        return true;
                    }
                    return 'Description must be 72 characters or less';
                }
            },
            {
                type: 'input',
                name: 'longDescription',
                message: 'Detailed description of changes'
            },
            {
                type: 'checkbox',
                name: 'fixes',
                message: 'GitHub issue(s) this commit is related to',
                choices: getOpenIssues
            }
        ];

        inquirer.prompt(questions, function (answers) {
            console.log(`${answers.subsystem}: ${answers.shortDescription}\n\n${answers.longDescription}\n\nFixes: ${answers.fixes}`);
        });
    }

    prompt();
}


module.exports = {
    execute: execute
};
