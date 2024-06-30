---
tags:
---

When you're running a nodejs application, you create one socket for the process, and you use that socket to serve both static files like js/png/mp3/css *as well as* run server-side code to render html.

But what if you want your application code to be written in a nodejs and your static files to be served by something more "efficient" (or simply batteries included) like apache, nginx, caddy (written in go) or tomcat (written in java)?

Well you'd either create 2 separate sockets or have to "somehow" share the same socket.

Now whether you *should* share the same socket between your static http server and your application server is a different matter. I don't know enough yet about sockets to make a learned decision about that.

But if you do choose to have 2 separate sockets, can they use the same port?

---
[Interesting article about how the SQL spec has grown 5-10x since SQL-92, what you can now do with SQL, how different DBMS implement that newer SQL and when (or if) they made the adoption](https://modern-sql.com/)

I actually never knew that SQL was a spec and that too released by the ISO. Pretty cool. SQL as a concept was around since the 70s and was formally recognized by the ISO in '92 and released as a standard called SQL-92.

Nice graphic (probably not exhaustive and also doesn't mention data types):
![SQL history graphic|500](https://learnsql.com/blog/history-of-sql-standards/history-of-sql-standards.png)