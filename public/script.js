document.addEventListener('DOMContentLoaded', function() {
    var toast = document.getElementById('toast-default');
    if (toast) {
        setTimeout(function() {
            toast.style.display = 'none';
        }, 5000);

        var closeBtn = toast.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                toast.style.display = 'none';
            });
        }
    }
});
