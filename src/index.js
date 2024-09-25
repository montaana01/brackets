module.exports = function check(str, bracketsConfig) {
    //нужно посмотреть есть ли каждый элемент из str  в bracketsConfig
    for (let bracket of str) {
        let isInConfig = false;

        for (let [open, close] of bracketsConfig) {
            if (bracket === open || bracket === close) {
                isInConfig = true;
                break;
            }
        }
        // всё таки если нет такого в конфиге отдаем 0
        if (!isInConfig) return false;
    }

    let waitingList = [];

    for (let bracket of str) {
        let isOpening = false;

        for (let [open, close] of bracketsConfig) {
            if (bracket === open) {
                // все открывающиеся проходим и ждем закрывающую, которую кидаем в лист ожидания
                waitingList.push(close);
                isOpening = true;
                break;
            }
        }

        if (!isOpening) {
            if (waitingList.length === 0 || waitingList.pop() !== bracket) {
                return false;
            }
        }
    }

    // в самом конце лист ожидания должен быть пустой
    return waitingList.length === 0;
}
