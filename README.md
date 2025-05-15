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
| Роль        | Страница                        | URL                     |
|-------------|---------------------------------|-------------------------|
| Гость       | Логин                           | /                       |
| Сотрудник   | Учёт рабочего времени           | /employee/worktime      |
| Сотрудник   | Подача заявок на отсутствие     | /employee/absence       |
| Сотрудник   | История заявок                  | /employee/history       |
| Менеджер    | Управление заявками             | /manager/absences       |
| Менеджер    | Просмотр рабочего времени       | /manager/worktimes      |
| Админ       | Дашборд со статистикой          | /admin/dashboard        |
**🖼️ Скриншоты
 - **Login Page**
![image](https://github.com/user-attachments/assets/a91abb17-aef6-4a30-b1a0-62ba8c70d516)

 - **Employee — Worktime Page**
Форма для ввода рабочего времени сотрудником
![image](https://github.com/user-attachments/assets/eed58b1d-c26d-4c75-aff6-5009757cc2a5)

 - **Employee — Absence Page**
Форма подачи заявки на отсутствие
![image](https://github.com/user-attachments/assets/1bda588c-a84c-4a90-898d-ddaaedb2be00)

 - **Employee — History Page**
Просмотр истории заявок
![image](https://github.com/user-attachments/assets/a4d6d398-9038-4eda-ae79-d61970c1a2ce)

 - **Manager — Absences Management**
Менеджер проверяет заявки, одобряет или отклоняет
![image](https://github.com/user-attachments/assets/ee49c665-d62d-4e30-88f5-e677b9e7283c)


 - **Manager — Worktime Overview**
Менеджер видит рабочее время команды
![image](https://github.com/user-attachments/assets/295ea579-2054-4764-8e2a-c93d71900c41)

 - **Admin Dashboard — Absences Pie Chart**
Круговая диаграмма заявок по статусам
![image](https://github.com/user-attachments/assets/0f6a166c-551c-48ba-91fe-aa6ea6761417)

 - **Admin Dashboard — Worktime Line Chart**
Линейный график рабочих часов по дням
![image](https://github.com/user-attachments/assets/7adf56e0-d993-42ee-867b-3096ba5fd5bc)

 - **Admin Dashboard — Top Employees Bar Chart**
Бар-чарт по сотрудникам с наибольшим количеством часов
![image](https://github.com/user-attachments/assets/4dc2e759-83d8-4b1c-bf87-294f8f75056a)
