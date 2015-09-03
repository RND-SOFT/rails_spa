# RailsSpa

Данный гем икапсулирует в себе следующие javascript-библиотеки и сторонние решения:

1. [AngualarJS v1.4.4](https://github.com/angular/angular.js/tree/v1.4.4) (ngRoute, ngResource, ngSanitize)
2. [UnderscoreJS v1.8.3](https://github.com/jashkenas/underscore/tree/1.8.3)
3. [dcbox](https://github.com/dcversus/dcbox)
4. [ng-notify](https://github.com/matowens/ng-notify)
4. [pace](https://github.com/HubSpot/pace)
5. [perfect-scrollbar](https://github.com/noraesae/perfect-scrollbar)

Гем не требует наличия jQuery в проекте. При этом всячески поощряется полный отказ от данной библиотеки. Перед использованием гема убедитесь, что в application.js у вас выключены turbolinks.

Для установки гема добавьте в Gemfile следующую строчку:

```
gem 'rails_spa', git: 'git@github.com:storuky/rails_spa.git'
```
Следующим шагом требуется подключить компоненты в основной лейаут.
```
= render 'rails_spa/components'
```

Далее необходимо подключить js и css библиотеки в ваши assets-файлы(по умолчанию application.js и application.scss). 

```
//= require rails_spa
```

Так же необходимо заинжектить AngularJS модуль в ваше приложение:
```
angular.module('app', ['rails_spa'])
```

Для корректной работы требует следующие гемы
1. [js-routes](https://github.com/railsware/js-routes)
2. [slim-rails](https://github.com/slim-template/slim-rails)
3. [gon](https://github.com/gazay/gon)
4. [carrierwave](https://github.com/carrierwaveuploader/carrierwave)
5. [active_model_serializers](https://github.com/rails-api/active_model_serializers)

## 1. Структура приложения
Для структурированности вашего приложения и его адекватной интеграции с Rails Assets Pipeline используйте следующую структуру:

```
/javascripts
  /controllers
  /directives
  /services
  /filters
  application.js
  config.js
  routes.js
```

## 2. Контроллеры
Создание нового AngularJs-контроллера
```
rails g ng_controller controller_name
```
. Хорошей практикой является наличие отдельного контроллера под каждую страницу. В случае похожести контроллеров, общие части следует выносить в сервисы.

*Пример 2.1*
```
app.controller('HomeCtrl', ['$scope', 'Page', function ($scope, Page) {
  var ctrl = this;

  Page.current = 'home';
}])
```

Сервис Page инкапсулирован внутри гема. Он отвечает за текущее состояние страницы. В нем удобно хранить название текущей страницы для подсветки соответствующего пункта в меню. Данный сервис находится в $rootScope и доступен внутри шаблнизатора как:
*Пример 2.2*
```
{{Page.current}}
```

Для навигации можно использовать следующий прием (синтаксис шаблонизатора [slim](https://github.com/slim-template/slim-rails))
*Пример 2.3*
```
nav
  a href="/home" ng-class="{active: Page.current == 'home'}"
    | Домашняя страница
```

## 3. Нотификация

Для того, чтобы отобразить пользователю сообщение, пришедшее с сервера, необходимо, чтобы в ответе присутствовало поле msg.
*Пример 3.1. Нотис зеленого цвета*
```
render json: {msg: "Все отлично"}
```

*Пример 3.2. Нотис красного цвета*
```
render json: {msg: "Запись не найдена"}, status: 404
```

## Валидация форм

Для валидации форм необходимо, чтобы каждый элемент формы был обернут в тег с id, соответствующим названию данного поля в базе данных. Тогда в случае наличия в ответе поле errors будет произведена подсветка полей и под каждым полем будет выведена соответстующая ошибка.

```
render json: {errors: @record.errors}, status: 422
```

Может быть скомбинировано с нотификацией
```
render json: {errors: @record.errors, msg: "Ошибка при сохранении"}, status: 422
```

## Плюрализация

Написана фабрика и фильтр для плюрализации на русский язык. Может быть вызван внутри шаблонизатора, как
```
{{comments.count | plur:["комментарий", "комментария", "комментариев"]}}
```
Так же может быть использован внутри AngularJs контроллеров, директив, сервисов и тд.

```
pluralize(count, ["комментарий", "комментария", "комментариев"])
```

## Сервис авторизации
Работает в связке с devise. Позволяет обеспечить ajax-авторизацию и ajax-выход.

Для правильной работы сервиса необходимо сгенерировать devise-контроллеры командой:
```
rails generate devise:controllers users
```

Далее оптимизировать users/session_controller.rb для работы с ajax:
```
class Users::SessionsController < Devise::SessionsController

  def create
    self.resource = warden.authenticate(auth_options)
    if self.resource
      sign_in(resource_name, self.resource)
      render json: {msg: "Осуществляется вход в систему"}
    else
      render json: {msg: "Email или пароль указаны неверно"}, status: 401
    end
  end

  def destroy
    Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name)
    render json: {msg: "Осуществлен выход из системы"}
  end

end
```

Все готово для авторизации. Теперь создадим простую форму авторизации:
```
form
  input type="email" ng-model="Sign.user.email"
  input type="password" ng-model="Sign.user.password"
  button ng-click="Sign.in(Sign.user)"
```

Все остальное сервис сделает за нас. Для удаления сессии необходимо вызвать метод Sign.out()
```
a ng-click="Sign.out()" Выход
```

## Кастомный скролл
Для того, чтобы заменить браузерный скролл на кастомный, достатночно на нужном блоке объявить аттрибут scroll
```
div scroll="" rebuild="{{items}}" axis="y"
  div ng-repeat="item in items"
```

## dcbox
**dcbox** — отличная альтернатива для lightbox. Не требует никаких зависимостей, выглядит приятно, стабильно работает во всех современных браузерах.

```
.dcbox rebuild=""
  a href="{{image.url}}" ng-repeat="image in images"
    img src="{{image.thumb.url}}"
```

## Attachments
Строит список ссылок на файлы прикреплений в форме
```
attachments destroy-url="Routes.document_path" attachments="[{id: 1, href: '/file1', title: 'Файл 1'}, {id: 2, href: '/file2', title: 'Файл 2'}]"
```
Для задания такого формата используйте gem [active_model_serializers](https://github.com/rails-api/active_model_serializers)

## Слайдер изображений
```
slider max-slides="4" destroy-url="Routes.image_path" slides="[{id: 1, original: '/image1.png', thumb: '/image1-thumb.png'}, {id: 2, original: '/image2.png', thumb: '/image2-thumb.png'}]"
```
Для задания такого формата используйте gem [active_model_serializers](https://github.com/rails-api/active_model_serializers)

## TinyMCE
Требует подключения скриптов и стилей TinyMCE 4
```
textarea.tinymce ng-model="content"
```

## Загрузка файлов на сервер
```
input type="file" multiple="true" fileupload="Routes.images_path()" ng-model="ctrl.initiative.documents"
```
ng-model сочетается с директивами attachments и slider.

Хорошей практикой является предзагрузка файлов на сервер до отправки самой формы. Рассмотрим наиболее общий тип работы с использованием полиморфных связей на примере гема [carrierwave](https://github.com/carrierwaveuploader/carrierwave).
Создадим модель image
```
rails g model image file:string imageable_id:integer imageable_type:integer user_id:integer
```
Сгенерируем для нее uploader командой
```
rails g uploader image
```

Внутри модели определим связь и замаунтим загрузчик
```
mount_uploader :file, ImageUploader

belongs_to :user
belongs_to :imageable, polymorphic: true
```

Для модели User связь с Image:
```
has_many :images
```

Для модели Post
```
has_many :images, as: :imageable
```

Сгенерируем контроллер images
```
rails g controller images
```

Добавим в контроллер images 2 метода.

```
def create
  images = params[:attachments].map do |attachment|
    image = Image.new(file: attachment, user_id: current_user.id)
    if image.save
      image
    else
      nil
    end
  end

  render json: images.compact, each_serializer: ImageSerializer, root: false
end

def destroy
  current_user.images.find_by(id: params[:id]).destroy
  render json: {}
end
```

При загрузке изображений, связь будет создаваться только для пользователей. Тогда при сабмите формы мы можем установить связь с моделью уже непосредственно внутри методов create и update модели.

```
class PostsController < ApplicationController
  def create
    @post = current_user.initiatives.new post_params

    if @post.save
      associate :images, for: @post
      render json: {msg: "Пост успешно создан!"}
    else
      render json: {errors: @post.errors}, status: 422
    end
  end
  
end
```

Метод associate инкапсулирован внутри гема и доступен внутри любого контроллера, унаследованного от ActionController::Base. Принимает так же поля в качестве массива
```
associate [:images, :documents], for: @post
```

## Принцип построения SPA-приложения
Построение рельсового SPA-приложение начинается с редактирования routes.rb
```
devise_for :users, controllers: {
  sessions: 'users/sessions',
  registrations: 'users/registrations'
}

root 'application#index'

scope :ajax do
  get 'home' => 'Home#index'
  resource :posts
  # Здесь весь роутинг текущего приложения
end

get '/*path' => 'application#index'
```

Мы помещаем все роуты внутрь scope :ajax, тем самым добавляя к прослушиваемым роутам префикс /ajax. Это необходимо для того, чтобы при нажатии кнопки F5 на странице /posts нам не возвращался template без лейаута, а возвращалась индексная страница приложения к которой AngularJS применит свой html5-роутинг.

Индексная страница приложения находится в ApplicationController. При этом здесь же мы выключаем рельсовый layout

```
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  layout :false

  def index
    render template: "layouts/application"
  end
end
```

Далее необходимо внутри вьхи views/layouts/application.html.slim зменить =yield на ng-view. Так же необходимо прописать внутри тега head тег
```
<base href="/">
```
Все готово для того, чтобы строить spa-роутинг приложения. Для этого в /app/assets/javascripts создаем файл routes.js со следующим содержимым:

```
app.config(['$routeProvider', function ($routeProvider) {  
  $routeProvider
    .when('/', {
      templateUrl: Routes.home_path(),
      controller: 'HomeCtrl as ctrl',
      reloadOnSearch: false
    })
    .when('/posts', {
      templateUrl: Routes.posts_path(),
      controller: 'PostsCtrl as ctrl',
      reloadOnSearch: false
    })
    .otherwise({
      redirectTo: '/'
    })
}]);
```
 
