const Scripts = [
    {
        name: "bloodhound-python",
        script: `#!/bin/bash
if [["$1" == "-h"]] || [["$1" == "--help"]]; then
    echo "Usage: $0 <domain> <username> <password> <ip>"
    exit
fi

if [[ "$#" -ne 4 ]]; then 
    echo "Incorrect number of arguments"
    echo "Usage: $0 <domain> <username> <password> <domain> <ip>"
    exit
fi

DOMAIN=$1
USERNAME=$2
PASSWORD=$3
IP=$4

bloodhound-python -d $DOMAIN -u $USERNAME -p $PASSWORD -gc $DOMAIN -c ALL -ns $IP`,
        dependencies: [{name: "bloodhound-python", url: "https://github.com/dirkjanm/BloodHound.py"}],
        usage: "./bloodHound.sh <domain> <username> <password> <ip>",
        description: "This script will run bloodhound-python to enumerate information about the domain, users, and systems.",
        tags: ["shell script","bloodhound-python", "enumeration", "python"],
    },
    {
        name: "VHost fuzzing",
        script: `#!/bin/bash

if [["$1" == "-h"]] || [["$1" == "--help"]]; then
    echo "Usage: $0 <target> <wordlist> <url> <fs filter>"
    exit
fi

if [[ "$#" -ne 4 ]]; then 
    echo "Incorrect number of arguments"
    echo "Usage: $0 <target> <wordlist> <url> <fs filter>"
    exit
fi

DOMAIN=$1
WORDLIST=$2
URL=$3
FS_FILTER=$4

ffuf -H "Host: FUZZ.$DOMAIN" -H "User-Agent: PENTEST" -u "$URL" -c -w "$WORDLIST" -fs "$FS_FILTER"`,
        dependencies: [{name:"ffuf",url:"https://github.com/ffuf/ffuf"}],
        usage: "./vhFuzz.sh <target> <wordlist> <url> <fs filter>",
        description: "This script will run ffuf to perform virtual host fuzzing.",
        tags: ["shell script","ffuf", "fuzzing", "vhost fuzzing"],
    },
    {
        name: "IpFind",
        script: `#!/bin/bash

if [["$1" == "-h"]] || [["$1" == "--help"]]; then
    echo "Usage: $0 <target>"
    echo "ex: $0 192.168.1"
    exit
fi

if [["$1" == ""]]; then
    echo "No target specified"
    echo "Usage: $0 <target>"
    echo "ex: $0 192.168.1"
else
    for ip in \`seq 1 255\`; do
        ping -c 1 $1.$ip | grep "64 bytes" | cut -d " " -f 4 | tr -d ":" &
    done
fi
`,
        dependencies: [],
        usage: "./ipFind.sh <target>",
        description: "This script will find all the ip addresses in a network.",
        tags: ["shell script","ip find", "network", "ping"],
    }
];


export {Scripts};

// copyright 2024 by Aguru Darshan
//Attribution to:
// tools:
// https://github.com/dirkjanm/BloodHound.py
// https://github.com/ffuf/ffuf
// scripts:
// https://github.com/TeneBrae93/offensivesecurity 
// All rights are reserved by the respective owners of the above mentioned scripts, libraries, packages or tools.