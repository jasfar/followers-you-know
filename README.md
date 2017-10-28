# followers-you-know
Returns a ranked list of all Twitter accounts that have 'followers you know.'

![screenshot](/screenshot.jpg)

## To Use
Go to the [Twitter Application Manager](https://apps.twitter.com/) and create an app.

Create a config.js filled with your app credentials:
```
module.exports = {
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
};
```
Add your username and run the command:

```
USERNAME='' node index.js
```
