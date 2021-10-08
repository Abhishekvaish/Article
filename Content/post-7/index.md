---
path: "/date-filters-in-django-templates"
date: "2020-12-28T08:50:36.015Z"
title: "Date Filter in Django Templates"
author: "Abhishek Vaish"
tags: "python,django templates,date filter"
featuredImage: "./date.jpg"
---
#### Common date filter in Django Templates

| Format character	 | Description | Example output |
|:-:|:-|:-:|
|<hr>|<hr>|<hr>|
||**Day**||
|d|Day of the month, 2 digits with leading zeros.|01 to 31|
|j|Day of the month without leading zeros.|1 to 31|
|S|English ordinal suffix for day of the month, 2 characters.|st, nd, rd or th|
|<hr>|<hr>|<hr>|
||**Month**||
|m|Month, 2 digits with leading zeros.|01 to 12|
|n|Month without leading zeros.|1 to 12|
|b|Month, textual, 3 letters, lowercase.|jan|
|M|Month, textual, 3 letters.|Jan|
|F|Month, textual, long.|January|
|<hr>|<hr>|<hr>|
||**Year**||
|y|Year, 2 digits.|99|
|Y|Year, 4 digits.|1999|
|<hr>|<hr>|<hr>|
||**Week**||
|D|Day of the week, textual, 3 letters.|Fri|
|l|Day of the week, textual, long.|Friday|
|<hr>|<hr>|<hr>|
||**Hours**||
|G|Hour, 24-hour format without leading zeros.|0 to 23|
|H|Hour, 24-hour format.|00 to 23|
|g|Hour, 12-hour format without leading zeros.|1 to 12|
|h|Hour, 12-hour format.|01 to 12|
|a|a.m. or p.m.|a.m.|
|A|AM or PM.|AM|
|<hr>|<hr>|<hr>|
||**Minutes**||
|i|Minutes.|00 to 59|
|<hr>|<hr>|<hr>|
||**Seconds**||
|s|Seconds, 2 digits with leading zeros.|00 to 59|
|<hr>|<hr>|<hr>|

<br>

**Example**
```py
	{{date_string|date:'M d, Y'}} # which gives the same date format as in this website
```