## :sunrise: TopPage 
<img src="https://user-images.githubusercontent.com/77915080/153757104-bb97cd68-b178-407d-b05a-c49cd1b9cc63.png" width="100%">


## :wrench:　使用技術
<img src="https://user-images.githubusercontent.com/77915080/153757031-ac855c83-ff84-4700-8498-77215c62d84c.png" width="100%">


## :globe_with_meridians:　App URL
### **https://master.d3upxxitskitpz.amplifyapp.com**  


## :ocean:　概要 
住んでみたい、行ってみたい国や都市の情報が多面的に得られるアプリケーション、mapwith。

行きたい国・都市の名前を検索するとその場所に関連する情報が、景観・仕事・食事の3つのジャンルごとに動画として表示されます。
また地図でその場所をさし示してくれます。

さらに、調べた情報をリストととして作成・保存することも可能です。


## :dog:　制作背景
自分自身がワーキングホリデーで海外に行こうと計画し、気になる国の情報を調べている際、その土地の仕事や街の雰囲気、
地理的な場所等をそれぞれ別のサイトやアプリ等で収集しなければならないことに不便を感じ、
欲しい情報が一括で集められたらいいな、という思いがこのmapwithというアプリをつくるきっかけでした。

また場所を地理的に把握することはその場所をイメージをしやすくなったり、旅をする高揚感を得ることができたりと<br>
新しい場所に向かう際に欠かせないものである、といった思いから動画と共に地図も表示させることになりました。

## :memo:　スライド資料
<a href="https://docs.google.com/presentation/d/1mqU2NHPshweJYHgzRK3IUENxkl6g5kjR-WjSTsFpFfc/edit?usp=sharing">スライド資料</a>

#### ※Backendのコードはこちらのレポジトリになります。　<br>**https://github.com/kiki-jiji01/mapwith-django**


## :books:アプリの利用方法
#### 検索ボックスに国や都市名を入力すると動画が表示されます。また地図もその場所を指してくれます。
![Frame 13](https://user-images.githubusercontent.com/77915080/153757274-1ca424c9-8c91-405d-b3d6-b9e7a3a7f5f1.png)
![Frame 14](https://user-images.githubusercontent.com/77915080/153757280-6ffb5628-eb5e-4750-85d3-90145a2fd308.png)

#### 行きたい場所をリストとして保存できます。
![PC_LISt](https://user-images.githubusercontent.com/77915080/153757372-ab798907-c388-4e2d-ac35-3c45494b5c46.png)

#### リストはdelete、updateが可能です。
![PC_Detail](https://user-images.githubusercontent.com/77915080/153757419-4e01d192-7f0f-4321-bb98-fae7596e5eb8.png)


## :hammer:　今後実装したい機能

・ユーザーを誘導させるUIの構築。

・レスポンシブデザインの実装

・地図上のピンの位置を動かし、指し示した場所に関連した動画を表示させる機能。<br>
（現時点では検索ボックスで検索した時のみ動画が表示される仕様)

・リストを作る際の項目を充実させる。(現時点では、国名、都市名、内容、画像の4つ)

・リストアップデートの時、内容を直接編集できるようにする。(今のページ遷移を必要とする形だと手間がかかる)

・ターゲットセッティングを細かくしていき、それに合わせて表示される動画内容も変える。または、利用者の目的に合わせた動画を表示させる。(現時点では、景観、仕事、食事の3ジャンル)

## Requirements

```
node 16.13.1
Python 3.7.2
```
## Downloading and installing steps
### frontend 
1. Clone the repository

```
git clone https://github.com/kiki-jiji01/mapapp-aws1.git
```
2.Go into the repository
```
cd mapapp-aws1
```

3.Install dependencies
```
npm install
```

4.Run the app

```
npm start
```

5.Set the Environment variable and add to Main.js
| Environment variable　name | description |
----|---- 
| REACT_APP_GEOCODE_API_KEY | You can get that here(https://developers.google.com/maps/documentation/geocoding/overview) |


After that, you can see  MAP.

### backend 
1. Clone the repository
```
git clone https://github.com/kiki-jiji01/mapwith-django.git
```
2.Go into the repository
```
cd mapwith-django
```

3.Enter the virtual environment
```
source env/bin/activate
```

4.following this site 

<a href="https://engineer-lifestyle-blog.com/code/python/django-restframework-environment-reproduce-with-github/">here</a>
```
pip install -r requirements.txt
.
.
.
python manage.py runserver
```

5.Set the Environment variable and add to Main.js
| Environment variable　name | description |
----|---- 
| SECRET_KEY | You can get that at step 4  |
| DEBUG | false  |
| ALLOWED_HOSTS | localhost,0.0.0.0,127.0.0.1 |

After that, you can see this app  at http://localhost:3000/　　　
