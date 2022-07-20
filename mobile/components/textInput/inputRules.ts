import ValidationRules from "../../constants/validations";

export const EmailRules = {
    pattern: {
        value: ValidationRules.EMAIL_REGEX,
        message: "Formato incorrecto"
    },
    maxHeight: {
        value: 40,
        message: "Maximo 40 caracteres"
    }
}

export const PasswordRules = {
    minLength:{
        value: 8,
        message: "La contraseña debe tener al menos 8 caracteres",
    } ,
    maxLength: {
        value: 40,
        message: "Maximo 40 caracteres"
    }
}

export const OnlyLettersRules = {
    pattern: {
        value: ValidationRules.ONLY_LETTERS_REGEX,
        message: "Se aceptan solamente letras."
    }
}

export const DateRules = {
    pattern: {
        value: ValidationRules.DATE_REGEX,
        message: "Fecha inválida"
    }
}