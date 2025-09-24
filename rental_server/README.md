# Rental Server Backend

Express.js backend для проекта Rental, переписанный с Django на Node.js/Express/TypeORM.

## Технологии

- **Node.js** - среда выполнения
- **Express.js** - веб-фреймворк
- **TypeORM** - ORM для работы с базой данных
- **SQLite** - база данных
- **TypeScript** - типизированный JavaScript
- **JWT** - аутентификация
- **bcryptjs** - хеширование паролей
- **multer** - загрузка файлов

## Установка

1. Установите зависимости:

```bash
npm install
```

2. Создайте файл `.env` на основе `env.example`:

```bash
cp env.example .env
```

3. Настройте переменные окружения в файле `.env`:

```env
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h
DATABASE_PATH=./database.sqlite
NODE_ENV=development
```

## Запуск

### Режим разработки

```bash
npm run dev
```

### Продакшн

```bash
npm run build
npm start
```

## API Endpoints

### Аутентификация

- `POST /api/auth/login` - Вход в систему

### Пользователи

- `GET /api/users` - Получить всех пользователей
- `GET /api/users/agents` - Получить агентов
- `GET /api/users/clients` - Получить клиентов
- `GET /api/users/:id` - Получить пользователя по ID
- `POST /api/users` - Создать пользователя (требует аутентификации)
- `PUT /api/users/:id` - Обновить пользователя (требует аутентификации)
- `DELETE /api/users/:id` - Удалить пользователя (требует аутентификации)

### Апартаменты

- `GET /api/apartments` - Получить все апартаменты
- `GET /api/apartments/:id` - Получить апартамент по ID
- `POST /api/apartments` - Создать апартамент (требует аутентификации)
- `PUT /api/apartments/:id` - Обновить апартамент (требует аутентификации)
- `DELETE /api/apartments/:id` - Удалить апартамент (требует аутентификации)

### Отели

- `GET /api/buildings` - Получить все отели
- `GET /api/buildings/:id` - Получить отель по ID
- `POST /api/buildings` - Создать отель (требует аутентификации)
- `PUT /api/buildings/:id` - Обновить отель (требует аутентификации)
- `DELETE /api/buildings/:id` - Удалить отель (требует аутентификации)

### Сервисы

- `GET /api/contracts` - Получить все сервисы
- `GET /api/contracts/:id` - Получить сервис по ID
- `POST /api/contracts` - Создать сервис (требует аутентификации)
- `PUT /api/contracts/:id` - Обновить сервис (требует аутентификации)
- `DELETE /api/contracts/:id` - Удалить сервис (требует аутентификации)

## Аутентификация

Для защищенных маршрутов необходимо передавать JWT токен в заголовке:

```
Authorization: Bearer <your-jwt-token>
```

## Структура проекта

```
src/
├── config/
│   └── database.ts          # Конфигурация базы данных
├── controllers/
│   ├── userController.ts    # Контроллер пользователей
│   ├── apartmentController.ts # Контроллер апартаментов
│   ├── hotelController.ts # Контроллер отелей
│   └── serviceController.ts # Контроллер сервисов
├── entities/
│   ├── User.ts             # Сущность пользователя
│   ├── Apartment.ts        # Сущность апартаментов
│   ├── Hotel.ts         # Сущность отеля
│   └── Service.ts         # Сущность сервиса
├── middleware/
│   └── auth.ts             # Middleware аутентификации
├── routes/
│   ├── auth.ts             # Маршруты аутентификации
│   ├── users.ts            # Маршруты пользователей
│   ├── apartments.ts       # Маршруты апартаментов
│   ├── hotel.ts        # Маршруты отеля
│   └── service.ts        # Маршруты сервиса
└── index.ts                # Основной файл приложения
```

## Миграции

База данных автоматически синхронизируется при запуске (synchronize: true). В продакшене рекомендуется использовать миграции.

## Загрузка файлов

Статические файлы (изображения) доступны по адресу `/uploads/`.

## Health Check

- `GET /health` - Проверка состояния сервера
