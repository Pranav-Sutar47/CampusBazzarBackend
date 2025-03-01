const nodemailer = require("nodemailer");
require("dotenv").config(); 


const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
        user: process.env.EMAIL, 
        pass: process.env.PASSWORD, 
    },
});


const sendEmailToUsers = async (users, post) => {
    try {
        const emailList = users.map(user => user.email); 

        const mailOptions = {
            from: process.env.EMAIL,
            to: emailList, 
            subject: "New Post Added: " + post.title,
            html: `
                <h2>A new post has been added!</h2>
                <p><strong>Title:</strong> ${post.title}</p>
                <p><strong>Description:</strong> ${post.description}</p>
                <p><strong>Price:</strong> ${post.price}</p>
                <p>Visit our platform to check it out.</p>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Emails sent successfully:", info.response);
    } catch (error) {
        console.error("Error sending emails:", error);
    }
};

module.exports = sendEmailToUsers;
