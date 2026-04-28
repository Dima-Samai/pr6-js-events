const form = document.getElementById('contactForm');
const fields = ['name', 'email', 'phone', 'subject', 'message'];
const progress = document.getElementById('progressBar');
const submitBtn = document.getElementById('submitBtn');

const validators = {
    name: (val) => /^[a-zA-Zа-яА-ЯіїєґІЇЄҐ']{2,}$/.test(val),
    email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    phone: (val) => /^\+380\d{9}$/.test(val),
    subject: (val) => val !== "",
    message: (val) => val.length >= 20 && val.length <= 500
};

// Debounce функція
function debounce(func, delay = 300) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

const updateUI = () => {
    let validCount = 0;
    fields.forEach(id => {
        const field = document.getElementById(id);
        const parent = field.closest('.form-group');
        const isValid = validators[id](field.value);
        
        if (field.value !== "") {
            parent.classList.toggle('valid', isValid);
            parent.classList.toggle('invalid', !isValid);
        }
        if (isValid) validCount++;
    });

    const percent = Math.round((validCount / fields.length) * 100);
    progress.style.width = `${percent}%`;
    progress.textContent = `${percent}%`;
    submitBtn.disabled = validCount !== fields.length;
};

// Event Delegation
form.addEventListener('input', debounce((e) => {
    if (e.target.id === 'message') {
        document.getElementById('charCounter').textContent = `${e.target.value.length} / 500`;
    }
    updateUI();
}));

form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBtn.textContent = "Надсилаємо...";
    setTimeout(() => {
        form.reset();
        updateUI();
        document.getElementById('successMsg').classList.remove('hidden');
        submitBtn.textContent = "Відправити";
    }, 1500);
});