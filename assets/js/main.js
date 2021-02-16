class Validaform {
  constructor() {
    this.form = document.querySelector('.form');
    this.events();
  }

  events() {
    this.form.addEventListener('submit', e => {
      this.handleSubmit(e);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const InvalidFields = this.FieldsAreInvalid();
    const InvalidPasswords = this.passswordAreInvalid();

    if(InvalidFields && InvalidPasswords) {
      alert('Formulário enviado.');
      this.form.submit();
    }
  }

  passswordAreInvalid() {
    let valid = true;

    const password = this.form.querySelector('.password');
    const repeatpassword = this.form.querySelector('.repeat-password');

    if(password.value !== repeatpassword.value) {
      valid = false;
      this.criaErro(password, 'Campos password e repetir senha precisar ser iguais.');
      this.criaErro(repeatpassword, 'Campos senha e repetir senha precisar ser iguais.');
    }

    if(password.value.length < 6 || password.value.length > 12) {
      valid = false;
      this.criaErro(password, 'password precisa estar entre 6 e 12 caracteres.');
    }

    return valid;
  }

  FieldsAreInvalid() {
    let valid = true;

    for(let errorText of this.form.querySelectorAll('.error-text')) {
      errorText.remove();
    }

    for(let field of this.form.querySelectorAll('.valid')) {
      const label = field.previousElementSibling.innerText;

      if(!field.value) {
        this.criaErro(field, `Campo "${label}" não pode estar em branco.`);
        valid = false;
      }

      if(field.classList.contains('cpf')) {
        if(!this.validaCPF(field)) valid = false;
      }

      if(field.classList.contains('user')) {
        if(!this.validUser(field)) valid = false;
      }

    }

    return valid;
  }

  validUser(field) {
    const user = field.value;
    let valid = true;

    if(user.length < 3 || user.length > 12) {
      this.criaErro(field, 'Usuário precisa ter entre 3 e 12 caracteres.');
      valid = false;
    }

    if(!user.match(/^[a-zA-Z0-9]+$/g)) {
      this.criaErro(field, 'Nome de usuário precisar conter apenas letras e/ou números.');
      valid = false;
    }

    return valid;
  }

  validaCPF(field) {
    const cpf = new ValidaCPF(field.value);

    if(!cpf.valida()) {
      this.criaErro(field, 'CPF inválido.');
      return false;
    }

    return true;
  }

  criaErro(field, msg) {
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('error-text');
    field.insertAdjacentElement('afterend', div);
  }
}

const valida = new Validaform();
