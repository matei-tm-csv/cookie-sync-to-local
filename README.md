# cookie-sync-to-local

# Quick sync a cookie value to localhost

Chrome extension for quick sync a cookie value from the current url to localhost

# Usage

## Edit popup.js

Before using it setup the tracked cookie name.  
In popup.js edit cookieName variable and change its value for the desired target.

```javascript
const cookieName =  "MyCustomCookie";
```

## Load to Chrome

Go to [chrome extensions](chrome://extensions/)
Load the extension using "Load unpacked"


## Filtering the source url

If you need to restrict the list of candidate urls place the filtered values in manifest.json. 
Edit the file and set the "host_permissions" property