async function getData(discordid) {
    return new Promise(async(resolve, reject) => {
        let info = {
            bloxlink: {},
            rover: {}
        };

        let roverFetch = await fetch('https://cors.agentdoesnotexist.xyz/rover', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'discordid': discordid
            },
        });

        info.rover = await roverFetch.json();

        console.log(info.rover);
        let bloxlinkFetch = await fetch(`https://api.blox.link/v1/user/${discordid}`);
        info.bloxlink = await bloxlinkFetch.json();

        console.log(info.bloxlink);
        return resolve(info);
    })
}

function setData(discordid) {
    document.getElementById('avatar').src = 'http://www.roblox.com/Thumbs/Avatar.ashx?x=250&y=250&Format=Png&id=0';
    getData(document.getElementById(discordid).value).then(data => {
        if (data.rover.status == 'ok') {
            document.getElementById('roverUsername').textContent = data.rover.robloxUsername;
            document.getElementById('roverId').textContent = data.rover.robloxId;

            document.getElementById('avatar').src = `http://www.roblox.com/Thumbs/Avatar.ashx?x=250&y=250&Format=Png&username=${data.rover.robloxUsername}`;
        } else {
            document.getElementById('roverUsername').textContent = 'N/A',
                document.getElementById('roverId').textContent = 'N/A'
        }

        if (data.bloxlink.status == 'ok') {
            document.getElementById('bloxlinkId').textContent = data.bloxlink.primaryAccount;
        } else {
            document.getElementById('bloxlinkId').textContent = 'N/A';
        }
        return;
    })
}