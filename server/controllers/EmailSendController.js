const asyncHandler = require("../middleware/asyncHandler");
const { sendVerificationEmail } = require("../utils");

const sendMail = async () =>{
     await sendVerificationEmail({
       name: 'John Doe',
       email: 'bsclmr166422@spu.ac.ke',
       verificationToken: '12345',
     });
}

module.exports = sendMail