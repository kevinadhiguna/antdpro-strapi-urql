# Ant Design Pro x Urql x Strapi

Ant Design Pro v5 boilerplate powered by Strapi GraphQL API and Urql GraphQL client 🌟

🚧 Currently under the development

## Environment Prepare

Install `node_modules`:

```bash
yarn
```

## Prepare Application Configuration

Copy `appConfig.dev.json` to create `appConfig.json` (based on [the Twelve-Factor App - Config](https://12factor.net/config)) :

```bash
cp src/appConfig.dev.json ~/antdpro-urql-strapi/src/appConfig.json
```

If the above command does not work, you can use File Manager to copy `appConfig.dev.json` manually or even just create `appConfig.json` inside the `/src` directory.

This allows you to separate application configuration on client-side based on the environment (development, staging, production, etc.)
- `appConfig.json`: Default.
- `appConfig.local.json`: Local overrides. This file is loaded for all environments except test.
- `appConfig.dev.json`, `appConfig.test,json`, `appConfig.prod.json` : Environment-specific settings.
- `appConfig.development.local`, `appConfig.test.local.json`, `appConfig.prod.local.json`: Local overrides of environment-specific settings.

Reference : [Create React App - Adding Custom Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/#what-other-env-files-can-be-used)

## Available Scripts

Here are some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Start project

```bash
yarn start
```

### Build project

```bash
yarn build
```

### Check code style

```bash
yarn lint
```

You can also use script to auto fix some lint error:

```bash
yarn lint:fix
```

### Test code

```bash
yarn test
```

[![Visits Badge](https://badges.pufler.dev/visits/kevinadhiguna/antdpro-urql-strapi)](https://github.com/kevinadhiguna)
