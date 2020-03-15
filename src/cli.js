const branchName = require('current-git-branch');

export async function cli(args) {
    const commitMessage = args[2];

    console.log(branchName())


}
