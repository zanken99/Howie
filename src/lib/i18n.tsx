"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { settings } from "@/lib/products-data";

export type Region = "ru" | "world";
type Language = "ru" | "en";

interface I18nContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    formatPrice: (amountInRub: number, exactUsd?: number) => string;
    exchangeRate: number;
    region: Region;
}

const translations: Record<Language, Record<string, string>> = {
    ru: {
        // Header
        "nav.home": "Главная",
        "nav.catalog": "КАТАЛОГ",
        "nav.guarantees": "ГАРАНТИИ",
        "nav.faq": "FAQ",
        "nav.support": "ПОДДЕРЖКА",
        "auth.login": "Войти",
        "auth.register": "Регистрация",
        "auth.logout": "Выйти",
        "auth.admin": "Админ",

        // Home
        "hero.title": "ПРИВАТНЫЕ ЧИТЫ",
        "hero.subtitle": "ДЛЯ ТВОИХ ЛЮБИМЫХ ИГР",
        "hero.desc": "Мы предлагаем только надежный и проверенный софт. Минимальный шанс бана, регулярные обновления и круглосуточная поддержка.",
        "hero.cta": "ПЕРЕЙТИ В КАТАЛОГ",
        "rec.title": "РЕКОМЕНДУЕМ",
        "rec.badge": "Рекомендуем",
        "rec.features": "Функционал",
        "rec.inspect": "Подробнее",
        "cat.title": "КАТАЛОГ ИГР",
        "cat.product": "Товар",
        "cat.products": "Товаров",
        "dur.day_1": "День",
        "dur.day_few": "Дня",
        "dur.day_many": "Дней",
        "dur.week": "Неделя",
        "dur.month": "Месяц",
        "dur.lifetime": "Навсегда",

        // Game Page
        "game.back": "Назад к играм",
        "game.cheats": "ЧИТЫ",
        "game.desc": "Приватный софт уровня премиум для",

        // Product Card/Content
        "prod.from": "от",
        "prod.details": "Подробнее",
        "prod.desc": "Описание",
        "prod.func": "Функционал",
        "prod.sys_req": "Системные требования",
        "prod.buy": "Купить сейчас",
        "prod.secure": "Безопасная оплата без комиссий",
        "prod.choose_tier": "Выберите тариф",
        "prod.selected_tier": "Вы выбрали тариф:",
        "prod.instant_delivery": "Мгновенная доставка на почту сразу после оплаты.",

        // Footer
        "footer.desc": "Премиум реселлер приватных читов. Безопасно, надёжно, всегда обновлено.",
        "footer.catalog": "Каталог",
        "footer.all_products": "Все товары",
        "footer.support": "Поддержка",
        "footer.account": "Аккаунт",
        "footer.cabinet": "Личный кабинет",
        "footer.rights": "Все права защищены.",
        "footer.offer": "Оферта",
        "footer.privacy": "Конфиденциальность",

        // Home sections
        "home.featured_games": "АКТУАЛЬНЫЕ ИГРЫ",
        "home.reviews": "ПОСЛЕДНИЕ ОТЗЫВЫ",
        "home.blog": "БЛОГ И НОВОСТИ",
        "home.contacts": "Контакты",
        "home.privacy": "Политика конфиденциальности",
        "home.terms": "Условия использования",

        // Checkout
        "checkout.title": "Оплата",
        "checkout.product": "Товар:",
        "checkout.sub": "Подписка:",
        "checkout.type": "Способ выдачи",
        "checkout.auto": "Автовыдача",
        "checkout.payment_method": "Способ оплаты",
        "checkout.btc": "Bitcoin",
        "checkout.ltc": "Litecoin",
        "checkout.crypto": "Крипта",
        "checkout.lzt": "LZT Market (Карты, СБП, и др.)",
        "checkout.ton": "TON",
        "checkout.usdt": "USDT (TRC-20)",
        "checkout.email": "Почта",
        "checkout.email_placeholder": "Введите адрес электронной почты",
        "checkout.email_confirm": "Почта повторно (Только ручной ввод)",
        "checkout.email_hint": "На эту почту придет ваш ключ и инструкция.",
        "checkout.promo_q": "У вас есть промо-код?",
        "checkout.promo_placeholder": "Промо-код",
        "checkout.apply": "Применить",
        "checkout.quantity": "Количество товара",
        "checkout.price": "Цена",
        "checkout.commission": "Комиссия платежной системы",
        "checkout.total": "К оплате:",
        "checkout.agree_terms": "Принять пользовательское соглашение",
        "checkout.agree_data": "Согласие на обработку персональных данных",
        "checkout.continue": "Продолжить",
        "checkout.cancel": "Отказаться от оплаты и вернуться в магазин",
        // FAQ
        "faq.q1": "Как происходит доставка?",
        "faq.a1": "После оплаты вы моментально получаете ключ активации и подробную инструкцию по установке на указанный email.",
        "faq.q2": "Какие способы оплаты доступны?",
        "faq.a2": "Мы принимаем СБП, российские карты, криптовалюту и зарубежные карты.",
        "faq.q3": "Что делать если чит обнаружен?",
        "faq.a3": "Мы моментально обновляем софт после детекта. Если статус 'Detected' — подождите обновления.",
        "faq.q4": "Безопасно ли использовать?",
        "faq.a4": "Все наши продукты проходят тестирование перед выпуском. Однако 100% гарантии от бана не существует.",
        "faq.q5": "Есть ли поддержка?",
        "faq.a5": "Да, наша поддержка работает 24/7 через Telegram и Discord. Среднее время ответа — 15 минут.",
        "faq.q6": "Можно ли вернуть деньги?",
        "faq.a6": "Возврат средств невозможен ни при каких обстоятельствах.",
        "faq.q7": "На каких ОС работает?",
        "faq.a7": "Большинство продуктов поддерживают Windows 10/11 (64-bit). Конкретные требования указаны на странице каждого товара.",

        // Guarantees Page
        "guarantee.title": "Наши Гарантии",
        "guarantee.subtitle": "Мы дорожим своей репутацией и гарантируем качество предоставляемых услуг.",
        "guarantee.contact_us": "По вопросам сотрудничества или любой информации вы можете связаться с нами по следующим контактам:",
        "guarantee.reliability.title": "Надежность",
        "guarantee.reliability.desc": "Мы всегда ответим на ваши вопросы и поможем определиться с выбором того или иного товара. Просто пиши :)",
        "guarantee.reviews.title": "Отзывы",
        "guarantee.reviews.desc": "У нас есть открытые сообщества в Discord и Telegram, где вы можете найти отзывы наших клиентов. Реальные люди, реальное мнение.",
        "guarantee.support.title": "Техническая поддержка",
        "guarantee.support.desc": "Мы предоставляем БЕСПЛАТНУЮ техническую поддержку нашим пользователям. Мы можем настроить программу за вас через AnyDesk/TeamViewer.",
        "guarantee.oplata.title": "Oplata.info",
        "guarantee.oplata.desc": "Вы всегда можете оставить отзыв на oplata.info. Мы работаем через проверенные площадки и дорожим каждым клиентом.",
    },
    en: {
        // ... (existing keys)
        // Header
        "nav.home": "Home",
        "nav.catalog": "CATALOG",
        "nav.guarantees": "GUARANTEE",
        "nav.faq": "FAQ",
        "nav.support": "SUPPORT",
        "auth.login": "Log In",
        "auth.register": "Sign Up",
        "auth.logout": "Log Out",
        "auth.admin": "Admin",

        "auth.login_title": "Login to Account",
        "auth.register_title": "Create Account",
        "auth.no_account": "No account?",
        "auth.has_account": "Already have an account?",
        "auth.email": "Email",
        "auth.password": "Password",
        "auth.username": "Username",
        "auth.email_placeholder": "you@email.com",
        "auth.password_placeholder": "••••••••",
        "auth.password_min": "Minimum 6 characters",
        "auth.username_placeholder": "username",
        "auth.submit_login": "Log In",
        "auth.submit_register": "Sign Up",
        "auth.loading_login": "Logging in...",
        "auth.loading_register": "Creating...",
        "auth.error_login": "Login failed",
        "auth.error_register": "Registration failed",
        "auth.error_network": "Network error",
        "hero.desc": "We offer only reliable and tested software. Minimal ban chance, regular updates, and 24/7 support.",
        "hero.cta": "GO TO CATALOG",
        "rec.title": "RECOMMENDED",
        "rec.badge": "Recommended",
        "rec.features": "Features",
        "rec.inspect": "Inspect Product",
        "cat.title": "GAME CATALOG",
        "cat.product": "Product",
        "cat.products": "Products",
        "dur.day_1": "Day",
        "dur.day_few": "Days",
        "dur.day_many": "Days",
        "dur.week": "Week",
        "dur.month": "Month",
        "dur.lifetime": "Lifetime",

        // Game Page
        "game.back": "Back to Games",
        "game.cheats": "CHEATS",
        "game.desc": "Premium undetected software for",

        // Product Card/Content
        "prod.from": "from",
        "prod.details": "Details",
        "prod.desc": "Description",
        "prod.func": "Features",
        "prod.sys_req": "System Requirements",
        "prod.buy": "Buy Now",
        "prod.secure": "Secure payment, no fees",
        "prod.choose_tier": "Choose a plan",
        "prod.selected_tier": "Selected plan:",
        "prod.instant_delivery": "Instant delivery to email after payment.",

        // Footer
        "footer.desc": "Premium reseller of private cheats. Safe, reliable, always updated.",
        "footer.catalog": "Catalog",
        "footer.all_products": "All Products",
        "footer.support": "Support",
        "footer.account": "Account",
        "footer.cabinet": "Dashboard",
        "footer.rights": "All rights reserved.",
        "footer.offer": "Terms of Service",
        "footer.privacy": "Privacy Policy",

        // Home sections
        "home.featured_games": "FEATURED GAMES",
        "home.reviews": "LATEST REVIEWS",
        "home.blog": "BLOG & NEWS",
        "home.contacts": "Contacts",
        "home.privacy": "Privacy Policy",
        "home.terms": "Terms of Use",

        // Checkout
        "checkout.title": "Checkout",
        "checkout.product": "Product:",
        "checkout.sub": "Subscription:",
        "checkout.type": "Delivery Type",
        "checkout.auto": "Auto-delivery",
        "checkout.payment_method": "Payment Method",
        "checkout.btc": "Bitcoin",
        "checkout.ltc": "Litecoin",
        "checkout.crypto": "Crypto",
        "checkout.lzt": "LZT Market (Cards, SBP, etc.)",
        "checkout.ton": "TON",
        "checkout.usdt": "USDT (TRC-20)",
        "checkout.email": "Email",
        "checkout.email_placeholder": "Enter your email address",
        "checkout.email_confirm": "Confirm Email (Manual entry only)",
        "checkout.email_hint": "Your key and instructions will be sent here.",
        "checkout.promo_q": "Do you have a promo code?",
        "checkout.promo_placeholder": "Promo code",
        "checkout.apply": "Apply",
        "checkout.quantity": "Quantity",
        "checkout.price": "Price",
        "checkout.commission": "System Fee",
        "checkout.methods_unavailable": "Payment methods are currently unavailable",
        "checkout.methods_unavailable_msg": "Payment systems are under maintenance. Please contact support.",
        "checkout.total": "Total:",
        "checkout.agree_terms": "Accept User Agreement",
        "checkout.agree_data": "Consent to personal data processing",
        "checkout.continue": "Continue",
        "checkout.cancel": "Cancel and return to shop",
        // FAQ
        "faq.q1": "How is the delivery processed?",
        "faq.a1": "After payment, you instantly receive an activation key and detailed installation instructions to your email.",
        "faq.q2": "What payment methods are available?",
        "faq.a2": "We accept SBP, Russian cards, cryptocurrency, and foreign cards.",
        "faq.q3": "What if the cheat is detected?",
        "faq.a3": "We instantly update the software after detection. If the status is 'Detected', please wait for an update.",
        "faq.q4": "Is it safe to use?",
        "faq.a4": "All our products undergo testing before release. However, a 100% ban protection guarantee does not exist.",
        "faq.q5": "Is there support?",
        "faq.a5": "Yes, our support works 24/7 via Telegram and Discord. Average response time is 15 minutes.",
        "faq.q6": "Can I get a refund?",
        "faq.a6": "Refunds are not possible under any circumstances.",
        "faq.q7": "Which OS are supported?",
        "faq.a7": "Most products support Windows 10/11 (64-bit). Specific requirements are listed on each product page.",

        // Guarantees Page
        "guarantee.title": "Our Guarantees",
        "guarantee.subtitle": "We value our reputation and guarantee the quality of our services.",
        "guarantee.contact_us": "For cooperation or any information, you can contact us via the following links:",
        "guarantee.reliability.title": "Reliability",
        "guarantee.reliability.desc": "We will always answer your questions and help you choose the right product. Just message us :)",
        "guarantee.reviews.title": "Reviews",
        "guarantee.reviews.desc": "We have open communities in Discord and Telegram where you can find reviews from our customers. Real people, real opinions.",
        "guarantee.support.title": "Technical Support",
        "guarantee.support.desc": "We provide FREE technical support to our users. We can set up the program for you via AnyDesk/TeamViewer.",
        "guarantee.oplata.title": "Oplata.info",
        "guarantee.oplata.desc": "You can always leave a review on oplata.info. We work through trusted platforms and value every customer.",
    },
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children, region }: { children: React.ReactNode, region: string }) {
    const typedRegion = region as Region;
    const defaultLang = typedRegion === "world" ? "en" : "ru";
    const [language, setLanguage] = useState<Language>(defaultLang);
    const [exchangeRate, setExchangeRate] = useState<number>(settings?.exchangeRate ? (1 / settings.exchangeRate) : 0.0108);

    useEffect(() => {
        if (typedRegion === "world") {
            setLanguage("en");
            return;
        }
        const saved = localStorage.getItem("language") as Language;
        if (saved && (saved === "ru" || saved === "en")) {
            setLanguage(saved);
        }

        const fetchRate = async () => {
            if (settings && settings.exchangeRate && settings.exchangeRate > 0) {
                setExchangeRate(1 / settings.exchangeRate);
                return;
            }
            try {
                const res = await fetch("https://api.frankfurter.app/latest?from=RUB&to=USD");
                const data = await res.json();
                if (data.rates && data.rates.USD) {
                    setExchangeRate(data.rates.USD);
                }
            } catch (err) {
                console.error("Failed to fetch exchange rate", err);
            }
        };

        fetchRate();
    }, [typedRegion]);

    const handleSetLanguage = (lang: Language) => {
        if (typedRegion === "world") return; // Force English in /world
        setLanguage(lang);
        localStorage.setItem("language", lang);
    };

    const t = (key: string) => {
        return translations[language][key] || key;
    };

    const formatPrice = (amountInRub: number, exactUsd?: number) => {
        if (typedRegion === "world" || language === "en") {
            if (exactUsd !== undefined) {
                return `$${exactUsd.toFixed(2)}`;
            }
            const converted = amountInRub * exchangeRate;
            return `$${converted.toFixed(2)}`;
        } else {
            return `${amountInRub} ₽`;
        }
    };

    return (
        <I18nContext.Provider value={{ language, setLanguage: handleSetLanguage, t, formatPrice, exchangeRate, region: typedRegion }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n() {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error("useI18n must be used within an I18nProvider");
    }
    return context;
}
