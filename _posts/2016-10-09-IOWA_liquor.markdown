---
layout:     post
title:      "Iowa Liquor Sales"
subtitle:   "Market research for feasible locations for liquor stores in Iowa."
date:       2016-10-12 19:16:00
author:     "Amer Shalan"
header-img: "img/wine-brew-header-2.jpg"
---

<p>We take a look at <a href="https://data.iowa.gov/Economy/Iowa-Liquor-Sales/m3tr-qhgy/data" target="_blank">liquor sales in Iowa</a>. We only took a 10% sample of the data as we found that to be a sufficient amount of data to look at (270,955 rows).</p>
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
<br>
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
    <img src='/img/post3/hist5.png'>
</p>
<h3>Categorizing the types of Liquor in the Data</h3>
<p>
   By Categorizing the store name by whether it is a Liquor, Grocery, or Other, we can analyze the type of stores for the top 10 markets.
   <xmp>
        liquor = ['liquor','spirits','wine','beverage','bottle','vineyard',
            'beer','cellar','holler','distribution','central city','distributing']
        grocery = ['hy-vee','fareway','target','wal-mart','food','supermarket',
            "dahl's","sam's club",'econ-o-mart','super valu','shop n save',
            'grocery','pantry','costco','price chopper','save a lot']
   </xmp> 
</p>
<h3>Final Additions:</h3>
<p>
    Bringing in County-level Per Capita Yearly Income, to be used as a predictor for the regression. This distribution is still skewed, but less than other predictors.
    <img src='/img/post3/hist6.png'>
</p>
<h2>Regression Analysis</h2>
<p>
The dataframe will be constructed to get the target (df_y) and the data for the predictors (df_X), which will then be split into train and test sets. The target variable is Bottles Sold. The predictors that will be used are the following:
<strong>Target Variable:</strong> Yearly Bottles Sold (per each Store)
<strong>Predictors:</strong>
<ul>
    <li>Items per Store</li>
    <li>Average Price</li>
    <li>Stores per City</li>
    <li>Population</li>
    <li>Per Capita Yearly Income</li>
</ul>
<strong>Assumptions and Constraints:</strong>
<ul>
    <li>Constraining the data to bottles sold per transaction to 25 and under</li>
    <li>Each store in a city is competing against each other</li>
    <li>Log-normalization due to the skewness of the target and predictors</li>
    <li>Per Capital Yearly Income, which is for county, is uniform across cities in the county</li>
</ul>
Linear Regression will be peformed on the training set, which will then be used to predict Bottles Sold. Before the regression is performed. Both the target and the predictors will be log-normalized because of the skewness, as shown in the histograms earlier.
</p>
<p>
    Our regression showed the following:
    <xmp>
        Linear Regression r^2 between Actual y and Predicted y_hat : 0.882584769609
        MSE for Training Set: 0.168641786382
        ------------------------------------------------
        The Predictors are: Unique_Items, Stores_per_City, AvgPrice, Population, Per Capita Yearly Income
        Linear Regression Coefficients are: [ 0.98676455 -0.0318437  -0.22004791  0.06181346  0.18398528]
        A 1% change in Unique_Items results in 0.99% change in Bottles Sold
        A 1% change in Stores_per_City is: -0.03% change in Bottles Sold
        A 1% change in AvgPrice is: -0.22% change in Bottles Sold
        A 1% change in Population is: 0.06% change in Bottles Sold
        A 1% change in Per Capita Yearly Income is: 0.18% change in Bottles Sold
        ------------------------------------------------
        Test Training Set:
        The r^2 on the test data is: 0.870719728037
        MSE for Test Set: 0.195375724591
</xmp>
    <img src='/img/post3/regs1.png'>
    <img src='/img/post3/regs2.png'>
    <img src='/img/post3/regs3.png'>
</p>
<h2>Analysis of the Results</h2>
<p>The correlation on the training dataset is 0.88. The coefficients for the regression show the strongest predictor is Unique Items (positively correlated), followed by Average Price (negatively correlated), Stores per City/Number of competition (negatively correlated), and Population and Per Capital Yearly Income (both positively correlated). These relationships are what we expect to see: the number of items in a store would show that more available products to purchase, and as the number of competitors in the city as well as price should decrease the bottles sold. Population and Income should be positively correlated as the more people are in a city, the higher demand should be, and the more disposable income a person has, the more the person is able to spend on liquor. If the assumption of the Yearly per Capita Income is uniformly distributed across all cities in the county does not hold, then there would be a stronger bias, which requires city level Yearly per Capital Income.</p>
<p>What happens if another store enters the market? Assuming Quantity (Bottles Sold per City) and Avg Price does not change (also means Total Sales (Dollars) per city does not change), if we increased number of stores per city by 1, we can calculate the new AvgSales with entry of a new store. Sorting from highest to lowest, we will find top 10 cities as consideration for markets to expand.</p>
<p>Once we know which markets to enter, we can find the average number of items among the competitors,types of competitors, and also the items and prices to which we place in the store.</p>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right">
      <th></th>
      <th>City</th>
      <th>Total Sales (Dollars)</th>
      <th>Number of Stores</th>
      <th>Number of Stores + 1</th>
      <th>AvgSales</th>
      <th>AvgSales_w_entry</th>
      <th>Delta Sales%</th>
      <th>Population</th>
      <th>Liquor</th>
      <th>Grocery</th>
      <th>Other</th>
      <th>Average_items_store</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>MT VERNON</td>
      <td>130172.81</td>
      <td>3.0</td>
      <td>4.0</td>
      <td>43390.936667</td>
      <td>32543.202500</td>
      <td>-0.250000</td>
      <td>4486</td>
      <td>1</td>
      <td>0</td>
      <td>2</td>
      <td>178.666667</td>
    </tr>
    <tr>
      <th>1</th>
      <td>WINDSOR HEIGHTS</td>
      <td>198687.11</td>
      <td>6.0</td>
      <td>7.0</td>
      <td>33114.518333</td>
      <td>28383.872857</td>
      <td>-0.142857</td>
      <td>4889</td>
      <td>1</td>
      <td>2</td>
      <td>3</td>
      <td>199.000000</td>
    </tr>
    <tr>
      <th>2</th>
      <td>MILFORD</td>
      <td>84245.46</td>
      <td>2.0</td>
      <td>3.0</td>
      <td>42122.730000</td>
      <td>28081.820000</td>
      <td>-0.333333</td>
      <td>3018</td>
      <td>0</td>
      <td>2</td>
      <td>0</td>
      <td>241.000000</td>
    </tr>
    <tr>
      <th>3</th>
      <td>BETTENDORF</td>
      <td>343749.94</td>
      <td>12.0</td>
      <td>13.0</td>
      <td>28645.828333</td>
      <td>26442.303077</td>
      <td>-0.076923</td>
      <td>35505</td>
      <td>2</td>
      <td>2</td>
      <td>8</td>
      <td>132.416667</td>
    </tr>
    <tr>
      <th>4</th>
      <td>IOWA CITY</td>
      <td>670082.63</td>
      <td>26.0</td>
      <td>27.0</td>
      <td>25772.408846</td>
      <td>24817.875185</td>
      <td>-0.037037</td>
      <td>74220</td>
      <td>3</td>
      <td>7</td>
      <td>16</td>
      <td>151.615385</td>
    </tr>
    <tr>
      <th>5</th>
      <td>MASON CITY</td>
      <td>314249.36</td>
      <td>13.0</td>
      <td>14.0</td>
      <td>24173.027692</td>
      <td>22446.382857</td>
      <td>-0.071429</td>
      <td>27366</td>
      <td>3</td>
      <td>5</td>
      <td>5</td>
      <td>155.692308</td>
    </tr>
    <tr>
      <th>6</th>
      <td>CLINTON</td>
      <td>245612.03</td>
      <td>10.0</td>
      <td>11.0</td>
      <td>24561.203000</td>
      <td>22328.366364</td>
      <td>-0.090909</td>
      <td>26064</td>
      <td>0</td>
      <td>5</td>
      <td>5</td>
      <td>136.200000</td>
    </tr>
    <tr>
      <th>7</th>
      <td>SPIRIT LAKE</td>
      <td>155668.34</td>
      <td>6.0</td>
      <td>7.0</td>
      <td>25944.723333</td>
      <td>22238.334286</td>
      <td>-0.142857</td>
      <td>5018</td>
      <td>1</td>
      <td>0</td>
      <td>5</td>
      <td>147.500000</td>
    </tr>
    <tr>
      <th>8</th>
      <td>CEDAR FALLS</td>
      <td>399731.96</td>
      <td>17.0</td>
      <td>18.0</td>
      <td>23513.644706</td>
      <td>22207.331111</td>
      <td>-0.055556</td>
      <td>41255</td>
      <td>2</td>
      <td>4</td>
      <td>11</td>
      <td>163.882353</td>
    </tr>
    <tr>
      <th>9</th>
      <td>CORALVILLE</td>
      <td>308774.21</td>
      <td>13.0</td>
      <td>14.0</td>
      <td>23751.862308</td>
      <td>22055.300714</td>
      <td>-0.071429</td>
      <td>20608</td>
      <td>0</td>
      <td>7</td>
      <td>6</td>
      <td>137.384615</td>
    </tr>
  </tbody>
</table>
<span>* The store type has been incorporated to show the types of stores in a given city</span>
<xmp>Mean of Average Items/Store in the Top 10 Cities is: 164.0</xmp>
<img src='/img/post3/hist7.png'>
<p>
The cities above are either subarbs (Windsor Heights, Bettendorf, Coralville), college towns (Mt. Vernon, Iowa CityCedar Falls, or near a resort/lake (Spirit Lake, Milford, Mason City). Categorizing the Category Name to bins of liquor types, we can find the ideal mix of inventory using the average items per store, which was calculated above (164 items per store)
Evaluating the Predicted Sales (Predicted Bottles * Avg Price), we can re-run the same process to evaluate top 10 cities for Predicted Sales. Below, there are 7 Cities that are in the list above:
<ul>
    <li>Windsor Heights</li>
    <li>Cedar Falls</li>
    <li>Milford</li>
    <li>Iowa City</li>
    <li>Mt. Vernon</li>
    <li>Mason City</li>
    <li>Coralville</li>
</ul>
Three new cities are in the top 10:
<ul>
    <li>Ames (college town)</li>
    <li>Monticello (rural iowa)</li>
    <li>Clear Lake (resort, next to Mason City)</li>
</ul>
Given these two lists, it is recommended that these Cities be evaluated further for possible new location due to proximity colleges and distance to major cities:
<ul>
    <li>Windsor Heights</li>
    <li>Cedar Falls</li>
    <li>Milford/Spirit Lake</li>
    <li>Iowa City/Coralville</li>
    <li>Mason City/Clear Lake</li>
</ul>
</p>
<h3>Evaluating Predicted Sales (Predicted Bottles * Avg Price)</h3>
<xmp>
    Mean of Average Items/Store in the Top 10 Cities using Predicted Sales is: 177.0
    Difference in mean of average items/store between the two methods is 13.0
</xmp>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right">
      <th></th>
      <th>City</th>
      <th>Pred_Sales</th>
      <th>Number of Stores</th>
      <th>Number of Stores + 1</th>
      <th>Pred_AvgSales</th>
      <th>Pred_AvgSales_w_entry</th>
      <th>Average_items_store</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>WINDSOR HEIGHTS</td>
      <td>172124.572356</td>
      <td>6.0</td>
      <td>7.0</td>
      <td>28687.428726</td>
      <td>24589.224622</td>
      <td>199.000000</td>
    </tr>
    <tr>
      <th>1</th>
      <td>CEDAR FALLS</td>
      <td>407049.343987</td>
      <td>17.0</td>
      <td>18.0</td>
      <td>23944.079058</td>
      <td>22613.852444</td>
      <td>163.882353</td>
    </tr>
    <tr>
      <th>2</th>
      <td>MILFORD</td>
      <td>67756.119496</td>
      <td>2.0</td>
      <td>3.0</td>
      <td>33878.059748</td>
      <td>22585.373165</td>
      <td>241.000000</td>
    </tr>
    <tr>
      <th>3</th>
      <td>IOWA CITY</td>
      <td>604113.134410</td>
      <td>26.0</td>
      <td>27.0</td>
      <td>23235.120554</td>
      <td>22374.560534</td>
      <td>151.615385</td>
    </tr>
    <tr>
      <th>4</th>
      <td>AMES</td>
      <td>580593.170325</td>
      <td>25.0</td>
      <td>26.0</td>
      <td>23223.726813</td>
      <td>22330.506551</td>
      <td>149.440000</td>
    </tr>
    <tr>
      <th>5</th>
      <td>MT VERNON</td>
      <td>86766.312096</td>
      <td>3.0</td>
      <td>4.0</td>
      <td>28922.104032</td>
      <td>21691.578024</td>
      <td>178.666667</td>
    </tr>
    <tr>
      <th>6</th>
      <td>MASON CITY</td>
      <td>291187.129485</td>
      <td>13.0</td>
      <td>14.0</td>
      <td>22399.009960</td>
      <td>20799.080678</td>
      <td>155.692308</td>
    </tr>
    <tr>
      <th>7</th>
      <td>MONTICELLO</td>
      <td>61698.954649</td>
      <td>2.0</td>
      <td>3.0</td>
      <td>30849.477325</td>
      <td>20566.318216</td>
      <td>241.000000</td>
    </tr>
    <tr>
      <th>8</th>
      <td>CORALVILLE</td>
      <td>272995.830038</td>
      <td>13.0</td>
      <td>14.0</td>
      <td>20999.679234</td>
      <td>19499.702146</td>
      <td>137.384615</td>
    </tr>
    <tr>
      <th>9</th>
      <td>CLEAR LAKE</td>
      <td>136262.829544</td>
      <td>6.0</td>
      <td>7.0</td>
      <td>22710.471591</td>
      <td>19466.118506</td>
      <td>155.166667</td>
    </tr>
  </tbody>
</table>
<h3>Liquor Categories</h3>
<p>Earlier, we created category bins to be used for our portfolio. We then further categorized each liquor type into broader genres (Vodka, Whiskey, Rum) rather than specific brands (Grey goose, Jack Daniels, Captain Morgan).</p>
<p>
    Only looking at the top 10 cities chosen, we grouped by city we see the total amount of liquor sold per category. We then found total bottles sold per city, then merged with categories we can show the % of category of liquor sold per city.
    This helped us answer the question, what is the highest mix of categories out of all the top 10?
</p>
<p>
    Vodka, Whiskey, and Rum are the top 3 types of liquor. 
    The average items per store for top 10 is 164.
    Assuming this would be the size of the store, lets multiply the percentages times 164.
    The ideal mix of liquors, assuming 164 items per store,for a new store should be:
    <table>
        <thead>
            <th>Rank</th>
            <th>Category</th>
            <th>Ideal_Mix_Qty</th>
        </thead>
        <tbody>
            <tr>
              <th>0</th>
              <td>VODKA</td>
              <td>49</td>
            </tr>
            <tr>
              <th>1</th>
              <td>WHISKEY</td>
              <td>46</td>
            </tr>
            <tr>
              <th>2</th>
              <td>RUM</td>
              <td>21</td>
            </tr>
            <tr>
              <th>3</th>
              <td>OTHER</td>
              <td>18</td>
            </tr>
            <tr>
              <th>4</th>
              <td>TEQUILA</td>
              <td>9</td>
            </tr>
            <tr>
              <th>5</th>
              <td>SCHNAPPS</td>
              <td>7</td>
            </tr>
            <tr>
              <th>6</th>
              <td>GIN</td>
              <td>6</td>
            </tr>
            <tr>
              <th>7</th>
              <td>BRANDIES</td>
              <td>6</td>
            </tr>
            <tr>
              <th>8</th>
              <td>AMARETTO</td>
              <td>1</td>
            </tr>
            <tr>
              <th>9</th>
              <td>BOURBON</td>
              <td>1</td>
            </tr>
            <tr>
              <th>10</th>
              <td>SCOTCH</td>
              <td>1</td>
            </tr>
        </tbody>
    </table>
</p>
<h2>Plotting the impact of a new store location</h2>
<p>
    We created a barchart of Fraction of Stores that are Liquor Stores by City for the top 10 cities.
    <img src='/img/post3/bar1.png'>
</p>
<p>
    Then we plotted the popularity of liquors by category.
    <img src='/img/post3/bar2.png'>
</p>
<p>
    Finally, we plotted the impact of entering the market in each of the top 10 cities.
    <img src='/img/post3/bar3.png'>
</p>
<h2>Conclusion</h2>
<p>Given the 10% random sample of the Iowa Liquor Sales, the log-normalized Linear Regression Model was used to fit the data to the model. Using the yearly Bottles Sold per each store as the target variables, the predictors Unique Items per Store, Stores per City, Avg Price, Population, and Income were used to fit the model. The correlation and MSE of the data was 0.88 and 0.17, respectively. The model was then used to predict on the test set, and comparing actual Bottles Sold to predicted Bottles Sold 0.87 and 0.19, respectively.</p>
<p>Top 10 Cities are recommended using Average Sales per number of competition, which is stores per city. Since we are interested in the scenario where a new store enters the market. We add 1 to the stores per city and divide Avg Sales by this number. Also assumed was that avg price and bottles sold per city were constant. The following cities are recommended for new markets for a new store location: Mt Vernon, Windsor Heights, Milford, Bettendorf, Iowa City, Mason City, Clinton, Spirit Lake, Cedar Falls, and Coralville. Using the types of Liquor sold (binning them into types), the ideal mix of products to be sold was calculated, which is based on the aggregate of top 10 cities.</p>
<p>Further Analysis can be performed on the brand and size of each type of liquor, as well as the optimal price based on calculated price elasticities.</p>
<p>Hope you enjoyed following along :)</p>
<br>
<p>Collaborators: <a href="adalal80.github.io" target="_blank">Amish Dalal</a>, <a href="tvoreyer.github.io" target="_blank">Thomas Voreyer</a></p>