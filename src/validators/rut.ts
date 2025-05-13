export const formatRut = (value: string): string => {
    let cleaned = value.replace(/[.-]/g, '');
    cleaned = cleaned.replace(/[^0-9kK]/g, '');

    if (cleaned.length <= 1) return cleaned;

    const dv = cleaned.slice(-1);
    const numbers = cleaned.slice(0, -1);

    let formatted = '';
    for (let i = numbers.length - 1, j = 0; i >= 0; i--, j++) {
        if (j % 3 === 0 && j !== 0) formatted = '.' + formatted;
        formatted = numbers[i] + formatted;
    }

    return `${formatted}-${dv.toUpperCase()}`;
};

export const validateRut = (rut: string): boolean => {
    if (!/^[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]$/.test(rut)) return false;

    const cleanRut = rut.replace(/[.-]/g, '');
    const dv = cleanRut.slice(-1).toUpperCase();
    const numbers = cleanRut.slice(0, -1);

    let sum = 0;
    let multiplier = 2;

    for (let i = numbers.length - 1; i >= 0; i--) {
        sum += parseInt(numbers[i]) * multiplier;
        multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const expectedDv = 11 - (sum % 11);
    const calculatedDv = expectedDv === 11 ? '0' : expectedDv === 10 ? 'K' : expectedDv.toString();

    return dv === calculatedDv;
};

