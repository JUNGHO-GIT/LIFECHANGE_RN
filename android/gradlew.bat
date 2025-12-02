@echo off
rem Optimized Gradle Wrapper Launcher (speed-tuned)

if "%OS%"=="Windows_NT" setlocal EnableExtensions

set "DIRNAME=%~dp0"
if "%DIRNAME%"=="" set "DIRNAME=."
for %%i in ("%DIRNAME%") do set "APP_HOME=%%~fi"
set "APP_BASE_NAME=%~n0"
set "CLASSPATH=%APP_HOME%\gradle\wrapper\gradle-wrapper.jar"

rem ---- JVM default heap and UTF-8 ----
set DEFAULT_JVM_OPTS="-Xms512m" "-Xmx2048m" "-XX:MaxMetaspaceSize=512m" "-Dfile.encoding=UTF-8" "-XX:+UseStringDeduplication" "-XX:+HeapDumpOnOutOfMemoryError"

rem ---- Prefer GRADLE_JAVA_HOME, then JAVA_HOME, then PATH ----
if defined GRADLE_JAVA_HOME (
  set "JAVA_HOME=%GRADLE_JAVA_HOME%"
)
if not defined JAVA_HOME goto tryPathJava
set "JAVA_EXE=%JAVA_HOME%\bin\java.exe"
if exist "%JAVA_EXE%" goto perfSetup

:tryPathJava
set "JAVA_EXE=java.exe"
"%JAVA_EXE%" -version >NUL 2>&1
if %ERRORLEVEL% EQU 0 goto perfSetup

echo. 1>&2
echo ERROR: No Java found. Set GRADLE_JAVA_HOME or JAVA_HOME correctly. 1>&2
echo. 1>&2
goto fail

:perfSetup
rem ---- Performance tuning (disable with set GRADLE_TUNING=off) ----
if /I "%GRADLE_TUNING%"=="off" goto execute

set /a _CORES=%NUMBER_OF_PROCESSORS%
if %_CORES% LSS 1 set /a _CORES=1
set /a _WORKERS=%_CORES%-1
if %_WORKERS% LSS 1 set /a _WORKERS=1

set "PERF_OPTS=-Dorg.gradle.parallel=true -Dorg.gradle.caching=true -Dorg.gradle.vfs.watch=true -Dorg.gradle.configuration-cache=true -Dorg.gradle.configuration-cache.problems=warn -Dorg.gradle.workers.max=%_WORKERS% -Dkotlin.incremental=true"
if defined GRADLE_OPTS (
  set "GRADLE_OPTS=%GRADLE_OPTS% %PERF_OPTS%"
) else (
  set "GRADLE_OPTS=%PERF_OPTS%"
)

:execute
"%JAVA_EXE%" %DEFAULT_JVM_OPTS% %JAVA_OPTS% %GRADLE_OPTS% "-Dorg.gradle.appname=%APP_BASE_NAME%" -classpath "%CLASSPATH%" org.gradle.wrapper.GradleWrapperMain %*
set "_EXITCODE=%ERRORLEVEL%"

if "%OS%"=="Windows_NT" endlocal & set "EXIT_CODE=%_EXITCODE%"
if not defined EXIT_CODE set EXIT_CODE=0
if %EXIT_CODE% EQU 0 goto mainEnd

:fail
set EXIT_CODE=%EXIT_CODE%
if %EXIT_CODE% EQU 0 set EXIT_CODE=1
if not "%GRADLE_EXIT_CONSOLE%"=="" exit %EXIT_CODE%
exit /b %EXIT_CODE%

:mainEnd
