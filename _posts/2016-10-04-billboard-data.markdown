---
layout:     post
title:      "Billboard Data: Project 2"
subtitle:   "Analyzing the number 1 songs in the billboard top 100 for the year 2000"
date:       2016-10-04 20:49:00
author:     "Amer Shalan"
header-img: "img/billboard.jpg"
---

<p>We take a look at the billboard top 100 data from the year 2000.</p>
<br>
<p>What is the likelihood of a song hitting number 1?</p>
<p>Are different genres more likely to hit Number 1 than others?</p>
<p>Have all genres hit Number 1?</p>
<br>
<h1>Cleaning the data</h1>
<p>I started by cleaning the data. Many things were wrong with it, but it was only necessary to clean the parts I needed to look at the questions I wanted answered.</p>
<br>
<p>The first thing wrong with our data was the null data. It was populated with '*' instead. Let's replace that with np.nan instead:</p>
<xmp>
def replace_nulls(value):
    if value == '*':
        return np.nan
    else:
        return value
df = df.applymap(replace_nulls)
</xmp>
<p>Next was the track length. It was parsed in as time of day rather than track length. An easy split and replace should fix that:</p>
<xmp>
# Change the time column into track length in seconds
def to_seconds(value):
    split = value.split(',')
    return int(split[0])*60 + int(split[1])
df['time'] = df['time'].map(to_seconds)
</xmp>
<p>Next was to drop any columns of data we had that was all nan values. We do not need that data.</p>
<xmp>
# Removes columns that are all NaN values
df.dropna(axis=1, how='all', inplace=True)
df
</xmp>
<p>Last we had to delete any meaningless spaces in certain data etc.</p>
<br>
<h1>Getting the data I need</h1>
<p>I only wanted the data of tracks that were in number one at some point during their appearance on the top 100.</p>
<p>I got the data of the weeks all the songs were on the charts and which spot they held.</p>
<p>I then removed all the </p>
<h1>Plotting the data</h1>
<p>Luckily we have the handy pandas library to help us visualize some data.</p>