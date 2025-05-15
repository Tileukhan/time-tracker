# ⏱️ **Time Tracking App**
_Приложение для учета рабочего времени и управления отсутствиями_

## 📋 **Описание проекта**

**Time Tracking App** — это веб-приложение для сотрудников, менеджеров и администраторов. Оно помогает фиксировать рабочие часы, оформлять заявки на отсутствие, а также отслеживать статистику работы команды.

## 🚀 **Технологии**

- **Frontend:** _React, React Router, Recharts, TailwindCSS_
- **State Management:** _useState, useEffect, Context API_
- **API-слой:** _Node.js / Express (заглушки)_
- **Возможные БД:** _MongoDB, PostgreSQL_
- **Инструменты:** _Axios, localStorage, Postman_

## 🧩 **Структура проекта**
src/
├── components/      // Navbar, Forms, Tables, Filters
├── pages/           // Employee, Manager, Admin, Login
├── api/             // Функции для работы с API
├── App.tsx          // Роутинг и логика доступа
└── index.tsx        // Точка входа приложения
## 📦 **Установка**
<pre>```bash 
# Установка зависимостей
npm install
# Запуск приложения в режиме разработки
npm run dev ``` </pre>
## 🗺️ Роуты и роли
Роль	|Страница	| URL
Гость	|Логин	  |/
Сотрудник|	Учёт рабочего времени	|/employee/worktime
Сотрудник|	Подача заявок на отсутствие|	/employee/absence
Сотрудник|	История заявок	|/employee/history
Менеджер|	Управление заявками|	/manager/absences
Менеджер|	Просмотр рабочего времени|	/manager/worktimes
Админ	|Дашборд со статистикой	|/admin/dashboard
