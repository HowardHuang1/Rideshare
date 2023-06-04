const nodemailer = require("nodemailer");

const formatDate = (date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = String(date.getFullYear());

  return `${month}/${day}/${year}`;
};

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
  dateObject,
  ba_price
) => {
  const body =
    "Dear " +
    fullName +
    ",\nHere is the information for the ride you created." +
    "\nPickup Location: " +
    locationFrom +
    "\nDestination: " +
    locationTo +
    "\nDate: " +
    formatDate(dateObject) +
    ". Based on newly received data, your estimated ride price is " +
    parseInt(ba_price) +
    "." +
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

const createEmailSenderWithPOR = async (
  recipientEmail,
  fullName,
  locationFrom,
  locationTo,
  dateObject,
  ba_price,
  por_from,
  por_to,
  por_price
) => {
  const body =
    "Dear " +
    fullName +
    ",\nHere is the information for the ride you created." +
    "\nPickup Location " +
    locationFrom +
    "\nDestination " +
    locationTo +
    "\nDate: " +
    formatDate(dateObject) +
    ". Based on newly received data, your estimated ride price is " +
    parseInt(ba_price) +
    "." +
    "\n\nHowever, we found a cheaper ride for you with a similar pickup location and destination (less than half a mile away)!" +
    "\nAlternate Pickup Location: " +
    por_from +
    "\nAlternate Destination: " +
    por_to +
    "\nAlternate Ride Price: " +
    parseInt(por_price) +
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
  dateObject,
  ba_price
) => {
  for (let i = 0; i < recipientEmails.length; i++) {
    const body =
      "Dear " +
      fullNames[i] +
      ",\nHere is the information for the ride you created." +
      "\nPickup Location: " +
      locationFrom +
      "\nDestination: " +
      locationTo +
      "\nDate: " +
      formatDate(dateObject) +
      ". Based on newly received data, your estimated ride price is " +
      parseInt(ba_price) +
      "." +
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

module.exports = {
  createEmailSender,
  sendEmail,
  updateEmailSender,
  createEmailSenderWithPOR,
  formatDate,
};
