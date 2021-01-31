# README

This is the backend service of the Carousel App.
To use Carousel App, you should follow the instructions below:

## How to Install Carousel API:

### How to Run Docker Image:

- First of all, you should pull the repository from DockerHub.

  - ```sh
    docker pull 0xyg3n/cmpe451backend:v1.0
    ```

- Add the given config.js file into the desired directory.

- Then, run the Docker image via the commands below

  - ```sh
    docker run -v $(pwd)/config.js:/usr/backend/app/config.js -it 0xyg3n/cmpe451backend:v1.0 node server.js
    ```

- If you want to stop the Docker image, close the current terminal, then open a new terminal. Furthermore, find your Docker containers and stop the current container.

### How to Run Locally:

- First of all, you should pull the repository from GitHub.

  - ```sh
    git clone https://github.com/bounswe/bounswe2020group8.git
    ```

- Then, change directory into the repository, then change directory into backend.

  - ```sh
    cd bounswe2020group8 && cd backend
    ```

- Then, put your config.js file provided within the package in this directory.

- Furthermore, install all node packages via npm.

  - Firstly, install npm to your operating system.

    - Check this link: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

  - Then, install your packages.
    - ```sh
      npm install
      ```

- Finally, run your API with the command below.

  - ```sh
    node server.js
    ```

- Now, you can send request to your network address, localhost:8080
