# followers-you-know
Returns a list of Twitter accounts, ranked by the number of 'followers you know.'

![screenshot](/screenshot.jpg)

## To Use
Go to the [Twitter Application Manager](https://apps.twitter.com/) and create an app.

Create a config.js file with your app credentials:

```
module.exports = {
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
};
```

Run the following command, with your username filled in:

```
USERNAME='' node index.js
```
