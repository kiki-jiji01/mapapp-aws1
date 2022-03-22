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
・動画を全画面表示させるようにする。

・地図上のピンの位置を動かし、指し示した場所に関連した動画を表示させる機能。<br>
（現時点では検索ボックスで検索した時のみ動画が表示される仕様)

・リストを作る際の項目を充実させる。(現時点では、国名、都市名、内容、画像の4つ)

・リストアップデートの時、内容を直接編集できるようにする。(今のページ遷移を必要とする形だと手間がかかる)

・ターゲットセッティングを細かくしていき、それに合わせて表示される動画内容も変える。または、利用者の目的に合わせた動画を表示させる。(現時点では、景観、仕事、食事の3ジャンル)


## Development
#### frontend 
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

if you want to see the map, please get "geocode api key" and set it up to ".env, Main.js".


#### backend 
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
After that, you can see this app  at http://localhost:3000/　　　


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
