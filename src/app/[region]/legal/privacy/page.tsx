export default function PrivacyPage() {
    return (
        <div className="min-h-screen pt-32 pb-16 px-4 md:px-8">
            <div className="max-w-4xl mx-auto w-full">
                <div className="glass-panel p-8 md:p-12 border border-white/5 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10" />

                    <h1 className="text-3xl md:text-4xl font-black text-white mb-8 tracking-tight">
                        Политика конфиденциальности
                    </h1>

                    <div className="space-y-6 text-sm md:text-base leading-relaxed text-gray-300">
                        <p>
                            Настоящая Политика конфиденциальности описывает порядок обработки и защиты информации о физических лицах, пользующихся сервисами сайта HowieCheats.
                        </p>

                        <h2 className="text-xl font-bold text-white mt-8 mb-4">1. Сбор данных</h2>
                        <p>
                            1.1. Мы собираем минимально необходимый набор данных для выполнения заказа: адрес электронной почты.
                            <br />
                            1.2. Мы также можем собирать технические данные (IP-адрес, тип браузера) для обеспечения безопасности и улучшения работы сервиса.
                        </p>

                        <h2 className="text-xl font-bold text-white mt-8 mb-4">2. Использование данных</h2>
                        <div className="mb-4">
                            2.1. Собранные данные используются исключительно для:
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>Обработки и доставки заказов;</li>
                                <li>Оказания технической поддержки;</li>
                                <li>Информирования о важных обновлениях сервиса.</li>
                            </ul>
                        </div>

                        <h2 className="text-xl font-bold text-white mt-8 mb-4">3. Защита данных</h2>
                        <p>
                            3.1. Мы принимаем все необходимые меры для защиты персональных данных от неправомерного доступа.
                            <br />
                            3.2. Мы не передаем персональные данные третьим лицам, за исключением случаев, предусмотренных законодательством.
                        </p>

                        <h2 className="text-xl font-bold text-white mt-8 mb-4">4. Согласие</h2>
                        <p>
                            4.1. Оформляя заказ на сайте, Пользователь дает свое согласие на обработку своих персональных данных в соответствии с настоящей Политикой.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
