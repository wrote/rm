// removes a directory
test/temp/dir

/**/

// removes a file
test/temp/dir/1.txt

/**/

// throws an error when file does not exist
test/temp/dir/does-not-exist.txt

/* error */
ENOENT: no such file or directory, lstat 'test/temp/dir/does-not-exist.txt'
/**/