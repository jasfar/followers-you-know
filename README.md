# followers-you-know
Returns a list of Twitter accounts, sorted by the number of 'followers you know.'

## Usage
Go to the [Twitter Application Manager](https://apps.twitter.com/) and create an app.

Make a config.js file, with your app credentials filled in:

```
module.exports = {
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
};
```

Install all of the node_modules dependencies:

```
npm install
```

Run the following command, with your username filled in:

```
USERNAME='' node index.js
```
