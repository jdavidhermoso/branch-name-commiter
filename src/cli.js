const branchName = require('current-git-branch');
const git = require('simple-git')();
const PROTECTED_BRANCHES = ["MASTER", "master", "REL", "rel", "DEV", "dev", "DEVELOPMENT", "development"];

export function cli(args) {
    const commitMessage = args[2];
    const currentBranchName = branchName();

    if (!currentBranchName) {
        console.error(`⛔Branch not found. Please, check your branch.⛔`);
        return;
    }

    if (!commitMessage) {
        console.error(`⛔It's difficult to know what you changed. Please, add a commit message.⛔`);
        return;
    }

    if (PROTECTED_BRANCHES.includes(currentBranchName)) {
        console.error(`⛔You are in the wrong branch. You can't directly commit in master, REL or DEV!🔒
Please, create a feature branch and use a PULL Request.⛔`);
        return;
    }

    git.commit(standardCommitMessage(currentBranchName, commitMessage));

    console.log(`Your commit with message "${commitMessage}" was added to branch "${currentBranchName}"`);
}

function standardCommitMessage(branchName, commitMessage) {
    return `#${branchName}
    
    
${commitMessage}`;
}
