// Retrieve last commit from GitHub
async function getLastCommit() {
    var data = {
        sha: "",
        url: ""
    }

    return new Promise((resolve, reject) => {
        fetch("https://api.github.com/repos/agentisnotreal/stuff.agentdoesnotexist.xyz/commits/master")
            .then(function(res) {
                return res.json();
            }).then(function(body) {
                if (!body) {
                    return reject(new Error("Failed to receive commit data from GitHub! Error: No body"));
                } else {

                    data.sha = body.sha;
                    data.url = body.html_url;
                    return resolve(data);
                }
            }).catch(function(e) {
                reject(new Error("Failed to receive commit data from GitHub! Error: " + e.message));
            })
    })
}

// Display Commit ID
async function setDisplayedCommit(element) {
    var a = document.getElementById(element);
    try {
        var cData = await getLastCommit();
        a.innerHTML = "git-" + cData.sha.substr(0, 7);
        a.href = cData.url;
        return;
    } catch (e) {
        console.error(e);
        a.innerHTML = "git-UNKNOWN";
    }
}