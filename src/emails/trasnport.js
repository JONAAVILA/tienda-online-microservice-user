import nodemailer from 'nodemailer';

const { USER,PASS } = process.env

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: USER,
      pass: PASS,
    },
  });

export default transporter