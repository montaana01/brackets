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
                // если скобка может быть как открывающей, так и закрывающей
                if (open === close) {
                    if (waitingList.length > 0 && waitingList[waitingList.length - 1] === bracket) {
                        waitingList.pop();
                    } else {
                        waitingList.push(bracket);
                    }
                } else {
                    // все открывающиеся добавляем в лист ожидания
                    waitingList.push(close);
                }
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
