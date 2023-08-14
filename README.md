1. To run the app in docker run `docker-compose build` and `docker-compose up`
2. Access the application at `http://localhost:3000/notes`.
3. For development with a Docker database image, run `docker-compose -f docker-compose.development.yml up` and `npm run start:dev`.
4. To seed random data, run `npm run seed`. Make sure the Docker database image is running in the background.
5. To run tests using a Docker database image, follow these steps: `docker-compose -f docker-compose.development.yml up` `npm run test:e2e`

If you encounter issues while running my Docker images, try using the following command to clean up. You can use a single command to prune all types of resources at once: `docker system prune -af`
