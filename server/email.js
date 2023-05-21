const nodemailer = require("nodemailer");

async function sendEmail(
  senderEmail,
  senderPassword,
  recipientEmail,
  subject,
  message
) {
  // Create a transporter
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Set it to true if using a secure connection (e.g., SSL/TLS)
    auth: {
      user: senderEmail,
      pass: senderPassword,
    },
  });

  // Define the email options
  let mailOptions = {
    from: senderEmail,
    to: recipientEmail,
    subject: subject,
    text: message,
  };

  try {
    // Send the email
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!", info.messageId);
  } catch (error) {
    console.error("Failed to send email. Error:", error);
  }
}

// Example usage
// let senderEmail = "rohilkalra@gmail.com";
// let senderPassword = "xiwmrthheylzaavi";
// let recipientEmail = "rohilk@g.ucla.edu";
// let subject = "Hello from the email client!";
// let message = "This is the body of the email.";

// sendEmail(senderEmail, senderPassword, recipientEmail, subject, message);

const createEmailSender = async (
  recipientEmail,
  fullName,
  locationFrom,
  locationTo,
  date,
  time,
  AM
) => {
  let AMstring = "AM";
  if (!AM) {
    AMstring = "PM";
  }
  const body =
    "Dear " +
    fullName +
    ",\nHere is the information for the ride you created." +
    "\nFrom: " +
    locationFrom +
    "\nTo: " +
    locationTo +
    "\ndate: " +
    date +
    "\ntime: " +
    time +
    " " +
    AMstring +
    "\nThank you for using BruinCruisin!" +
    "\nSincerely,\nBruinCruisin Team";

  sendEmail(
    "rohilkalra@gmail.com",
    "xiwmrthheylzaavi",
    recipientEmail,
    "BruinCruisin: Your New Ride Information",
    body
  );
};

const updateEmailSender = async (
  recipientEmails,
  fullNames,
  locationFrom,
  locationTo,
  dateObject
) => {
  for (let i = 0; i < recipientEmails.length; i++) {
    const body =
      "Dear " +
      fullNames[i] +
      ",\nHere is the information for the ride you created." +
      "\nFrom: " +
      locationFrom +
      "\nTo: " +
      locationTo +
      "\ndate: " +
      dateObject +
      "\nThank you for using BruinCruisin!" +
      "\nSincerely,\nBruinCruisin Team";

    sendEmail(
      "rohilkalra@gmail.com",
      "xiwmrthheylzaavi",
      recipientEmails[i],
      "BruinCruisin: Your New Ride Information",
      body
    );
  }
};

module.exports = { createEmailSender, sendEmail, updateEmailSender };
