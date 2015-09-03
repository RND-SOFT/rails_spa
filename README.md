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
Созданим в каталоге /controllers новый контроллер. Назовем его home_ctrl.js

```
app.controller('HomeCtrl', ['$scope', 'Page', function ($scope, Page) {
  var ctrl = this;

  Page.current = 'home';
}])
```

Сервис Page инкапсулирован внутри 
