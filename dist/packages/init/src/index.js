"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cp = tslib_1.__importStar(require("child_process"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const inquirer_1 = tslib_1.__importDefault(require("inquirer"));
const color = "#1890FF";
const runCommand = async (project) => {
    console.log(chalk_1.default.hex(color)(`
	███████╗██╗ ██████╗ ███╗   ██╗ █████╗  ██████╗
	██╔════╝██║██╔════╝ ████╗  ██║██╔══██╗██╔════╝
	███████╗██║██║  ███╗██╔██╗ ██║███████║██║     
	╚════██║██║██║   ██║██║╚██╗██║██╔══██║██║     
	███████║██║╚██████╔╝██║ ╚████║██║  ██║╚██████╗
	╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝                                            
	`));
    const version = await execute('signac --version');
    console.log(chalk_1.default.cyan(`🖼  Welcome to Signac v${version.replace(/[\r\n]/gm, '')} 🎨`));
    inquirer_1.default
        .prompt([
        {
            type: 'list',
            name: 'intent',
            message: 'What do you want to do?',
            choices: ['Create a ink! project', 'Create an empty workspace', 'Quit'],
        },
    ])
        .then(async (answers) => {
        switch (answers.intent) {
            case 0: {
                await runNx(project);
                await addContract(project);
                break;
            }
            case 1: {
                await runNx(project);
                break;
            }
            case 2: {
                break;
            }
            default: {
                break;
            }
        }
    });
};
function runNx(project) {
    return new Promise((resolve, reject) => {
        cp.spawn(`npx create-nx-workspace ${project} --preset=nxink`, {
            shell: true,
            stdio: "inherit",
        })
            .on("error", reject)
            .on("close", code => {
            if (code)
                reject(new Error(`Cargo failed with exit code ${code}`));
            else
                resolve();
        });
    });
}
function addContract(project) {
    return new Promise((resolve, reject) => {
        cp.spawn("nx generate nxink:ink my-ink-contract", {
            cwd: `./${project}`,
            shell: true,
            stdio: "inherit",
        })
            .on("error", reject)
            .on("close", code => {
            if (code)
                reject(new Error(`Cargo failed with exit code ${code}`));
            else
                resolve();
        });
    });
}
const execute = async (command) => {
    return new Promise((resolve, reject) => {
        const exec = require("child_process").exec;
        exec(command, function (error, stdout, stderr) {
            if (error) {
                reject(error);
                return;
            }
            if (stderr) {
                reject(stderr);
                return;
            }
            else {
                resolve(stdout);
            }
        });
    });
};
exports.default = runCommand;
//# sourceMappingURL=index.js.map