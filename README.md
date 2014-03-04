Relayed
=======

<img src="https://travis-ci.org/Wildhoney/Relayed.png?branch=master" alt="Travis CI" />
&nbsp;
<img src="https://badge.fury.io/js/relayed.png" alt="NPM Version" />

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
relayed -h npm.org -p 80
```

Open `localhost:8910` in your browser and npm.org will be returned. **Please** remember that Relayed is only for development.

Options
-------

 `-h <host>` &ndash; Hostname to relay to (required);
 `-p <port>` &ndash; Port number of the host (defaults to 80);
 `-s` &ndash; Use HTTPS for the transport protocol;
 `-o` &ndash; Open `localhost:8910` in your browser;