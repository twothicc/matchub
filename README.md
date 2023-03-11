## Setup Instructions

Be sure to follow the setup options for the backend server at https://github.com/twothicc/matchub_be first

Install node version v16.13.2 and npm version 8.1.2
You can do so using nvm:

1. `sudo apt update`
2. `sudo apt install curl`
3. `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash`
4. `nvm -v` to check that nvm is installed. If you get `nvm: command not found`, then run `source ~/.bashrc` or simply close the current terminal and open a new one.
5. `nvm install v16.13.2`. This should install both nodejs and npm.
6. run `nvm ls` to check that node version `v16.13.2` is installed and that you are using it. If not using `v16.13.2`, then run `nvm use v16.13.2`.
7. run `npm -v`. If not the correct version, you can run `npm install npm@8.1.2 -g` to install it.

Setup the project.

1. Run `git clone https://github.com/twothicc/matchub.git`
2. `cd matchub`
3. In this directory, run `npm install`
4. Run `npm build`
5. Run `npm install -g server`
6. Run `serve -s build -p 3001`
