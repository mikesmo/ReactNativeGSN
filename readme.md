# Lightstreams React Native GSN Example

## Install

```
$ yarn install
$ cp .env.sample .env
```

In `.env` file, set the enviroment variables:

- `ACCOUNT` - Your account on the Sirius test network that has a positive balance
- `PASSPHRASE` - The password for the above account.

Deploy smart contracts

```
$ npm run deploy -- sirius
```

## Testing
```
$ npm test -- sirius
```

## Run
```
$ yarn start
```