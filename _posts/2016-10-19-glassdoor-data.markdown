---
layout:     post
title:      "Glassdoor Salary Data"
subtitle:   "Analyzing the factors that would identify the ideal data scientist salaries across different US cities."
date:       2016-10-19 08:49:00
author:     "Amer Shalan"
header-img: "img/post4/header.png"
---

<p>We scraped all the salary data from glassdoor for data scientists across all US cities using a <a href="https://github.com/ashalan/glassdoor-salary-scraper">custom script</a> running <a href="http://www.seleniumhq.org/projects/webdriver/"">Selenium Webdriver</a> and <a href="https://pypi.python.org/pypi/beautifulsoup4">BeautifulSoup</a>.</p>
<br>
<p>Which city has the highest paying salaries?</p>
<p>Do different cities value Data Scientist salries more than others?</p>
<p>Does a company's field have any correlation with Data Scientist Salaries?</p>
<br>
<h2>Cleaning the data</h2>
<p>
The stock data is cleaned for:
Certain terms in the name. Things like 'inc,' or 'corp' are deleted. This helps the matching process.
The market cap information is converted from strings to millions of dollars.
</p>
<p>
The city data is cleaned for:
Cities containing '-'
Cities containing 'county'
Removing ',' from city names
</p>
<p>We had discrepancies between the names of the scraped Glass Door data, and the names of the stock information. This led to information not being merged when it should have. So, we manually searched for the pairs of names and input them into a dictionary. This dictionary would be used to rename the mislabeled Glass Door entries.</p>
<p>We initiate a Glass Door data frame to connect the json to. We upload the json, which has four columns:
<ol>
    <li>Location</li>
    <li>Company</li>
    <li>Salary</li>
    <li>Job</li>
</ol>
We clean the json df for changing salary ranges to averages.
We save the json df as 'glass_door'.
We clean the glass_door df for name changes found listed above.
We merge the glass_door df with cities.
We create a new column "Normalized Salary".</p>
<p>We end up with this table head</p>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right">
      <th></th>
      <th>Location</th>
      <th>Company</th>
      <th>Salary</th>
      <th>Job</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Albany, NY</td>
      <td>GE</td>
      <td>104000.0</td>
      <td>Data Scientist</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Arlington, TX</td>
      <td>State Farm</td>
      <td>105000.0</td>
      <td>Data Scientist</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Arlington, TX</td>
      <td>Epsilon</td>
      <td>166000.0</td>
      <td>Data Scientist</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Arlington, TX</td>
      <td>Match</td>
      <td>82000.0</td>
      <td>Data Scientist</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Arlington, TX</td>
      <td>Hudl</td>
      <td>90000.0</td>
      <td>Data Scientist</td>
    </tr>
  </tbody>
</table>
<p>This is our job title value counts</p>
<ul>
    <li>Data Scientist                                945</li>
    <li>Senior Data Scientist                         375</li>
    <li>Principal Data Scientist                       59</li>
    <li>Junior Data Scientist                          38</li>
    <li>Entry Level Data Scientist                     28</li>
    <li>Data Scientist II                              18</li>
    <li>Data Scientist Intern                          17</li>
    <li>Associate Data Scientist                       16</li>
    <li>Data Scientist Intern - Hourly                 15</li>
    <li>Data Scientist Intern - Monthly                11</li>
    <li>Data Scientist I                                6</li>
    <li>Senior Data Scientist/Statistician              4</li>
    <li>Staff Data Scientist                            3</li>
    <li>Clinical Laboratory Scientist-data Analyst      2</li>
    <li>Chief Data Scientist                            2</li>
    <li>Scientist, Statistical and Data Sciences        2</li>
    <li>Data Visualization Scientist                    2</li>
    <li>Lead Data Scientist                             1</li>
    <li>Software Engineer (Data Scientist)              1</li>
    <li>Data Scientist - Hourly                         1</li>
</ul>
<p>We merge the glass_door df with stocks. We only select those Jobs that are Junior Level, Middle Level, or Senior Level. We dont want to end up with internships. We then bin the jobs with their respective bin names (as just mentioned).
For the most recurring private companies, market cap and sectors were updated as they had an impact on prediction ability.
Null values in market cap and sector were changed appropriately.</p>
<p>We end up with these job title value counts</p>
<ul>
    <li>DS           929</li>
    <li>Senior DS    431</li>
    <li>Junior DS     91</li>
</ul>
<br>
<p>We converted the most relevant columns to dummy variables. We played around with this a lot, and found that Sector, Region, Job, MarketCap, and various living index components contributed positively to our logistic regression. All other columns were deleted.</p>
<p>Additionally, we found that normalizing the salary data against the total living index helped to make the salary data gaussian. So, we also multiplied all of the independent variables against their corresponding living index.</p>

<h2>Regressing and plotting the Data</h2>
<p>Below are plots demonstrating the strength of our coefficents and the normalization of our salaries.</p>
<p>We decided to run a normal regression on our variables to see their predictive power. We figured that reducing the variance would greatly help our ability to classify our outputs for the logistic regression.</p>
<img src="/img/post4/regress1.png">
<img src="/img/post4/hist1.png">
<p>For the logistic regression below, we found the optimal tunings for our logistic regression outputs by running a series of for loops to find the best calibrations parameters. Furthermore, we took the average of the precision, recall, and f1scores over the course of 20 different random_states to find a more fair score.</p>
<pre>
Best f1:   0.75
Best x0:   -1.5
Best x1:   0.9
Best x2:   -1.5
Number of bins:     3
Random Iterations:  5

Average Precision:  0.715619047619
Average Recall:     0.719666666667
Average F1-Score:   0.713952380952

Variance Precision: 6.84263038549e-05
Variance Recall:    0.000754650793651
Variance F1-Score:  0.00051533106576
               113000-162000  162000-211000  64000-113000
113000-162000            143              0            52
162000-211000             15              0             4
64000-113000              41              1           229
               precision    recall  f1-score   support

113000-162000       0.72      0.73      0.73       195
162000-211000       0.00      0.00      0.00        19
 64000-113000       0.80      0.85      0.82       271

  avg / total       0.74      0.77      0.75       485

</pre>
<p>
Best f1: 0.75 Best x0: -1.5 Best x1: 0.9 Best x2: -1.5 Number of bins: 3 Random Iterations: 5
Average Precision: 0.715619047619 Average Recall: 0.719666666667 Average F1-Score: 0.713952380952
Variance Precision: 6.84263038549e-05 Variance Recall: 0.000754650793651 Variance F1-Score: 0.00051533106576 113000-162000 162000-211000 64000-113000 113000-162000 143 0 52 162000-211000 15 0 4 64000-113000 41 1 229 precision recall f1-score support
113000-162000 0.72 0.73 0.73 195 162000-211000 0.00 0.00 0.00 19 64000-113000 0.80 0.85 0.82 271
avg / total 0.74 0.77 0.75 485
</p>
<p>The data below represent our trials on only Senior Data Scientist positions, but reflect upon how the model changes with subsequent changes in the input parameters. The best f1-score we obtained surprisingly did not use job dummy variables.</p>

<p>
<h3>BEST with Junior Jobs and no Job Dummies</h3>
Number of bins: 3
    <ul>
        <li>Average Precision: 0.756315789474</li>
        <li>Average Recall: 0.754736842105</li>
        <li>Average F1-Score: 0.751052631579</li>
    </ul>
</p>

<p>
<h3>Best with No Junior Jobs and Job Dummies</h3>
Number of bins: 3
    <ul>
        <li>Average Precision: 0.755789473684</li>
        <li>Average Recall: 0.754210526316</li>
        <li>Average F1-Score: 0.75</li>
    </ul>
</p>

<p>
<h3>Best with No Junior Jobs and no Job Dummies</h3>
Number of bins: 3
    <ul>
        <li>Average Precision: 0.756315789474</li>
        <li>Average Recall: 0.754736842105</li>
        <li>Average F1-Score: 0.751052631579</li>
    </ul>
</p>

<p>
<h3>Standard Company Changes:</h3>
Number of bins: 3
    <ul>
        <li>Average Precision: 0.748947368421</li>
        <li>Average Recall: 0.748947368421</li>
        <li>Average F1-Score: 0.744736842105</li>
    </ul>
</p>

<p>
<h3>With Private Company changes:</h3>
Number of bins: 3
    <ul>
        <li>Average Precision: 0.755789473684</li>
        <li>Average Recall: 0.754210526316</li>
        <li>Average F1-Score: 0.75</li>
    </ul>
</p>

<p>
<h3>With PC changes and no Job Dummies:</h3>
Number of bins: 3
    <ul>
        <li>Average Precision: 0.756315789474</li>
        <li>Average Recall: 0.754736842105</li>
        <li>Average F1-Score: 0.751052631579</li>
    </ul>
</p>

<p>
<h3>Standard Company Changes:</h3>
Number of bins: 3
    <ul>
        <li>Average Precision: 0.748947368421</li>
        <li>Average Recall: 0.748947368421</li>
        <li>Average F1-Score: 0.744736842105</li>
    </ul>
</p>

<p>
<h3>With Private Company changes:</h3>
Number of bins: 3
    <ul>
        <li>Average Precision: 0.755789473684</li>
        <li>Average Recall: 0.754210526316</li>
        <li>Average F1-Score: 0.75</li>
    </ul>
</p>

<p>
<h3>With Private Company changes and Sector-MarketCap Bin:</h3>
Number of bins: 3
    <ul>
        <li>Average Precision: 0.753157894737</li>
        <li>Average Recall: 0.752105263158</li>
        <li>Average F1-Score: 0.748421052632</li>
    </ul>
</p>

<p>
<h3>With PC changes and no State Dummies:</h3>
Number of bins: 3
    <ul>
        <li>Average Precision: 0.723684210526</li>
        <li>Average Recall: 0.726842105263</li>
        <li>Average F1-Score: 0.72</li>
    </ul>
</p>

<p>
<h3>With PC changes and no Region Dummies:</h3>
Number of bins: 3
    <ul>
        <li>Average Precision: 0.754210526316</li>
        <li>Average Recall: 0.754210526316</li>
        <li>Average F1-Score: 0.748421052632</li>
    </ul>
</p>

<p>
<h3>With PC changes and no Job Dummies:</h3>
Number of bins: 3
    <ul>
        <li>Average Precision: 0.756315789474</li>
        <li>Average Recall: 0.754736842105</li>
        <li>Average F1-Score: 0.751052631579</li>
    </ul>
</p>
<p>
    <h3>With PC changes, no J D, and no MarketCap Dummies</h3>
    <p>This is another regression on our input variables. It is of a different library, for added coefficient information. The x_train,y_train,... can be found just above the other regression graphs.</p>
    <img src='/img/post4/regress2.png'>
</p>
<p>Hope you enjoy my findings :)</p>
<p>Collaborators: <a href="https://tvoreyer.github.io" target="_blank">Thomas Voreyer</a>, <a href="https://jocelyn-ong.github.io" target="_blank">Jocelyn Ong</a>, </p>