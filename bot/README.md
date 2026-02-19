# HowieCheats Telegram Bot

Этот бот предназначен для уведомления администрации о действиях на сайте.

## Функции
- Уведомление о создании нового инвойса на оплату (Checkout Initiated).
- Уведомление об успешном подтверждении платежа (Payment Successful).

## Настройка
1. Токен бота: `8527352646:AAGIqxhvz9xZ9Vfr8LUJhP7ptNNNaOszxpY`
2. Переменные окружения (Vercel):
   - `TELEGRAM_BOT_TOKEN`: Токен вашего бота.
   - `TELEGRAM_CHAT_ID`: ID чата, куда приходят уведомления.

## Технические детали
Интеграция реализована через:
- `src/lib/telegram.ts`: Центральная утилита для отправки сообщений.
- `src/app/api/checkout/oxapay/route.ts`: Отправка уведомления при начале оплаты.
- `src/app/api/checkout/oxapay/webhook/route.ts`: Прием данных от OxaPay и уведомление об успехе.
