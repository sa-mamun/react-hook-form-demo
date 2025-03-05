import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
    username: string;
    email: string;
    channel: string;
    social: {
        twitter: string;
        facebook: string;
    };
    phoneNumbers: string[];
    phNumbers: {
        number: string;
    }[];
};

const YouTubeForm = () => {

    const form = useForm<FormValues>({
        defaultValues: {
            username: "Samir",
            email: "samir@gmail.com",
            channel: "SamTech",
            social: {
                twitter: "samir_twitter",
                facebook: "samir_facebook"
            },
            phoneNumbers: ["", ""],
            phNumbers: [{ number: ""}]
        }
    });
    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;
    const { fields, append, remove } = useFieldArray({
        name: "phNumbers",
        control
    })

    const onSubmit = (data : FormValues) => {
        console.log("Form Submitted", data);
    }

    return (
        <div>
            <h1>YouTube Form</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" {...register("username", {
                    required: {
                        value: true,
                        message: 'Username is required'
                    }
                })} />
                <p className="error">{errors.username?.message}</p>

                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" {...register("email", {
                    required: 'Email is required',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: 'Invalid email address'
                    },
                    validate: {
                        notAdmin: (fieldValue) => {
                            return (
                                fieldValue != "admin@example.com" || 
                                "Enter a different email address"
                            );
                        },
                        notBlackListed: (fieldValue) => {
                            return (
                                !fieldValue.endsWith("baddomain.com") || "This domain is not supported"
                            );
                        }
                    }
                })} />
                <p className="error">{errors.email?.message}</p>

                <label htmlFor="channel">Channel</label>
                <input type="text" id="channel" {...register("channel", {
                    required: 'Channel is required'
                })} />
                <p className="error">{errors.channel?.message}</p>

                <label htmlFor="twitter">Twitter</label>
                <input type="text" id="twitter" {...register("social.twitter")} />

                <label htmlFor="facebook">Facebook</label>
                <input type="text" id="facebook" {...register("social.facebook")} />

                <label htmlFor="primary-phone">Primary Phone Number</label>
                <input type="text" id="primary-phone" {...register("phoneNumbers.0")} />

                <label htmlFor="secondary-phone">Secondary Phone Number</label>
                <input type="text" id="secondary-phone" {...register("phoneNumbers.1")} />

                <div>
                    <label htmlFor="phoneNumbers">Phone Numbers</label>
                    <ul>
                        {fields.map((field, index) => (
                            <li key={field.id}>
                                <input type="text" {...register(`phNumbers.${index}.number` as const)} />
                                <button type="button" onClick={() => remove(index)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <button type="button" onClick={() => append({ number: "" })}>Add Phone Number</button>
                </div> <br />

                <button>Submit</button>
            </form>
            <DevTool control={control} />
        </div>
    );
};

export default YouTubeForm;