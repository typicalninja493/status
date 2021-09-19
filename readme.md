# Monitor 

> This project was made for a private project, but you can use it

**Only important files/folders are:**

> `monitor.js`, `config.js`, `/public`, `/views`, `tailwind.config.js` (ofc pkg.json and -lock files are needed)


**you can leave out status.js if you already have a site made with express and want to add this as a route there, (this would require additional work to implement, not hard tho)**


## Or

**You can use this as a standalone server (not recommended)**

> keep the status.js file and run it (need node v14+), make sure to install all deps (npm i)

# Config

**here is a quick overview of the config**

**port** :- if running the server itself, then on what port to start the express server on, defaults to 4000

**degradedPerformanceInMs** - Time in ms to consider a site DEGRADED (time take for the response < degradedPerformanceInMs)

**links** :- Array of Objects, each object containing fields: 

                   url :- (needed) url of the webserver to visit
				   siteName :- The name of the site, to appear in the status page
				   errorHttpCodes :- additional https codes to consider if a status code returned is a error
				   okHttpCodes :- opposite of errorHttpCodes, additional https codes to consider if a status code is a success
