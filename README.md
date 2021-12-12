Application for creating groups and chatitng in secure environment. Works on https and wss. 

To make it work you need to create your own self signed certificate and key + make a trusted root certificate on your machine (easiest to do using mkcert: https://github.com/FiloSottile/mkcert). Then follow instructions from ./main.sh
- to build all the containers: ```$ ./main.sh full build```
- to start all the containers: ```$ ./main.sh full up```
- to stop all the containers: ```$ ./main.sh clear all```


Login with three different roles - see seeds in init_db
