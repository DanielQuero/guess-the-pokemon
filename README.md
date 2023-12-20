# Guess the pokemon

Porject created to try tailwind and use my hexagonal architecture aproach in a front-end project, built with Vue 3, Vite, and TypeScript. Enhanced with Pug and Sass for cleaner code and sleek design. It's a quiz to figure out a pokemon from its shadow, just like when we younger and it appeared on TV.


## Demo

You can see the [DEMO here](https://danielquero.github.io/guess-the-pokemon)


## Folder Structure

The application follows an organized folder structure as follows:

- **`public/`**: Public folder containing publicly accessible static files, such as images, icons, and CSS files.

- **`src/`**: Main source code folder of the application.

  - **`application/`**: Contains the application logic, including internationalization (`i18n`), alert management (`alertmanager`), data storage (`stores`), and types or symbols for dependency injection (`types`).

  - **`domain/`**: Includes the application's domain layer, which contains core business logic. This includes interfaces (`http` and `repositories`), data models (`models`), and use cases (`usecases`).

  - **`infrastructure/`**: Contains the application's infrastructure, including HTTP communication (`http`), simulations (`mocks`), and data repositories where API calls are made (`repositories`).

  - **`ui/`**: Contains the application's user interface (`UI`), including the application structure (`app`), graphic resources (`assets`), reusable components (`components`), navigation routes (`routes`), and application views (`views`).

  - **`diContainer.ts`**: A specific file used to manage functionality related to dependency injection and inversion of control (IoC).

  - **`main.ts`**: The main entry point of the application, where the Vue application is initialized.


## Project Setup
Install dependencies:
```sh
yarn
```

### Compile and Hot-Reload for Development
```sh
yarn dev
```

### Compile and Minify for Production

```sh
yarn build
```
