Relayed
=======

<img src="https://badge.fury.io/js/relayed.png" />

Convenient Shell/Node script for circumventing CORS issues when developing on localhost.

Via npm: `npm install relayed -g`

May require `sudo` access.

Functionality
-------

When you're developing on `localhost`, you may not want to go through configuring CORS when making AJAX requests. Instead Relayed relays **all** requests to the foreign server via localhost.

* All parameters are passed along;
* Correct HTTP verbs are maintained;
* HTTPS/HTTP protocols supported;

Getting Started
-------

The recommended method is running it via the Shell script.

```
relayed.sh http://npm.org 80
```

Open `localhost:8910` in your browser and npm.org will be returned. **Please** remember that Relayed is only for development.