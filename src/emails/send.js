import transporter from "./trasnport.js"

const { USER } = process.env

const sendMail = async (email,currentToken)=>{
    const options = {
        from: USER,
        to: email,
        subject: "Hello 🙋‍♂️",
        text: `${currentToken}`,
    }
    
    transporter.sendMail(options, (error)=>{
        if (error) console.log("⚠️" + error)
    })
    console.log("✅ Email sent");
}

export default sendMail;