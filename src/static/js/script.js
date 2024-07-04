document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector("form.form");
    const infomsg = document.querySelector(".info");
    const spam_true_box = document.querySelector(".spam-true");
    const spam_false_box = document.querySelector(".spam-false");

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        formData.set('content', formData.get('content').trim());

        if (formData.get('content').length === 0) {
            alert("Please enter text to be checked");
            return;
        }

        const response = await fetch('/', {
            method: 'POST',
            body: formData
        });
        
        const responseData = await response.json();
        const is_spam = responseData.is_spam;

        infomsg.classList.add("hide");
        if(is_spam) {
            spam_true_box.classList.remove("hide");
            spam_false_box.classList.add("hide");
        } else {
            spam_true_box.classList.add("hide");
            spam_false_box.classList.remove("hide");
        }
    });

    form.addEventListener("reset", () => {
        spam_true_box.classList.add("hide");
        spam_false_box.classList.add("hide");
        infomsg.classList.remove("hide");
    });
});