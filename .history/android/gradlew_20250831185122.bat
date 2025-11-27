@echo off
@rem gradlew.bat

@rem Set local scope for the variables with windows NT shell
if "%OS%"=="Windows_NT" setlocal

set DIRNAME=%~dp0
if "%DIRNAME%"=="" set DIRNAME=.
@rem This is normally unused
set APP_BASE_NAME=%~n0
set APP_HOME=%DIRNAME%

@rem Resolve any "." and ".." in APP_HOME to make it shorter.
for %%i in ("%APP_HOME%") do set APP_HOME=%%~fi

@rem Prefer GRADLE_JAVA_HOME if provided (minimal change)
if defined GRADLE_JAVA_HOME set "JAVA_HOME=%GRADLE_JAVA_HOME%"

@rem Add default JVM options here. You can also use JAVA_OPTS and GRADLE_OPTS to pass JVM options to this script.
set DEFAULT_JVM_OPTS="-Xms256m" "-Xmx1024m" "-Dfile.encoding=UTF-8"

@rem Find java.exe
if defined JAVA_HOME goto findJavaFromJavaHome

set JAVA_EXE=java.exe
%JAVA_EXE% -version >NUL 2>&1
if %ERRORLEVEL% equ 0 goto perf

echo. 1>&2
echo ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH. 1>&2
echo. 1>&2
echo Please set the JAVA_HOME variable in your environment to match the 1>&2
echo location of your Java installation. 1>&2

goto fail

:findJavaFromJavaHome
set JAVA_HOME=%JAVA_HOME:"=%
set JAVA_EXE=%JAVA_HOME%/bin/java.exe

if exist "%JAVA_EXE%" goto perf

echo. 1>&2
echo ERROR: JAVA_HOME is set to an invalid directory: %JAVA_HOME% 1>&2
echo. 1>&2
echo Please set the JAVA_HOME variable in your environment to match the 1>&2
echo location of your Java installation. 1>&2

goto fail

:perf
@rem Only add perf flags if user did not already set them
set "_PERF_OPTS="

@rem workers = max(1, NUMBER_OF_PROCESSORS-1)
set /a _CORES=%NUMBER_OF_PROCESSORS%
if %_CORES% LSS 1 set /a _CORES=1
set /a _WORKERS=%_CORES%-1
if %_WORKERS% LSS 1 set /a _WORKERS=1

echo %GRADLE_OPTS% | findstr /I /C:"org.gradle.workers.max" >NUL || set "_PERF_OPTS=%_PERF_OPTS% -Dorg.gradle.workers.max=%_WORKERS%"
echo %GRADLE_OPTS% | findstr /I /C:"org.gradle.parallel=" >NUL    || set "_PERF_OPTS=%_PERF_OPTS% -Dorg.gradle.parallel=true"
echo %GRADLE_OPTS% | findstr /I /C:"org.gradle.caching=" >NUL     || set "_PERF_OPTS=%_PERF_OPTS% -Dorg.gradle.caching=true"
echo %GRADLE_OPTS% | findstr /I /C:"org.gradle.vfs.watch=" >NUL   || set "_PERF_OPTS=%_PERF_OPTS% -Dorg.gradle.vfs.watch=true"

if defined _PERF_OPTS (
  if defined GRADLE_OPTS (
    set "GRADLE_OPTS=%GRADLE_OPTS% %_PERF_OPTS%"
  ) else (
    set "GRADLE_OPTS=%_PERF_OPTS%"
  )
)

:execute
@rem Setup the command line

set CLASSPATH=%APP_HOME%\gradle\wrapper\gradle-wrapper.jar

@rem Execute Gradle
"%JAVA_EXE%" %DEFAULT_JVM_OPTS% %JAVA_OPTS% %GRADLE_OPTS% "-Dorg.gradle.appname=%APP_BASE_NAME%" -classpath "%CLASSPATH%" org.gradle.wrapper.GradleWrapperMain %*

:end
@rem End local scope for the variables with windows NT shell
if %ERRORLEVEL% equ 0 goto mainEnd

:fail
rem Set variable GRADLE_EXIT_CONSOLE if you need the _script_ return code instead of
rem the _cmd.exe /c_ return code!
set EXIT_CODE=%ERRORLEVEL%
if %EXIT_CODE% equ 0 set EXIT_CODE=1
if not ""=="%GRADLE_EXIT_CONSOLE%" exit %EXIT_CODE%
exit /b %EXIT_CODE%

:mainEnd
if "%OS%"=="Windows_NT" endlocal

:omega
