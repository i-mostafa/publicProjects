fh = fopen(getScriptPath("./t.txt"), 0); // Open the file for reading

if (fh != -1) {
    // If the file has been successfully opened

    length = flength(fh); // Get the length of the file

    str = fread(fh, length); // Read in the entire file

    fclose(fh); // Close the file

    // Display the contents of the file

    write(str);
}
