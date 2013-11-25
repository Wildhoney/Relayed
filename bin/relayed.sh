#!/bin/bash
# Relayed

RCol='\x1b[0m'    # Text Reset

# Regular           Bold                Underline           High Intensity      BoldHigh Intens     Background          High Intensity Backgrounds
Bla='\x1b[0;30m';     BBla='\x1b[1;30m';    UBla='\x1b[4;30m';    IBla='\x1b[0;90m';    BIBla='\x1b[1;90m';   On_Bla='\x1b[40m';    On_IBla='\x1b[0;100m';
Red='\x1b[0;31m';     BRed='\x1b[1;31m';    URed='\x1b[4;31m';    IRed='\x1b[0;91m';    BIRed='\x1b[1;91m';   On_Red='\x1b[41m';    On_IRed='\x1b[0;101m';
Gre='\x1b[0;32m';     BGre='\x1b[1;32m';    UGre='\x1b[4;32m';    IGre='\x1b[0;92m';    BIGre='\x1b[1;92m';   On_Gre='\x1b[42m';    On_IGre='\x1b[0;102m';
Yel='\x1b[0;33m';     BYel='\x1b[1;33m';    UYel='\x1b[4;33m';    IYel='\x1b[0;93m';    BIYel='\x1b[1;93m';   On_Yel='\x1b[43m';    On_IYel='\x1b[0;103m';
Blu='\x1b[0;34m';     BBlu='\x1b[1;34m';    UBlu='\x1b[4;34m';    IBlu='\x1b[0;94m';    BIBlu='\x1b[1;94m';   On_Blu='\x1b[44m';    On_IBlu='\x1b[0;104m';
Pur='\x1b[0;35m';     BPur='\x1b[1;35m';    UPur='\x1b[4;35m';    IPur='\x1b[0;95m';    BIPur='\x1b[1;95m';   On_Pur='\x1b[45m';    On_IPur='\x1b[0;105m';
Cya='\x1b[0;36m';     BCya='\x1b[1;36m';    UCya='\x1b[4;36m';    ICya='\x1b[0;96m';    BICya='\x1b[1;96m';   On_Cya='\x1b[46m';    On_ICya='\x1b[0;106m';
Whi='\x1b[0;37m';     BWhi='\x1b[1;37m';    UWhi='\x1b[4;37m';    IWhi='\x1b[0;97m';    BIWhi='\x1b[1;97m';   On_Whi='\x1b[47m';    On_IWhi='\x1b[0;107m';

function begin {
    relayed-node $1 $2
}

function help {
    echo ""
    echo -e "${Bla}${On_Cya} Relayed ${RCol} - Convenient Shell/Node script for circumventing CORS issues when developing on localhost."
    echo ""
    echo -e "    ${IBla}${On_Whi} + ${RCol} http://www.yahoo.com/          - Begin relaying to http://www.yahoo.com:80/"
    echo -e "    ${IBla}${On_Whi} + ${RCol} http://www.yahoo.com/ 8080     - Begin relaying to http://www.yahoo.com:8080/"
    echo ""
}

HOST=$1

if [[ -z "$HOST" ]]; then
    help
    exit 2;
fi

if [ $2 ]; then
    PORT=$2;
else
    PORT=80;
fi

echo ""
echo -e "${Bla}${On_Cya} Relayed ${RCol} - Convenient Shell/Node script for circumventing CORS issues when developing on localhost."
echo ""
echo -e "${Bla}${On_Gre} Listening to \"${HOST}:${PORT}\" on port 8910... ${RCol}"
echo ""

begin $HOST $PORT