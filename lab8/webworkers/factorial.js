//kiedy zostanie przesłana wiadomość (postMessage) wykona się to
self.addEventListener(
    "message",
    function (e) {
        if (e.data < 0) {
            postMessage("nieprawidlowe dane");
        } else {
            let res = 1;
            let i = e.data;
            while (i > 1) {
                res *= i;
                i--;
            }
            postMessage(res);
        }
    },
    false
);
