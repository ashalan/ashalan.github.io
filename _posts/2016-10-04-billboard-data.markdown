---
layout:     post
title:      "Billboard Data: Project 2"
subtitle:   "Analyzing the number 1 songs in the billboard top 100 for the year 2000"
date:       2016-10-04 20:49:00
author:     "Amer Shalan"
header-img: "img/billboard.png"
---

<p>We take a look at the billboard top 100 data from the year 2000.</p>
<br>
<p>What is the likelihood of a song hitting number 1?</p>
<p>Are different genres more likely to hit Number 1 than others?</p>
<p>Have all genres hit Number 1?</p>
<br>
<h2>Cleaning the data</h2>
<p>I started by cleaning the data. Many things were wrong with it, but it was only necessary to clean the parts I needed to look at the questions I wanted answered.</p>
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
<h2>Getting the data I need</h2>
<p>I only wanted the data of tracks that were in number one at some point during their appearance on the top 100.</p>
<p>I got the data of the weeks all the songs were on the charts and which spot they held.</p>
<p>I then extracted all the data that had the float 1. in it.</p>
<br>
<h2>Plotting the data</h2>
<p>Luckily we have the handy pandas library to help us visualize some data.</p>
<p>I started by plotting all the songs in a line chart. It was not very useful :(</p>
<img src='/img/all_songs.png'>
<p>I then decided to group all the songs by genre and check the percentage of songs that hit number one in that genre vs all the songs that got to the top 100 in that genre. Surprisingly, only 'Rock', 'Rock n Roll', 'Latin', and 'Country' made it to the number one spot in the year 2000.</p>
<img src='/img/genre_percent_bar.png'>
<p>This is a a little difficult to read. Why dont we put it into a stacked bar graph to see the weight of each genre and the songs in that genre hitting Number 1.</p>
<img src='/img/songs_by_genre_bar.png'>
<p>This is more like it. We can see the weight of the rock and roll genre. Of all songs that made it to the top 100, if that somg were a rock n roll song, it was much more likely to make it to number 1 than songs in any other genre</p>
<p>What else can we do? Why don't we look at the average of the rock and rock and roll genre performances by week and compare them. I chose to remove the 'latin' and 'country' genres from this graph because both genres only have 1 song that hit number 1 at some point.</p>
<img src='/img/avg_songs_by_genre.png'>
<p>Interesting! The bar chart of average performance of tracks that have hit number one by genre shows us a few things.
    <ul>
        <li> Rock tracks peak faster than rock n roll tracks.</li>
        <li> Rock n roll tracks stay on the charts for longer</li>
        <li> Rock tracks are more popular (meaning they average closer to number one than rock n roll)</li>
    </ul>
</p>
<p>Hope you enjoy my findings :)</p>