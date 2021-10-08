---
path: "/tables-in-markdown"
date: "2020-12-28T09:33:22.407Z"
title: "Tables in markdown"
author: "Abhishek Vaish"
tags: "markdown,tables,github"
featuredImage: "./table.png"
---


### Introduction
Markdown is a great tool for documentation on Github because documentation is only as useful as it is readable. Among other things, Github's flavor of markdown allows for the creation of tables to display data in rows and columns.

### The Basics
A table in markdown consists of two parts.
The header
The rows of data in the table
Individual columns in a table are separated by a pipe character: |.
Rows in the table are separated by line breaks.
HTML tags can be used for additional formatting inside individual cells.
The Header
The header of a markdown table consists of two rows. The first row is the column headers for the table. To specify the headers, simply separate each header with spaces and pipes. Make sure to include a pipe at the beginning and end of the line as well.

```
	| Header Column One | Header Column Two | Header Column Three | Header Column Four |
```

The second row is just metadata for the table that determines how the text will be vertically aligned. Each column can be aligned left, right, or center. The alignment is set by using a pattern of dashes and a colon separated by spaces and pipes.

To left-align a column, put a colon to the left of two dashes :--.
Three dashes --- can also be used.
To right-align, put a colon to the right of two dashes --:.
To center-align, surround a dash with two colons :-:.
Surround any of the above with pipes to create the second row of the header.

```
	 | Default Header | Left Align | Right Align | Center Align |
	 | --- | :-- | --: | :-: |
```
For better readability of the raw markdown, the number of dashes can be increased.

```
	 | Default Header | Left Align | Right Align | Center Align |
	 | -------------- | :--------- | ----------: | :----------: |
```
Spaces can also be used.

```
	| Default Header | Left Align | Right Align | Center Align |
	| ---            | :--        |         --: |      :-:     |
```
The number of spaces or dashes is not important as long as there are at least three dashes or colons.

### The Body
The body of the table consists of any number of rows separated by line breaks. Like the header, every cell is separated by a pipe character |. Putting this together with a header creates a full table 


```
	| Column 1 Header | Column 2 Header | Column 3 Header |
	| --------------- | --------------- | --------------- |
	| Row 1 Column 1 | Row 1 Column 2 | Row 1 Column 3 |
	| Row 2 Column 1 | Row 2 Column 2 | Row 2 Column 3 |
	| Row 3 Column 1 | Row 3 Column 2 | Row 3 Column 3 |
```

When rendered, it will look something like this:

| Column 1 Header | Column 2 Header | Column 3 Header |
| --------------- | --------------- | --------------- |
| Row 1 Column 1 | Row 1 Column 2 | Row 1 Column 3 |
| Row 2 Column 1 | Row 2 Column 2 | Row 2 Column 3 |
| Row 3 Column 1 | Row 3 Column 2 | Row 3 Column 3 |

**Whitespace**

Whitespace before and after the text in a cell does not matter. It will be added or truncated automatically to create columns.

The following tables will both render identically. The only thing to consider here is the readability of the raw markdown file.

```
	| Header 1  | Another header here | This is a long header |
	| --------  | ------------------- | --------------------- |
	| Some data | Some more data      | data                  | 
	| data      | Some long data here | more data             | 
```

```
	| Header 1  | Another header here | This is a long header |
	| --- | --- | --- |
	| Some data | Some more data | data | 
	| data | Some long data here | more data | 
```


**Empty Cells**

The header is the source of truth for the number of columns in the table. If a row in the body contains fewer cells than the header, it will be rendered with empty cells at the end.

Here the first row of the body will be populated with 2 empty cells at the end
```
	| Header 1  | Header 2 | Header 3 |
	| --- | --- | --- |
	| Some data | 
	| data | Some long data here | more data | 
```
If a row in the body contains more cells than the header, the extra cells will be ignored

Here the first row of the body will have 2 cells trimmed from the end.
```
	| Header 1  | Header 2            | Header 3  |
	| --------- | ------------------- | --------- |
	| Some data | Cell 2              | Cell 3    | Ignored | Ignored |
	| data      | Some long data here | more data | 
```

To add an empty cell in the middle of a row, just leave it empty.

Here the second cell of the first row will be empty.

```
	| Header 1  | Header 2            | Header 3  |
	| --------- | ------------------- | --------- |
	| Some data |                     | Cell 3    |
	| data      | Some long data here | more data | 
```
This can be done by using whitespace, as above, or without it, as below. They will render identically.

```
	| Header 1 | Header 2 | Header 3 |
	| --- | --- | --------- |
	| Some data | | Cell 3 |
	| data | Some long data here | more data | 

```

**Special Characters and Formatting**

Within table cells, most markdown formatting syntax—italics, bold, URLs, inline code blocks—can still be used. A literal pipe character can be used by escaping the pipe with a slash as seen below:

```
	| This is a single cell containing a \| character |
```
More advanced formatting can be done using HTML tags. Which tags are supported is beyond the scope of this guide, but I will say that the one I use commonly is <br /> to force cells to span multiple lines.

```
	| Header 1  | Header 2 |
	| --------  | -------- |
	| data      | Some long data that <br /> spans multiple lines |
```


```
	Note: Markdown tables will automatically wrap for cells that contain a lot of text. 
	<br /> is only necessary when you need to force a line break in a specific place.
```
