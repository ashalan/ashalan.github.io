---
layout:     post
title:      "Iowa Liquor Sales"
subtitle:   "Market research for feasible locations for liquor stores in Iowa."
date:       2016-10-12 19:16:00
author:     "Amer Shalan"
header-img: "img/wine-brew-header-2.jpg"
---

<p>We take a look at <a href="https://data.iowa.gov/Economy/Iowa-Liquor-Sales/m3tr-qhgy/data" target="_blank">liquor sales in Iowa</a>. We only took a 10% sample of the data as we found that to be a sufficient amount of data to look at (270955 rows).</p>
<br>
<p>Which cities sell the most liquor?</p>
<p>Are some cities better served than others?</p>
<p>Where is the most under served city that we can open up a liquor store and compete?</p>
<br>
<h2>Cleaning the data</h2>
<p>This was our table data headers:</p>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right">
      <th></th>
      <th>Date</th>
      <th>Store Number</th>
      <th>City</th>
      <th>Zip Code</th>
      <th>County</th>
      <th>Category</th>
      <th>Category Name</th>
      <th>Vendor Number</th>
      <th>Item Number</th>
      <th>Item Description</th>
      <th>Bottle Volume (ml)</th>
      <th>State Bottle Cost</th>
      <th>State Bottle Retail</th>
      <th>Bottles Sold</th>
      <th>Sale (Dollars)</th>
      <th>Volume Sold (Liters)</th>
      <th>Volume Sold (Gallons)</th>
    </tr>
  </thead>
</table>
<ul>
    <li>We filled in missing values in County Names as well as misspelled city names.</li>
    <li>We fixed spelling errors.</li>
    <li>There were some values in the County field that did not parse correctly.</li>
    <li>We set individual values to the correct County.</li>
    <li>We filled in missing values in Category Names.</li>
    <li>We dropped the County Number column.</li>
    <li>We converted the Date column to datetime object.</li>
    <li>We dropped the Category column.</li>
    <li>We removed $ and converted appropriate columns to floats.</li>
    <li>We constrained the dataframe to 2015</li>
    <li>We created total cost column.</li>
</ul>
<p>This was our new table:</p>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right">
      <th></th>
      <th>Store Number</th>
      <th>Vendor Number</th>
      <th>Item Number</th>
      <th>Bottle Volume (ml)</th>
      <th>State Bottle Cost</th>
      <th>State Bottle Retail</th>
      <th>Bottles Sold</th>
      <th>Sale (Dollars)</th>
      <th>Total_Cost</th>
      <th>Volume Sold (Liters)</th>
      <th>Volume Sold (Gallons)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>218594.000000</td>
      <td>218594.000000</td>
      <td>218594.000000</td>
      <td>218594.000000</td>
      <td>218594.000000</td>
      <td>218594.000000</td>
      <td>218594.000000</td>
      <td>218594.000000</td>
      <td>218594.000000</td>
      <td>218594.000000</td>
      <td>218594.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>3578.700216</td>
      <td>255.976783</td>
      <td>45947.926064</td>
      <td>925.621609</td>
      <td>9.771547</td>
      <td>14.675065</td>
      <td>9.950456</td>
      <td>130.503332</td>
      <td>86.860051</td>
      <td>9.087232</td>
      <td>2.400800</td>
    </tr>
    <tr>
      <th>std</th>
      <td>942.194733</td>
      <td>141.266301</td>
      <td>52563.817681</td>
      <td>492.014837</td>
      <td>7.021363</td>
      <td>10.531652</td>
      <td>24.449269</td>
      <td>386.612714</td>
      <td>256.816527</td>
      <td>29.360489</td>
      <td>7.756215</td>
    </tr>
    <tr>
      <th>min</th>
      <td>2106.000000</td>
      <td>10.000000</td>
      <td>173.000000</td>
      <td>50.000000</td>
      <td>0.890000</td>
      <td>1.340000</td>
      <td>1.000000</td>
      <td>1.340000</td>
      <td>0.890000</td>
      <td>0.100000</td>
      <td>0.030000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>2603.000000</td>
      <td>115.000000</td>
      <td>26828.000000</td>
      <td>750.000000</td>
      <td>5.510000</td>
      <td>8.270000</td>
      <td>2.000000</td>
      <td>30.720000</td>
      <td>20.430000</td>
      <td>1.600000</td>
      <td>0.420000</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>3715.000000</td>
      <td>260.000000</td>
      <td>38176.000000</td>
      <td>750.000000</td>
      <td>8.000000</td>
      <td>12.300000</td>
      <td>6.000000</td>
      <td>70.560000</td>
      <td>47.040000</td>
      <td>5.250000</td>
      <td>1.390000</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>4349.000000</td>
      <td>380.000000</td>
      <td>64573.000000</td>
      <td>1000.000000</td>
      <td>11.920000</td>
      <td>17.880000</td>
      <td>12.000000</td>
      <td>135.660000</td>
      <td>90.420000</td>
      <td>10.500000</td>
      <td>2.770000</td>
    </tr>
    <tr>
      <th>max</th>
      <td>9018.000000</td>
      <td>978.000000</td>
      <td>995507.000000</td>
      <td>6000.000000</td>
      <td>425.000000</td>
      <td>637.500000</td>
      <td>2508.000000</td>
      <td>36392.400000</td>
      <td>24261.600000</td>
      <td>2508.000000</td>
      <td>662.540000</td>
    </tr>
  </tbody>
</table>
<h2>Exploratory Data Analysis</h2>
<p>Exploratory Data Analysis is performed to analyze the data for skewness, as well as build predictors for the target variable.</p>
<p>Bottles Sold, Sale (Dollars) are skewed. Plotting Histograms show that we should to restrict to Bottles Sold per transaction to 25 and less. This will eliminate outliers.</p>
<img src='/img/post3/hist1.png'>
<p>Only considering bottles sold 25 and under, because the percentage of transactions where Bottles Sold were 25 and under is: 96.06%. While the data is still skewed for Bottles Sold and Sale (Dollars), one standard deviation from the mean will not result in negative Bottles Sold and Sale (Dollars).</p>
<h3>Unique Items per Store</h3>
<p>By creating unique items per store, we can use it as a proxy for store size, which will one of the predictors used in the regression. The histogram for unique per items shows that it is skewed.
<xmp>
The mean # of unique items per store is 97.4774052478
The max # of unique items per store is 739
The min # of unique items per store is 1
The median # of unique items per store is 52.0
</xmp>
<img src='/img/post3/hist2.png'>
Calculating the Number of Stores per City, which will be used for number of competitors as a predictor in the regression. From the histogram, the distribution is heavily skewed.</p>
<h3>Average Items per Store per City</h3>
<p>
    Calculating Average Items per Store per City and Sales per Store, which will be used later in merges. Histogram shows that there is a skewed distribution.
    <img src='/img/post3/hist3.png'>
    Starting from the df (original) dataframe, and merging with various dataframes created prior, a dataframe is created to build metrics to be used as predictors for the regression, which are the following:
    <ul>
        <li>Bottles Sold</li>
        <li>Items per Store</li>
        <li>Average Price</li>
        <li>Stores per City</li>
        <li>Population</li>
    </ul>
    These predictors will be created from the df dataframe as well as external sources. The code below is the process for constructing these predictors.
</p>
<h3>2015 Population by City</h3>
<p>From the distribution of the histogram, Population by City is heavily skewed.
    <img src='/img/post3/hist4.png'>
    Taking the log normalizes the City Population Values. Predictors will be transformed by taking the log in the regression.
</p>


