![1](https://github.com/kol-oss/db_lecture/assets/111194749/3846909e-a1bd-40e9-b561-d2bd653c3a48)

# Принципи та прийняті практики розробки RESTful сервісів

**REST (REpresentational State Transfer)** - це архітектурний стиль, що описує взаємодію фронт- та бекенд частин системи. Він визначає структуру та правила обробки запитів, встановлює формат кінцевих точок (endpoints) системи та дозволяє уніфікувати звертання до серверної частини застосунку.

Кожен архітектурний стиль має особливості та найпопулярніші практики, що відокремлюють його від інших. Застосунки, які задовольняють принципи архітектури REST, називають RESTful-сервісами.

---

## Принципи REST API

### 1. Uniform interface _(Уніфікований інтерфейс)_

Кожна компонента система повинна мати чіткий та стандартизований інтерфейс, що дозволяє звертатися до неї та очікувати результат у певному раніше визначеному форматі.
   
Наступні чотири обмеження допомагають уніфікувати взаємодію у RESTful сервісах:

* **Identification of resources** _(Визначення ресурсів)_ - ресурсом в концепції REST API називається певна логічна сутність, для якої можна виокремити властивості та методи. Перелік таких ресурсів повинен бути чітко визначеним, а кожен ресурс повинен мати постійний ідентифікатор (URI).

* **Manipulation of resources through representations** _(Взаємодія з ресурсами через представлення)_ - взаємодія з сутностями відбувається через представлення (їхній вигляд у програмному коді), що відображає актуальний стан ресурсу.
   
* **Self-descriptive messages** _(Повнозначні повідомлення)_ - кожен запит повинен мати достатньо інформації, аби система могла зробити все, що він запитує.
   
* **HATEOAS або Hypermedia as the engine of application state** _(Гіпермедіа як рушій стану додатку)_ - вся інформація повинна передаватися через спеціалізовані частини запиту: заголовки, параметри рядка запиту, тіло (body). Все це разом називається гіпермедіа.

### 2. Client-server _(Клієнт-серверна взаємодія)_ 

Система повинна бути реалізована таким чином, аби користувач та сервер були двома логічно відокремленими частинами, що не мають взаємодіяти з внутрішніми частинами одне одного.
Наприклад, користувач не має доступу до сервісів зберігання даних, в той час, як сервер не може безпосередньо взаємодіяти з інтерфейсом користувача. Це значно покращує масштабованість та мобільність застосунку, дозволяючи змінювати внутрішнє наповнення частин, не змінюючи інтерфейси взаємодії з ними.

### 3. Stateless _(Без збереження стану)_

Як було зазначено раніше, кожен запит повинен містити всю інформацію, необхідну для його виконання. Це зроблено через те, що серверна частина не зберігає жодного стану, тобто проміжної інформації, що стосується запиту.

Таким чином сервер не може скористатися будь-якою попередньо збереженою інформацією, а вся інформація щодо сесії зберігається на стороні клієнта.

### 4. Cache _(Кешування)_

В архітектурі REST API допускається кешування, тобто збереження часто вживаних даних з метою їх якнайшвидшого повернення при запиті. При цьому кожен запит повинен позначати чи необхідно кешувати його відповідь.

Якщо відповідь можна кешувати, клієнтська програма отримує право повторно використовувати дані відповіді для еквівалентних запитів протягом визначеного періоду.

### 5. Layered system _(Багатошарова система)_

У RESTful-сервісах рекомендується застосовувати багатошарову архітектуру програмного забезпечення – кожен компонент не може бачити далі безпосереднього рівня, з яким він взаємодіє.

Наприклад інтерфейс взаємодії користувача з додатком (User Interface Layer) повинен взаємодіяти лише з шаром сервісів-обробників запитів (Presentation Layer), які обробляють запити та передають їх для обробки бізнес-логіки (Application Layer) і тд.

---

## Практики REST API

Окрім основних принципів REST API, існують також і загальноприйняті правила, дотримання яких вважається хорошим тоном серед програмістів.

### 1. Запити і відповіді в JSON форматі

Станом на сьогодні, саме JSON – стандарт для передачі даних, і його може використовувати майже кожна мережева технологія, тому відповіді серверу мають формуватися з використанням цього формату.

Щоб переконатися, що клієнти інтерпретують дані як JSON, ми повинні встановити в заголовку `Content-Type` = `application/json`. Багато сучасних серверних фреймворків роблять це автоматично.

Розглянемо приклад API, яке приймає JSON-дані. Мідлвар `body-parser` використаний для розбору тіла JSON-запиту, а метод `res.json` надсилає об’єкт body, як відповідь:

> 1-body.js
```js
app.use(bodyParser.json());

app.post('/', (req, res) => {
    res.json(req.body);
});
```

### 2. Іменники у шляхах до ключових точок

Не слід використовувати дієслова у шляхах до кінцевих точок (endpoints). Замість них кращим варіантом є іменники, які представляють сутність, яку ми отримуємо або з якою маніпулюємо.

Наш метод HTTP-запиту вже містить дієслово. Тому наявність дієслів у шляхах до кінцевих точок нашого API лише робить їх невиправдано довгими, і не передає ніякої нової інформації.

Найпоширеніші HTTP методи включають:

* **GET** - отримує ресурси;
* **POST** - відправляє нові дані на сервер;
* **PUT** - оновлює наявні дані;
* **DELETE** - видаляє дані.

Якщо узагальнити, то слід створювати маршрути на кшталт `GET /articles/` для отримання статей новин. Аналогічно, `POST /articles/` для додавання нової статті, `PUT /articles/:id` для оновлення статті з заданим id. `DELETE /articles/:id` - для видалення наявної статті з вказаним ідентифікатором.

Наприклад, створити вищезгадані ендпойнти можна таким чином:

> 2-methods.js
```js
app.get('/articles', (req, res) => {
    const articles = [];
    // ...

    res.json(articles);
});

app.post('/articles', (req, res) => {
    //...
    
    res.json(req.body);
});

app.put('/articles/:id', (req, res) => {
    // ...

    res.json(req.body);
});

app.delete('/articles/:id', (req, res) => {
    const { id } = req.params;
    // ...

    res.json({ deleted: id });
});
```


Кінцеві точки POST, PUT і DELETE приймають JSON в якості тіла запиту, і всі вони повертають JSON у відповідь, включаючи метод GET.

### 3. Логічна вкладеність ендпойнтів

При проєктуванні слід групувати кінцеві точки, які містять пов'язану інформацію. Тобто, якщо один об'єкт може містити інший об'єкт, слід створити кінцеву точку, щоб відобразити це.

Це хороша практика, незалежно від того, чи дані у вашій БД структуровані таким чином.

Наприклад, якщо ми хочемо, щоб кінцева точка отримувала коментарі до статті новин, слід додати шлях /comments в кінець шляху `/articles`. Ось як зробити це з допомогою Express:

> 3-pathes.js
```js
app.get('/articles/:articleId/comments', (req, res) => {
    const comments = [];
    // ...

    res.json(comments);
});
```

Якщо кожна стаття має власні коментарі, то така структура має сенс, оскільки коментарі є дочірніми об'єктами статей. В іншому ж випадку це лише заплутає користувача.

### 4. Обробка помилок
Щоб усунути плутанину при виникненні помилки, потрібно обробляти її та повертати коди HTTP-відповідей, які вказують, яка саме помилка сталася. Це дозволить користувачам, або розробникам API зрозуміти проблему, яка виникла.

Поширені коди статусу HTTP помилок включають:

* **400 Bad Request** - вхідні дані на стороні клієнта не пройшли валідацію;
* **401 Unauthorized** - користувач не авторизований;
* **403 Forbidden** - користувач автентифікований, але йому заборонено доступ до ресурсу;
* **404 Not Found** - ресурс не знайдено;
* **500 Internal Server Error** - типова помилка сервера;
* **502 Bad Gateway** - недійсна відповідь від сервера;
* **503 Service Unavailable** - на стороні сервера сталося щось непередбачуване.

Наприклад, якщо ми хочемо відхилити дані запиту, то ми повинні повернути відповідь 400, як показано нижче:

> 4-error.js
```js
// existing users
const users = [
    { email: 'kaban@gmail.com' }
]

app.post('/users', (req, res) => {
    const { email } = req.body;
    const userExists = users.find(
        user => user.email === email
    );

    if (userExists) {
        return res
            .status(400)
            .json({
                error: 'User already exists'
            });
    }
    res.json(req.body);
});
```

Також коди помилок повинні супроводжуватися повідомленнями, щоб у користувачів чи розробників було достатньо інформації для усунення проблеми.

### 5. Фільтрування, сортування та пагінація

Іноді даних буває так багато, що неможливо повернути всі одразу, тому що це занадто повільно або призведе до падіння системи. Тому необхідно завчасно планувати способи фільтрування елементів. Також у нагоді може стати пагінація даних, щоб поверталися лише кілька результатів за раз.

Фільтрація і пагінація підвищують продуктивність, зменшуючи використання ресурсів сервера. Чим більше даних накопичується в базі даних, тим важливішими стають ці функції.

Ось невеликий приклад, де API може приймати рядок запиту з різними параметрами, щоб ми могли відфільтрувати елементи за їх полями:

> 5-filters.js
```js
// existing users
const users = [
    { firstName: 'Kaban', age: 33 },
    { firstName: 'Bee', age: 27 },
]

app.get('/users', (req, res) => {
    const { firstName, age } = req.query;
    let filtered = [...users];

    if (firstName) {
        filtered = filtered.filter(
            user => user.firstName === firstName
        );
    }

    if (age) {
        filtered = filtered.filter(
            user => Number(user.age) === Number(age)
        );
    }

    res.json(filtered);
});
```

У наведеному вище коді ми використовуємо змінну req.query для отримання параметрів запиту. Потім ми витягуємо значення властивостей, деструктуруючи окремі параметри запиту у змінні. Далі запускаємо фільтр для кожного значення параметра запиту, щоб знайти елементи, які хочемо повернути.

Після цього ми повертаємо результати у відповідь. Тому, якщо зробити GET-запит за наступним шляхом з рядком запиту:

```/users?age=33```

ми отримаємо:

```json
[
  {
  "firstName": "Bee",
  "age": 33
  }
]
```

В рядку запиту можна також вказати поля для сортування.

Наприклад, ми можемо витягти рядок запиту з URL на кшталт:

```/users?sort=+age,-firstName```

Де `+` означає зростання, а `-` означає спадання.

### 6. Кешування даних

Для покращення швидкодії, слід додати кешування та повертати дані з кешу локальної пам'яті замість того, щоб звертатися до бази даних за даними щоразу. Однак слід пам’ятати, що дані, які отримують користувачі, можуть бути застарілими.

Наприклад, Express має мідлвар `apicache` для додавання кешування в наш додаток без особливих налаштувань.

> 6-cache.js
```js
const cache = apicache.middleware;

app.use(cache('5 minutes'));

const users = [
    { firstName: 'Mad', lastName: 'Bee', age: 27 },
    { firstName: 'Kaban', lastName: 'Ivanovich', age: 33 },
]

app.get('/users', (req, res) => {
    res.json(users);
});
```

При використанні кешування, потрібно включити поле `Cache-Control` у ваші заголовки. Це допоможе користувачам ефективніше використовувати систему кешування.

### 7. Зазначення версії API
Потрібно мати різні версії API, якщо збираєтеся вносити зміни, які можуть порушити роботу клієнтів. Версіонування можна зробити за семантичною версією `major.minor.patch`, як це робиться зараз у більшості додатків.

Таким чином, можна поступово відмовлятися від старих кінцевих точок замість того, щоб змушувати всіх одночасно переходити на новий API. Ендпойнт `v1` може залишатися активним для тих, хто не хоче робити зміни, в той час як `v2`, з її новими функціями, може обслуговувати тих, хто готовий до оновлення. Це особливо важливо, для загальнодоступного API.

Версії зазвичай створюються за допомогою секцій `/v1/`, `/v2/` і т.д., які додаються на початку шляху до API.

> 7-versions.js
```js
app.get('/v1/users', (req, res) => {
    const users = [];
    // do something good...

    res.json(users);
});

app.get('/v2/users', (req, res) => {
    const users = [];
    // do something GREAT!!!

    res.json(users);
});
```

### 8. Належна захищеність даних

Більшість комунікацій між клієнтом і сервером мають бути захищеними, оскільки часто відбувається обмін приватною інформацією. Тому використання SSL/TLS для забезпечення безпеки є обов'язковим.

SSL-сертифікат не надто складно завантажити на сервер, а його вартість безкоштовна або дуже низька. Немає жодної причини, щоб не використовувати захищені канали обміну даними.

Також люди не повинні мати можливість отримати доступ до більшої кількості інформації, ніж вони запитували. Наприклад, звичайний користувач не повинен мати доступ до інформації іншого користувача. Вони також не повинні мати доступу до даних адміністраторів. Щоб забезпечити дотримання принципу найменших привілеїв, потрібно додати перевірку ролей.

---

## Запуск прикладів
_Перед початком роботи потрібно встановити Node.js, npm та IDE на ваш вибір._  

Щоб мати змогу самостійно запустити приклади з доповіді, або зробити щось на їхній основі, потрібно виконати наступні кроки у терміналі вашого IDE:

**1. Клонувати цей репозиторій**
```shell
git clone https://github.com/kol-oss/db_lecture.git
```

**2. Встановити залежності**
```shell
npm i
```

**3. Запустити потрібний приклад**
```shell
node 1-body.js
```
