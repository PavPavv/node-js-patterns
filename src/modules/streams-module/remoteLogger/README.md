# A remote logger program

It is a small program that starts a child process and redirects output and standard error to a remote server, which, in turn, saves the two streams into two separate files. In this case, the shared medium is a TCP connection, while the two channels to be multiplexed are the _stdout_ and _stderr_ of a child process.
