import React from 'react'
import styles from "../styles/SignUp.module.css"
import SubHeading from "./Typography/SubHeading"
import SignUpForm from "../components/SignUpForm"
const SignUp = () => {

    const toolsList = [
        "Daily schedule planner (free)",
        "Weekly updates on events with free stuff, mental health, sexual health, drug advice and support.",
        "ACCESS to Whatsapp and Messenger groups to chat with your squad",
        "T-shirt to support the cause",
        "Smart Eating plan (best meals for cheap, easy, fast) for people who work a lot or long hours.",
        "Smart Finance plan, quick maths to help with your spending. Saving, interest etc.",
        "Dating and relationship advice from trained professionals.",
        "Workshops with certificates and free courses for qualifying brothers.",
        "Exclusive deals to online university courses from Harvard, Oxford etc.",
        "Make amazing friends and brothers, get mental health support from each other and support a good cause.",
        "Paid memberships have exclusive access to another chat where business opportunities come up and access to free courses are given priority. Exclusive meet-ups and advice 1 to 1’s on the gold membership. Gift upon joining after 3 months ( - - - -- ). Free elite t-shirt and stickers. Founder of the company."
    ]


    return (
        <div className={styles.container}>
            <div className="grid lg:grid-cols-2 sm:grid-cols-1 justify-center mt-20 sm:w-full">
                <div>
                    <h4 className="text-gray-300 text-2xl">Tools we use to help you improve.</h4>

                    <ul className="mt-4 leading-10 text-gray-300">
                        {toolsList.map((item, index) => (
                            <li key={index}>{index + 1}. {item}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <SignUpForm />
                </div>
            </div>

        </div>
    )
}

export default SignUp