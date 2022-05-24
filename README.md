# e-shop_mern

Describe the issue
autoprefixer: Replace color-adjust to print-color-adjust. The color-adjust shorthand is currently deprecated.

resolution ---->

vineetdigit commented 19 days ago
This most certainly didn't work for me.

npm install autoprefixer@10.4.5 --save-exact

But following helped remove the warning.

In the package.json of the top level directory of the react app, add the following section after the dependencies: {..}

"overrides": {
"autoprefixer": "10.4.5"
}
delete package-lock.json #frontend folder one
\rm -rf node_modules
npm install
restart the react app
The warning is no more. For more information about "dependencies", see following

https://www.stefanjudis.com/today-i-learned/how-to-override-your-dependencys-dependencies/
