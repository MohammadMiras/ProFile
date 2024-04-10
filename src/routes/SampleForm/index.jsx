// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unused-vars */
import { $, component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { InitialValues, SubmitHandler } from '@modular-forms/qwik';
import { formAction$, useForm, valiForm$ } from '@modular-forms/qwik';
import { email, minLength, object, string } from 'valibot';

const LoginSchema = object({
    email: string([
        minLength(1, 'Please enter your email.'),
        email('The email address is badly formatted.'),
    ]),
    password: string([
        minLength(1, 'Please enter your password.'),
        minLength(8, 'Your password must have 8 characters or more.'),
    ]),
});


export const useFormLoader = routeLoader$(() => ({
    email: 'SDFSDF',
    password: '',
}));

export const useFormAction = formAction$((values) => {
    // Runs on server
}, valiForm$(LoginSchema));

export default component$(() => {
    const [loginForm, { Form, Field }] = useForm({
        loader: useFormLoader(),
        action: useFormAction(),
        validate: valiForm$(LoginSchema),
    });

    const handleSubmit = $((values, event) => {
        // Runs on client
        console.log(values);
    });

    return (
        <Form onSubmit$={handleSubmit}>
            <Field name="email">
                {(field, props) => (
                    <div>
                        <input {...props} type="email" value={field.value} />
                        {field.error && <div>{field.error}</div>}
                    </div>
                )}
            </Field>
            <Field name="password">
                {(field, props) => (
                    <div>
                        <input {...props} type="password" value={field.value} />
                        {field.error && <div>{field.error}</div>}
                    </div>
                )}
            </Field>
            <button type="submit">Login</button>
        </Form>
    );
});