const invalidEmails = [
    'gmail.con',
    'gmail.con.br',
    'gmail.co',
    'outlook.con',
    'outlook.co',
    'outlook.com.b',
    'outlook.co.br',
    'outlook.con.br',
    'hotmail.con',
    'hotmail.co',
    'hotmail.com.b',
    'hotmail.co.br',
    'hotmail.con.br',
];

const invalidDomains = [
    'hotmeil',
    'hotmeiu',
    'rotmail',
    'gmeil',
    'gmeiu',
    'gmaiu',
    'altlook',
    'autlook',
    'outluk',
    'autluk',
    'outluc',
    'autluc',
];

export const validateEmail = (email: string) => {
    if (!email) return false;
    
    const sufixDomain = email.split('@')[1];

    const emailsTested = invalidEmails.map((invalidemail) => {
        return sufixDomain === invalidemail;
    });

    const DomainsTested = invalidDomains.map((invalidemail) => {
        return sufixDomain.includes(invalidemail);
    });
    if (emailsTested.includes(true) || DomainsTested.includes(true)) return false;

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{1,3}$/;

    return regexEmail.test(email);
};
