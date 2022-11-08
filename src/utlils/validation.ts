export const validate = (type: string, value: string): boolean => {
  switch (type) {
    case 'first_name':
    case 'second_name':
      return /[A-Z][a-z-]+|[А-Я][а-я-]+/g.test(value);
    case 'login':
      return /(?:(?!\d+$)[\da-zA-Z_-]+){3,20}/g.test(value);
    case 'email':
      return /\w+@\w+\.\w+/g.test(value);
    case 'password':
    case 'oldPassword':
    case 'newPassword':
      return /^(?=.*\d)^(?=.*[A-Z]).{8,40}/g.test(value);
    case 'phone':
      return /^\+?\d{10,15}$/g.test(value);
    default:
      return true;
  }
};

export const validateInput = (e: Event | HTMLInputElement | HTMLTextAreaElement) => {
  const input: HTMLInputElement | HTMLTextAreaElement = e instanceof Event
    ? e.target as HTMLInputElement : e;
  if (!validate(input.name, input.value)) {
    input.classList.add('invalid');
    return false;
  }
  input.classList.remove('invalid');
  return true;
};
