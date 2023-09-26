import emailjs from 'emailjs-com';
import emailjsConfig from './emailjs.config'; // Import your configuration

const sendmail = (name,email,content) => {
  const templateParams = {
    to_email: email,
    from_name:name,
    message: content,
    'Content-Type': 'text/html'
  };

  emailjs
    .send(
      emailjsConfig.serviceId,
      emailjsConfig.templateId,
      templateParams,
      emailjsConfig.userId
    )
    .then(
      (response) => {
        console.log('Email sent successfully:', response);
        // Handle success, e.g., show a confirmation message to the user
      },
      (error) => {
        console.error('Email sending failed:', error);
        // Handle error, e.g., display an error message to the user
      }
    );
    return 200;
};
export default sendmail;
// import React from 'react';
// import emailjs from 'emailjs-com';
// import emailjsConfig from './emailjs.config'; // Import your configuration

// const sendEmail = () => {
//   const templateParams = {
//     to_email: 'rajeevdh@usc.edu',
//     message: 'This is the email content.',
//   };

//   emailjs
//     .send(
//       emailjsConfig.serviceId,
//       emailjsConfig.templateId,
//       templateParams,
//       emailjsConfig.userId
//     )
//     .then(
//       (response) => {
//         console.log('Email sent successfully:', response);
//         // Handle success, e.g., show a confirmation message to the user
//       },
//       (error) => {
//         console.error('Email sending failed:', error);
//         // Handle error, e.g., display an error message to the user
//       }
//     );
// };

// function Appmail() {
//   return (
//     <div>
//       <button onClick={sendEmail}>Send Email</button>
//     </div>
//   );
// }

// export default Appmail;
