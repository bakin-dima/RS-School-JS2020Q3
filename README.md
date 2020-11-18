# English For Kids
https://github.com/rolling-scopes-school/tasks/blob/master/tasks/rslang/english-for-kids.md
### Описание страниц
1. Главная страница приложения
* на главной странице приложения размещаются ссылки на страницы с категориями слов
* минимальное количество категорий - восемь
* каждая ссылка содержит тематическую картинку и название категории
* ссылки дублируются в выезжающем боковом меню, которое открывается и скрывается по клику на иконку в левом верхнем углу страницы
* на главной странице приложения и на страницах категорий есть переключатель Train/Play (тренировка/игра)
2. Страница категории
* страница категории содержит название категории и карточки со словами соответствующей тематики
* минимальное количество карточек со словами в каждой категории - восемь
* каждая карточка содержит тематическую картинку и слово на английском языке
* при клике по карточке звучит произношение слова на английском языке
* на каждой карточке есть кнопка, при клике по которой карточка переворачивается. На оборотной стороне карточки размещается * перевод слова. При клике по оборотной стороне карточки ничего не происходит, произношение слова не звучит.
* обратный поворот карточки на лицевую сторону происходит автоматически, когда курсор мыши перемещается за её границы
3. Страница со статистикой
* описание страницы находится в критериях оценивания (Hacker scope)
### Работа приложения
* Приложение работает в режиме тренировки и в режиме игры.
* Описание работы приложения в данных режимах находится в критериях оценивания (Basic scope и Advanced scope соответственно). * При загрузке приложения или перезагрузке страницы приложение открывается в режиме тренировки. Переключение между тренировкой и игрой происходит при клике по переключателю Train/Play.
### Требования к оформлению приложения
* внешний вид приложения соответствует предложенному образцу или является его улучшенной версией
* вёрстка адаптивная. Минимальная ширина страницы, при которой проверяется корректность отображения приложения, 320рх
* так как приложение предназначено для обучения детей, в том числе и тех, которые ещё не умеют читать, все надписи, если это возможно, необходимо продублировать картинками или иконками
* интерактивность элементов, с которыми пользователи могут взаимодействовать, изменение внешнего вида самого элемента и состояния курсора при наведении, использование разных стилей для активного и неактивного состояния элемента, плавные анимации
* в футере приложения есть ссылка на гитхаб автора, год создания приложения, логотип курса со ссылкой на курс

### Критерии оценки:
#### Basic scope +50
* Вёрстка, дизайн, UI главной страницы приложения: (+10)
    * присутствуют все указанные в задании элементы как на мобильной, так и на десктопной версии
    * выполнены все описанные требования к оформлению приложения
* Вёрстка, дизайн, UI выезжающего меню: (+10)
    * выполнены все описанные требования к оформлению приложения
    * ссылки в меню рабочие и ведут на страницы с категориями слов
    * ссылка на текущую страницу внешне отличается от остальных
    * выезжающее меню присутствует на всех страницах приложения
    * плавная анимация выезжающего меню
    * меню закрывается кликом по крестику, кликом по ссылке в меню, кликом в любом месте приложения, кроме самого меню
* Вёрстка, дизайн, UI страницы категории: (+10)
    * присутствуют все указанные в задании элементы как на мобильной, так и на десктопной версии
    * выполнены все описанные требования к оформлению приложения
* Режим тренировки: (+20)

    * при клике по карточке звучит произношение слова на английском языке: (+10)
    * на каждой карточке есть кнопка, при клике по которой карточка поворачивается, на обратной стороне указан перевод слова. Когда курсор мыши перемещается за границы карточки, она автоматически поворачивается на лицевую сторону: (+10)
#### Advanced scope +80 / +120
* Режим игры: (+80)
    * кликом по переключателю Train/Play включается режим игры. В режиме игры указанные выше возможности режима тренировки отключаются, кнопка, при клике по которой карточка переворачивалась, и текст на карточке скрываются. Появляется кнопка "Start game". Размер карточки не изменяется. На карточке остаётся только изображение, которое занимает всю её площадь (если это не противоречит вашему дизайну): (+10)
    * после клика по кнопке "Start game" звучит английское произношение рандомного слова из тех, что находятся на странице. Для каждой страницы, и для каждой игры рандомные слова генерируются по-новой: (+10)
    * после первого клика по кнопке "Start game" надпись на ней меняется на иконку "Repeat", меняется внешний вид кнопки. При клике по кнопке "Repeat" произношение слова звучит ещё раз: (+10)
    * если пользователь кликнул по активной карточке с неправильным ответом, раздаётся звуковой сигнал "error": (+10)
    * если пользователь кликнул по активной карточке с правильным ответом, раздаётся звуковой сигнал "correct" и после него звучит произношение рандомного слова из тех, которые ещё не звучали: (+10)
    * карточка с угаданным словом становится неактивной, при этом изменяется её внешний вид. Клики по неактивной карточке звуковыми эффектами не сопровождаются, на счёт игры не влияют: (+10)
    * после начала игры каждый клик по активной карточке является правильным или неправильным ответом. Эти ответы отображаются в виде звёздочек (или других символов) разного цвета в шкале с рейтингом, которая появляется в режиме игры. Если звёздочек слишком много и шкала заполнена ими полностью, предыдущие звёздочки скрываются, а новые продолжают добавляться: (+10)
    * когда угаданы все слова в категории: (+10)
    * если все слова угаданы правильно, звучит сигнал "success", карточки со словами скрываются, на странице отображается радостный смайлик (или другая картинка)
    * если при угадывании слов были ошибки, звучит сигнал "failure", карточки со словами скрываются, на странице отображается грустный смайлик (или другая картинка) и количество допущенных ошибок.
    * приложение автоматически перенаправляет на главную страницу со списком категорий
    * Выполнены требования к коду – 40 баллов (оценивает только ментор)
    * дублирование кода сведено к минимуму, не используются магические числа, используются осмысленные имена переменных и функций, оптимальный размер функций и т.д. +10
    * подключены и используются webpack, eslint, eslint-config-airbnb-base +10
    * приложение разбито на отдельные модули
    * используются фичи ES6 и выше +10
#### Hacker scope +40
* Страница статистики: (+40)
    * страница со статистикой содержит перечень всех категорий, всех слов в каждой категории, перевод каждого слова. Минимальная ширина, при которой страница статистики отображается корректно – 320 рх. Не является ошибкой наличие в таблице со статистикой полосы прокрутки: (+10)
    * возле каждого слова указывается статистика - сколько раз по карточки с данным словом кликали в режиме тренировки, сколько раз данное слово угадывали в режиме игры, сколько ошибок при этом допустили, процент правильных ответов по каждому слову в режиме игры. После перезагрузки приложения статистика сохраняется: (+10)
    * есть возможность сортировки данных по алфавиту, для числовых значений - по их величине. Сортировка может происходить в прямом и обратном порядке и должна охватывать весь диапазон данных: (+10)
    * на странице со статистикой размещены кнопки "Repeat difficult words" и "Reset". Кнопка "Reset" обнуляет статистику. При клике по кнопке "Repeat difficult words" открывается страница изучения слов с наибольшим процентом ошибок аналогичная странице категории. На странице "Repeat difficult words" может размещаться от нуля до восьми слов, в зависимости от того сколько слов угадывалось в режиме игры и при их угадывании были допущены ошибки. После нажатия на кнопку "Reset" количество слов на странице "Repeat difficult words" равно нулю: (+10)
    * реализован дополнительный, не предусмотренный заданием функционал. Не оценивается, но, если можете сделать лучше, почему бы и нет.