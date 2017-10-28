'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
getEmitter.isStar = false;
module.exports = getEmitter;

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    return {
        subscriptions: [],

        /**
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @returns {Object}
         */
        on: function (event, context, handler) {
            this.subscriptions.push({
                event: event,
                context: context,
                handler: handler
            });

            return this;
        },

        /**
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         * @returns {Object}
         */
        off: function (event, context) {
            this.subscriptions.forEach(function (subscription, i) {
                let subscriptionEvent = subscription.event;
                let eventIndex = subscriptionEvent.indexOf(event);
                let nextSymbol = subscriptionEvent[eventIndex + event.length];

                if (context === subscription.context && eventIndex === 0 &&
                    (nextSymbol === '.' || nextSymbol === undefined)) {
                    delete this.subscriptions[i];
                }
            }, this);

            return this;
        },

        /**
         * Уведомить о событии
         * @param {String} event
         * @returns {Object}
         */
        emit: function (event) {
            let eventParts = event.split('.');
            let events = [];

            for (let i = 0; i < eventParts.length; i++) {
                let newEvent = eventParts.slice(0, i + 1).join('.');
                events.unshift(newEvent);
            }

            events.forEach(function (e) {
                this.subscriptions.forEach(function (subscription) {
                    if (subscription.event === e) {
                        subscription.handler.call(subscription.context);
                    }
                });
            }, this);

            return this;
        },

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         */
        several: function (event, context, handler, times) {
            console.info(event, context, handler, times);
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         */
        through: function (event, context, handler, frequency) {
            console.info(event, context, handler, frequency);
        }
    };
}
