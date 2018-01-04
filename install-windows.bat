@echo off
cd %~dp0
AT > NUL
IF %ERRORLEVEL% NEQ 0 (
    ECHO You need to run me as an administrator!
    pause
    EXIT
)
WHERE node
cls
if %ERRORLEVEL% NEQ 0 (
	echo Downloading NodeJS...
	powershell -Command "(New-Object Net.WebClient).DownloadFile('https://nodejs.org/dist/v6.11.5/node-v6.11.5-x64.msi', 'node-v6.11.5-x64.msi')"
	echo Installing NodeJS...
	start /wait msiexec /i "node-v6.11.5-x64.msi" /quiet /qn /norestart
	del "node-v6.11.5-x64.msi"
	start run.bat
)
