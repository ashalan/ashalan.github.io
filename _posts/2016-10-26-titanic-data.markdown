---
layout:     post
title:      "Titanic Data"
subtitle:   "Analyzing survivors of the titanic tragedy."
date:       2016-10-26 10:15:00
author:     "Amer Shalan"
header-img: "img/post5/titanic.png"
---

<p>We take a look at the <a href="https://www.kaggle.com/c/titanic/data">titanic dataset</a>.</p>
<br>
<p>What variables contributed to an individuals survival?</p>
<p>Did different ages or sexes have a higher rate of survival?</p>
<br>
<h2>Cleaning the data</h2>
<p>We had two missing ages. We can replace that with the median.</p>
<xmp>
# Replacing missing ages with median
df['Age'] = df['Age'].fillna(df['Age'].median())
</xmp>
<p>The cabin data had very little data. We drop that.</p>
<xmp>
# Delete Cabin
del df['Cabin']
</xmp>
<p>We drop the remaining rows that have NaN's.</p>
<xmp>
# Drop remaining NaN's
df.dropna(inplace=True)
</xmp>
<h2>Plotting the data</h2>
<p>I started by plotting all peoples ages and their survival.</p>
<img src='/img/post5/age_w_survived.png'>
<table>
  <tr>
    <th>Age</th>
    <th>Category</th>
  </tr>
  <tr>
    <td>0-5</td>
    <td>Baby</td>
  </tr>
  <tr>
    <td>6-15</td>
    <td>Child</td>
  </tr>
  <tr>
    <td>16-30</td>
    <td>Adult</td>
  </tr>
  <tr>
    <td>31-40</td>
    <td>Mid</td>
  </tr>
  <tr>
    <td>41-60</td>
    <td>Old</td>
  </tr>
  <tr>
    <td>61-80</td>
    <td>Very Old</td>
  </tr>
</table>
<p>I then plotted each class and their survival.</p>
<img src='/img/post5/class_w_survived.png'>
<p>This is a a little difficult to read. Why dont we put it into a stacked bar graph to see the weight of each genre and the songs in that genre hitting Number 1.</p>
<h2>Data Wrangling</h2>
<p>In an attempt to figure out which coefficients I should use, I normalized the appropriate data and ran a RFE model.</p>
<xmp>
nc = [x for x in df.columns if x not in ['Survived', 'Sex',
    'Embarked', 'index', 'PassengerId' , 'Name', 'Ticket']]

df_norm = (df[nc] - df[nc].mean()) / (df[nc].max() - df[nc].min())

svc = SVC(kernel="linear", C=1)
rfe = RFE(estimator=svc, n_features_to_select=1, step=1)
rfe.fit(df_norm, df.Survived)
ranking = rfe.ranking_

coeffs = pd.DataFrame(ranking, index=df[nc].columns, columns=['coef'])
coeffs.sort_values('coef')
</xmp>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>coef</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Pclass</th>
      <td>1</td>
    </tr>
    <tr>
      <th>Fare</th>
      <td>2</td>
    </tr>
    <tr>
      <th>Age</th>
      <td>3</td>
    </tr>
    <tr>
      <th>SibSp</th>
      <td>4</td>
    </tr>
    <tr>
      <th>Parch</th>
      <td>5</td>
    </tr>
  </tbody>
</table>
<p>I dropped the fare data since the class data can represent similar findings but with a higher correlation.</p>
<p>Created dummy vriables for:
    <ul>
        <li>Sex</li>
        <li>Age (binned with the table above)</li>
        <li>Embarked</li>
        <li>Pclass</li>
    </ul>
</p>
<h2>Regression</h2>
<p>I ran a RFECV to figure out the optimal number of features to use to get the highest score. What I figured out was that 7 features was the best</p>
<img src='/img/post5/optimal_features.png'>
<p>So I ran a Logistic Regression and received these absolute coefficients.</p>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Coefficient</th>
      <th>Feature</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2</th>
      <td>2.600351</td>
      <td>male</td>
    </tr>
    <tr>
      <th>5</th>
      <td>2.032660</td>
      <td>Age_Baby</td>
    </tr>
    <tr>
      <th>10</th>
      <td>1.482869</td>
      <td>Class_1</td>
    </tr>
    <tr>
      <th>11</th>
      <td>0.908808</td>
      <td>Class_2</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.585350</td>
      <td>Embark_C</td>
    </tr>
    <tr>
      <th>0</th>
      <td>0.447184</td>
      <td>SibSp</td>
    </tr>
    <tr>
      <th>6</th>
      <td>0.365025</td>
      <td>Age_Child</td>
    </tr>
    <tr>
      <th>9</th>
      <td>0.180293</td>
      <td>Age_Old</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.161709</td>
      <td>Embark_Q</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.072917</td>
      <td>Parch</td>
    </tr>
    <tr>
      <th>8</th>
      <td>0.049452</td>
      <td>Age_Mid</td>
    </tr>
    <tr>
      <th>7</th>
      <td>0.044070</td>
      <td>Age_Adult</td>
    </tr>
  </tbody>
</table>
<p>Since 4 of the bottom 5 coefficients are dummy created variables, we can only drop the Parch variable from our model.</p>
<p>We the new model, we end up with this confusion matrix</p>
<table>
  <tr>
    <th></th>
    <th>Predicted Survived</th>
    <th>Predicted did_not_survive</th>
  </tr>
  <tr>
    <td>Survived</td>
    <td>82</td>
    <td>30</td>
  </tr>
  <tr>
    <td>Did not Survive</td>
    <td>26</td>
    <td>156</td>
  </tr>
</table>
<p>Hope you enjoy my findings :)</p>