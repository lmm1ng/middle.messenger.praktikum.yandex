import Handlebars from 'handlebars'
import template from './chatMessages.tmpl'

const store = {
    chat: {
        withWhom: 'Витя',
        messages: [
            {
                day: '7 Августа',
                array: [
                    {
                        text: 'Да уж',
                        date: '7:20',
                        isMy: true,
                        read: true
                    },
                    {
                        text: 'Перебрали мы вчера...',
                        date: '7:20',
                        isMy: false,
                        read: false
                    },
                ]
            },
            {
                day: '6 Августа',
                array: [
                    {
                        text: 'Для современного мира существующая теория играет определяющее значение для своевременного выполнения сверхзадачи. Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта: начало повседневной работы по формированию позиции прекрасно подходит для реализации системы обучения кадров, соответствующей насущным потребностям.',
                        date: '7:20',
                        isMy: true,
                        read: true
                    },
                    {
                        text: 'Также как граница обучения кадров позволяет выполнить важные задания по разработке анализа существующих паттернов поведения. Господа, новая модель организационной деятельности требует анализа поэтапного и последовательного развития общества.',
                        date: '7:20',
                        isMy: false,
                        read: false
                    },
                ]
            },
        ]
    }
}

export default () => Handlebars.compile(template)({title: store.chat.withWhom, messages: store.chat.messages})
