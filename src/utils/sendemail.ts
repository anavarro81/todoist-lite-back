import nodemailer from 'nodemailer'
import {EmailData} from '../types/mail.types'
import AppError from '../errors/AppError'
import logger from '../utils/logger'

// Environment variables for email authentication
const EMAIL_EMAIL = process.env.EMAIL_MAIL
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD

// Configure nodemailer transporter with Gmail service
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL_EMAIL,
        pass: EMAIL_PASSWORD
    },
})

/**
 * Sends an email using the configured transporter
 * @param data - EmailData object containing recipient, subject, and content information
 * @returns Promise<nodemailer.SentMessageInfo> - Email delivery response
 * @throws AppError - When email delivery fails
 */
const sendReceiptEmail = async(data: EmailData) => {

    try {
        // Attempt to send email with provided data
        const emailResp = await transporter.sendMail({
            from: data.from,
            to: data.to,
            subject: data.subject,
            html: data.html
        })

        return emailResp
        
    } catch (error) {
        // Log error details for debugging purposes
        logger.error(`Error al mandar el correo ${error}`)
        // Throw custom application error for proper error handling
        throw AppError.emailDeliveryError('Error al enviar el email')                
    }

}

export default sendReceiptEmail

