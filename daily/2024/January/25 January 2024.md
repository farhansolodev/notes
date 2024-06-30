---
tags:
---

This makes me want to learn Vim: [How to move cursor to specific word in current line in Vim - Stack Overflow](https://stackoverflow.com/questions/20662451/how-to-move-cursor-to-specific-word-in-current-line-in-vim). 

**Question:**
Let's say we're currently in this line of code:
```
readonly L|a|zy<ICountryRepository> countryRepo;
```
and the cursor is in the position of letter "a", as shown in the code between two "|" symbols.
Now I want to move my cursor to the letter `y` of the word `countryRepo`, how can I do that using the minimum key strokes?

**Answer:**
If you know that it's the 4th `y`, you can do
```
4fy
```
If you know it's the last `y` in the line, you can do
```
$Fy
```
If you don't know at which position it is, you can still do
```
fy;;;
```
---
