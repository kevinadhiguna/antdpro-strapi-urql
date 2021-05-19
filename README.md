<h1 align="center">Ant Design Pro x Strapi GraphQL x urql</h1>

<div align="center">

Ant Design Pro v5 boilerplate powered by Strapi GraphQL API and Urql GraphQL client 🌟

[![Build With Umi](https://img.shields.io/badge/build%20with-umi-028fe4.svg?style=flat-square)](http://umijs.org/) <br/>

<img alt="Ant Design Pro" src="https://img.shields.io/badge/Ant_Design_Pro-0170FE?style=for-the-badge&logo=ant-design&logoColor=white" /> <!-- <img alt="Ant Design" src="https://img.shields.io/badge/-Ant_Design-%230170FE?&style=for-the-badge&logo=ant-design&logoColor=white" /> --> <img alt="Strapi" src="https://img.shields.io/badge/strapi-2e7eea?style=for-the-badge&logo=strapi&logoColor=white" /> <img alt="GraphQL" src="https://img.shields.io/badge/GraphQl-E10098?style=for-the-badge&logo=graphql&logoColor=white" /> <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" /> <img alt="urql GraphQL client" src="https://img.shields.io/badge/-URQL-6C7CBC?style=for-the-badge&logo=urql" />

<!-- <img alt="Ant Design Pro - Strapi auth" src="https://s3.gifyu.com/images/ecf1535jw45n673m255.png" border="0" /> -->

</div>

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
