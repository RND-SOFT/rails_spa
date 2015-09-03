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
gem 'rails_spa'
```

Далее необходимо подключить js и css библиотеки в ваши assets-файлы(по умолчанию application.js и application.scss). 

```
//= require rails_spa
```

Так же необходимо заинжектить AngularJS модуль в ваше приложение:
```
angular.module('app', ['rails_spa'])
```

Для корректной работы требует гемы [js-routes](https://github.com/railsware/js-routes), [slim-rails](https://github.com/slim-template/slim-rails), [gon](https://github.com/gazay/gon).

## Структура приложения
Для структурированности вашего и его адекватной интеграции с Rails Assets используйте следующую структуру:

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

## Контроллеры
Создадим в каталоге /controllers новый контроллер. Назовем его home_ctrl.js. Не стоит жадничать с контроллерами. Хорошей практикой является наличие отдельного контроллера под каждую страницу. В случае похожести контроллеров, общие части следует выносить в сервисы.

```
app.controller('HomeCtrl', ['$scope', 'Page', function ($scope, Page) {
  var ctrl = this;

  Page.current = 'home';
}])
```

Сервис Page инкапсулирован внутри гема. Он отвечает за текущее состояние страницы. В нем удобно хранить название текущей страницы для подсветки соответствующего пункта в меню. Данный сервис находится в $rootScope и доступен внутри шаблнизатора как:
```
{{Page.current}}
```

Для навигации можно использовать следующий прием (синтаксис шаблонизатора [slim](https://github.com/slim-template/slim-rails)):

```
nav
  a href="/home" ng-class="{active: Page.current == 'home'}"
    | Домашняя страница
```

## Нотификация

Для того, чтобы отобразить пользователю сообщение, пришедшее с сервера, необходимо, чтобы в ответе присутствовало поле msg.
```
render json: {msg: "Все отлично"}
```

В случае ошибки:
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
**dcbox** — отличная альтернатива для lightbox. Не требует никаких зависимостей, выглядит приятно и стабильно работает во всех современных браузерах.

```
.dcbox rebuild=""
  a href="{{image.url}}" ng-repeat="image in images"
    img src="{{image.thumb.url}}"
```

## Attachments
Строит список ссылок на файлы прикреплений в форме
```
attachments destroy-url="Routes.document_path" attachments="[{href: '/file1', title: 'Файл 1'}, {href: '/file2', title: 'Файл 2'}]"
```

## Слайдер изображений
```
slider destroy-url="Routes.image_path" slides="[{original: '/image1.png', thumb: '/image1-thimb.png'}, {original: '/image2.png', thumb: '/image2-thimb.png'}]"
```
