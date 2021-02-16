//kiedy zostanie przesłana wiadomość (postMessage) wykona się to
self.addEventListener(
    "message",
    function (e) {
        if (e.data < 0) {
            postMessage("nieprawidlowe dane");
        } else {
            let a = 0;
            let b = 1;
            for (let i = 0; i < e.data; i++) {
                setTimeout(function () {
                    postMessage(b);
                    let next = a + b;
                    a = b;
                    b = next;
                }, i * 500);
            }
        }
    },
    false
);
