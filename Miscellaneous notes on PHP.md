About SAPI & CGI, directly from the [General Installation Considerations](https://www.php.net/manual/en/install.general.php):
>"You have two choices for the method of connecting PHP to the server. For many servers PHP has a direct module interface (also called SAPI). These servers include Apache, Microsoft Internet Information Server... 
>If PHP has no module support for your web server, you can always use it as a CGI or FastCGI processor. This means you set up your server to use the CGI executable of PHP to process all PHP file requests on the server."

More about SAPI from its [Wikipedia page](https://en.m.wikipedia.org/wiki/Server_application_programming_interface):
>"PHP has a direct module interface called SAPI for different web servers; in the case of PHP 5 and Apache 2.0 on Windows, it is provided in the form of a DLL file called php5apache2.dll, which is a module that, among other functions, *provides an interface between PHP and the web server, implemented in a form that the server understands. This form is what is known as a SAPI.*
>Different kinds of SAPIs exist for various web-server extensions. For example, in addition to those listed above, *other SAPIs for the PHP language include the Common Gateway Interface (CGI)* and command-line interface (CLI)."

From my Google Keep Notes:
> "Implementations of a SAPI tell the webserver how to pass data to and from an application. More specifically, it *describes how request information is passed in environment variables* (such as request type, remote IP address), how the request body is passed in via standard input, and how the response is passed out via standard output."
>
> It's possible to find the SAPI during runtime in PHP. You can use php_sapi_name() or the PHP_SAPI constant. Both return a lowercase string that describes the type of interface (the Server API, SAPI) that PHP is using. For example, executing the php binary from the command line will return the string "cli", whereas with Apache it may have several different values depending on the exact SAPI used:
>![[Miscellaneous notes on PHP-20240108143610409.webp|1376]]
>
>Although not exhaustive, the possible return values include  
> - aolserver  
> - apache  
> - apache2filter  
> - apache2handler (mod_php)  
> - cgi (until PHP 5.3)  
> - cgi-fcgi (php-cgi from shell)  
> - cli (php from shell)  
> - cli-server (provided by PHP's built-in web server)  
> - fpm-fcgi (FPM – PHP's FastCGI implementation, short for FastCGI Process Manager)  
> - isapi (Windows)  
> - nsapi (Netscape)  
> - caudium, continuity, embed, litespeed, milter, phpdbg, phttpd, pi3web, roxen, thttpd, tux, and webjames.

---

From [Manual PHP Installation on Windows](https://www.php.net/manual/en/install.windows.manual.php):
> "There are 4 types of PHP builds:
> 	- Thread-Safe(TS) - for single process web servers, like Apache with mod_php
> 	- Non-Thread-Safe(NTS) - for IIS and other FastCGI web servers (Apache with mod_fastcgi) and recommended for command-line scripts
> 	- x86 - for 32-bits systems.
> 	- x64 - for 64-bits systems."

There are actually only 2 types: TS & NTS, but each have x86 and x64 versions.

Article titled: [PHP isn't thread-safe yet](https://neosmart.net/blog/dont-believe-the-lies-php-isnt-thread-safe-yet/)

---

About separation of *web application* and *web server*, from [FastCGI - Wikipedia](https://en.wikipedia.org/wiki/FastCGI):
>"Web site administrators and programmers can find that separating web applications from the web server in FastCGI has many advantages over embedded interpreters ([mod_perl](https://en.wikipedia.org/wiki/Mod_perl "Mod perl"), [mod_php](https://en.wikipedia.org/wiki/Mod_php "Mod php"), etc). This separation allows server and application processes to be restarted independently – an important consideration for busy web sites. It also enables the implementation of per-application, hosting service security policies, which is an important requirement for ISPs and web hosting companies. Different types of incoming requests can be distributed to specific FastCGI servers which have been equipped to handle those types of requests efficiently."

So Apache literally has a PHP interpreter as a module...

It turns the whole thing on its head. Instead of a programming language having a library for being able to make http servers, you have a http server that has a programming language interpreter as a module.

---

From what I understand, both CGI & FastCGI were specifications...standards that web servers and web applications implemented for cross-compatibility with various web servers and applications (hence *"Common Gateway"*). To write a CGI script (or FastCGI script) was to write an executable program (yes, executable!) that would be called by a CGI/FCGI server that stood between your script (aka the application code) and the web server. That or your executable program implemented the "client" side of the CGI interface itself. Either way, there is a CGI interface (chai tea anyone?) between your application code and the web server, whether it is embedded into your program or not.

> It should then stand to reason that CGI servers must be invokable by Linux, so they must either be of the ELF format or have a shebang and the executable flag if they are a script.

I believe the "executable" aspect of your script is an important detail, because in [this](file:///C:/Users/farha/Documents/Dev%20Learning%20Resources/How%20CGI%20Scripting%20Works/index.html#:~:text=chmod%20755%20simplest.pl) tutorial, they recommend `chmod`-ing a perl script, which cannot by invoked by Linux without **telling** Linux that it can be invoked with perl (it has the shebang). Similarly, any ELF is automatically invokable by Linux and thus, programs written in languages like C, Rust & Golang can also be directly invoked by the CGI server.

More information regarding this on [What can PHP do?](https://www.php.net/manual/en/intro-whatcando.php):
> "You need three things to make \[server-side scripting] work: *the PHP parser (CGI or server module)*..."
> "PHP also has support for most of the web servers today...this includes *any web server that can utilize the FastCGI PHP binary*, like lighttpd and nginx. *PHP works as either a module, or as a CGI processor.*"

[PHP-FPM isn't supported on Windows](https://stackoverflow.com/questions/4539670/php-fpm-for-windows/10640722#10640722). People seem to use ModFastCGI (mod_fcgi) from Apache as the process manager [instead](https://stackoverflow.com/a/6737136).

Article that explains php-fpm and it's relationship with a web server and laravel: [DevOps with Laravel: CGI, FastCGI, php-fpm, nginx](https://martinjoo.dev/cgi-fastcgi-php-fpm-nginx-and-laravel)

---

About PHP extensions from that same page:
> "...many other interesting extensions exist, which are categorized both [alphabetically](https://www.php.net/manual/en/extensions.php) and by [category](https://www.php.net/manual/en/funcref.php). And there are additional [PECL extensions](https://www.php.net/manual/en/install.pecl.intro.php) that may or may not be documented within the PHP manual itself, like [» XDebug](http://xdebug.org/)."
> "Writing a database-enabled web page is incredibly simple using one of the *database specific extensions (e.g., for [mysql](https://www.php.net/manual/en/book.mysqli.php))*, or using an abstraction layer like [PDO](https://www.php.net/manual/en/book.pdo.php), or connect to any database supporting the Open Database Connection standard via the *[ODBC](https://www.php.net/manual/en/book.uodbc.php) extension.*"

On the difference between PHP libraries and extensions from [Stack Overflow](https://stackoverflow.com/questions/4960450/php-extension-vs-library-and-can-it-be-converted):
> "A PHP extension is a C or C++ program, wrapped around the Zend Engine, that provides PHP functions and classes within a PHP installation.
> A PHP library is a program coded in native PHP that may or may not use extensions to provide functions and classes within a PHP program."

---

Notable diagram:
![[Miscellaneous notes on PHP-20240109124921143.webp|250]]

Zend seems to be like V8...
![[Miscellaneous notes on PHP-20240109125046876.webp|250]]

Okay, so it's like i'm writing Nodejs, cool.

How a SAPI module interfaces with the PHP engine:
![[Miscellaneous notes on PHP-20240109130634442.webp|250]]

But do PHP implementations come with Zend? i.e: do **php.exe** and **mod_php** include the Zend engine, like **node.exe** contains the V8 engine?

---

Life of a PHP process (i guess):
![[Miscellaneous notes on PHP-20240109131323151.webp|250]]
![[Miscellaneous notes on PHP-20240109131343088.webp|250]]
![[Miscellaneous notes on PHP-20240109131554738.webp|250]]
![[Miscellaneous notes on PHP-20240109131417761.webp|250]]
![[Miscellaneous notes on PHP-20240109132158525.webp|250]]
![[Miscellaneous notes on PHP-20240109132225023.webp|250]]
![[Miscellaneous notes on PHP-20240109132244339.webp|250]]

---

[Great video](https://youtu.be/Qa_xVjTiOUw?si=6CyT3kFzluy8b7Hj) about not just PHP but engineering in general.

---

If the float is beyond the boundaries of int (usually `+/- 2.15e+9 = 2^31` on 32-bit platforms and `+/- 9.22e+18 = 2^63` on 64-bit platforms), the result is undefined

---

**Integer overflow on a 32-bit system**
If PHP encounters a number beyond the bounds of the int type, it will be interpreted as a float instead. Also, an operation which results in a number beyond the bounds of the int type will return a float instead.
```php
<?php
	$large_number = 2147483647;
	var_dump($large_number); // int(2147483647)
	$large_number = 2147483648;
	var_dump($large_number); // float(2147483648)     
	$million = 1000000;
	$large_number = 50000 * $million;
	var_dump($large_number); //float(50000000000)   
?>
```

---
Never cast an unknown fraction to int, as this can sometimes lead to unexpected results.
```php
<?php
	echo (int) ( (0.1+0.7) * 10 ); // echoes 7!   
?>
```

---
The behaviour of converting to int is undefined for types other than:
- float
- string
- null
- bool

Do _not_ rely on any observed behaviour, as it can change without notice.

> So *undefined behaviour* is a thing in PHP...

---

From [PHP: Autoloading Classes - Manual](https://www.php.net/manual/en/language.oop5.autoload.php):
[spl_autoload_register()](https://www.php.net/manual/en/function.spl-autoload-register.php) may be called multiple times in order to register multiple autoloaders. Throwing an exception from an autoload function, however, will interrupt that process and not allow further autoload functions to run. For that reason, **throwing exceptions from an autoload function is strongly discouraged.**

---
