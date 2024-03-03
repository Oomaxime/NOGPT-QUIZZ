const body = document.querySelector('body');


document.addEventListener('visibilitychange', () => {
    document.title = document.visibilityState;
})