0</* ::

@echo off
set /p pass="Enter a Password: "
node "%~f0" %pass%
pause
exit /b %errorlevel%

*/0;

(async () => {
    const pass = process.argv[2]
    const arrayBuffer = await crypto.subtle.digest("SHA-512", new TextEncoder().encode(pass))
    console.log("Your Hashed Password: " + Buffer.from(arrayBuffer).toString("base64"))
})()
