const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    debug: true,
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
    }
})

const sendMail = async (email, secretToken, mode) => {
    try {
        if (mode == 'OTP') {
            
            return await transport.sendMail({
                from: process.env.GMAIL_USERNAME,
                to: email,
                subject: "OTP Submission",
                html: `
        <h1>Reset Password</h1>
        <p> Here is your otp to change the password ${secretToken} </p>
      `
            })
        }


        else if (mode == 'accept'){
            return await transport.sendMail({
                from: process.env.GMAIL_USERNAME,
                to: email,
                subject: "Research Topic Acceptance",
                html: `
        <h1 style="color:rgb(255,0,0);">Accepted</h1>
        <p>
        Dear student,

            I am glad to infrom you that I approved your research topic.

        Thank you!
        Best regards,
        </p>`

        })
    }

    else if (mode == 'reject'){
        return await transport.sendMail({
            from: process.env.GMAIL_USERNAME,
            to: email,
            subject: "Research Topic",
            html: `
    <h1 style="color:rgb(255,0,0);">Rejected</h1>
    <p>
    Dear student,

        I am sorry to infrom you that I rejected your research topic.

    Thank you!
    Best regards,
    </p>`

    })
}

    } catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = sendMail  