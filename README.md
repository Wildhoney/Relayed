Relayed
=======

Convenient Shell/Node script for circumventing CORS issues when developing on localhost.

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
./rly.sh npm.org 80
```

Open `localhost:8910` in your browser and npm.org will be returned. If you want to go further then add `./rly.sh` to your `$PATH` &ndash; but **please** remember that Relayed is only for development.