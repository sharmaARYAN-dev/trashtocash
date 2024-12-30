import { ReactNode } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function SubmitButton({children}:{children:ReactNode})
{
    const {pending} = useFormStatus();
    return(
        <>
        <button type="submit" className="border bg-red-300 rounded-xl">
        {pending &&(
            <span> Saving....</span>
        )
        }
         {!pending &&(
            <span>    {children}</span>
        )
        }
        </button>
        </>
    );
}