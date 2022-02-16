

export const required = (value: any) => (value ? undefined : 'Required')
export const mustBeEmail = (value: string) => {

    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const result = re.test(String(value).toLowerCase());
    return (result === true ? undefined : 'Must be a valid email address ' + value)
}
export const passwordValidation = (value: string) => {

    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i;
    const result = re.test(String(value).toLowerCase());
    return (result === true ? undefined : 'Must contain Special Character and number')
}


export const minLength = (min: number) => (value: any) => value.length >= min ? undefined : `Should be longer than ${min}`

// export const mustBeURLSafe= (value:string) =>{

//     const re = /^[a-zA-Z0-9_-]*$/i;
//     const result =  re.test(String(value).toLowerCase());
//     return (result===true ? undefined: 'Must be a url safe string' )
// }

// export const mustBeNumber = (value:any)  => (isNaN(value) ? 'Must be a number' : undefined)
// export const minValue = (min:number) => (value:any)  => isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`
// export const maxValue = (max:number) => (value:any)  => isNaN(value) || value <= max ? undefined : `Should be less than ${max}`
export const composeValidators = (...validators: any[]) => (value: any) => validators.reduce((error, validator) => error || validator(value), undefined)
