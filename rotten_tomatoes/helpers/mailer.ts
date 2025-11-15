import User from '@/models/User';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
const now = new Date();
const admin = 'adjohouesyle@gmail.com';
export const sendEmailAlertNewUser = async (email: string, username: string) => {
	const mailOptions = {
		from: process.env.EMAIL_FROM || 'noreply@rotten_tomatoes.com',
		to: admin,
		subject: 'Nouvel utilisateur !',
		html: `
    <div>
    <div class="m_-7500613144460904200container">
        <div class="m_-7500613144460904200header">
            <h1>Youpi !</h1>
        </div>
        
        <div class="m_-7500613144460904200content">
            <h2>Nouvel utilisateur !!</h2>
            
            <p>Félicitation ${username}  vient de s'inscrire sur Farming Movies !</p>
            
            
            <div class="m_-7500613144460904200info-box">
                <h3>Détails</h3>
                <h1>Nom: <i>${username}</i> <br/> Email: <i>${email}</i> </h1>

                <div class="m_-7500613144460904200info-item">
                    <strong>Date et heure</strong>
                    <span>${now.getDate()}/${now.getMonth()}/${now.getFullYear()}-${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}</span>
                </div>
               
            </div>
            
            <div class="m_-7500613144460904200warning-box">
                <h3>Besoin d'aide ?</h3>
                <p>Si vous avez besoin d'aide ?, veuillez immédiatement :</p>
                <ul style="margin:10px 0;padding-left:20px;color:#111827">
                    <li>Changer votre mot de passe</li>
                    <li>Vérifier vos sessions actives</li>
                    <li>Nous contacter si nécessaire</li>
                </ul>
            </div>
            
            
            
            <p style="font-size:14px;color:#6b7280">Ne lisez ce mail que si vous êtes le propriétaire.</p>
        </div>
        
        <div class="m_-7500613144460904200footer">
            <p>Cet email a été envoyé automatiquement par <strong>The Farmers</strong></p>
            <p style="margin-top:15px;font-size:12px">© 2025 TheFarmars - Tous droits réservés</p>
        </div>
    </div>
       
        
      `
	};

	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.MAIL,
				pass: process.env.MAILTOKEN
			}
		});
		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.error("Erreur lors de l'envoi de l'email à admin", error);
		throw new Error("Impossible d'envoyer l'email à l'admin");
	}
};

export const sendEmailAlertDeleteUser = async (id: string) => {
	const mailOptions = {
		from: process.env.EMAIL_FROM || 'noreply@rotten_tomatoes.com',
		// to: "adjohouesyle@gmail.com",
		to: admin,
		subject: 'Utilisateur supprimé !',
		html: `
    <div>
    <div class="m_-7500613144460904200container">
        <div class="m_-7500613144460904200header">
            <h1>Compte supprimé</h1>
        </div>
        
        <div class="m_-7500613144460904200content">
            <h2>Bonjour cher administrateur !</h2>
            
            <p>Un compte vient d'être supprimé de <strong>Farmers Movies</strong>.</p>
            <h2>${id}</h2>

            
            
            <div class="m_-7500613144460904200info-box">
                <h3>Détails:</h3>
                <div class="m_-7500613144460904200info-item">
                    <strong>Date et heure</strong>
                    <span>${now.getDate()}/${now.getMonth()}/${now.getFullYear()}-${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}</span>
                </div>
               
            </div>
            
            <div class="m_-7500613144460904200warning-box">
                <h3>Besoin d'aide ?</h3>
                <p>Si vous avez besoin d'aide ?, veuillez immédiatement :</p>
                <ul style="margin:10px 0;padding-left:20px;color:#111827">
                    <li>Changer votre mot de passe</li>
                    <li>Vérifier vos sessions actives</li>
                    <li>Nous contacter si nécessaire</li>
                </ul>
            </div>
            
            
            
            <p style="font-size:14px;color:#6b7280">Ne lisez ce mail que si vous êtes le propriétaire.</p>
        </div>
        
        <div class="m_-7500613144460904200footer">
            <p>Cet email a été envoyé automatiquement par <strong>The Farmers</strong></p>
            <p style="margin-top:15px;font-size:12px">© 2025 TheFarmars - Tous droits réservés</p>
        </div>
    </div>
       
      `
	};

	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.MAIL,
				pass: process.env.MAILTOKEN
			}
		});
		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.error("Erreur lors de l'envoi de l'email à admin", error);
		throw new Error("Impossible d'envoyer l'email à l'admin");
	}
};

export const sendEmailAlertForDeleteUser = async (email: string) => {
	const mailOptions = {
		from: process.env.EMAIL_FROM || 'noreply@rotten_tomatoes.com',
		// to: "adjohouesyle@gmail.com",
		to: email,
		subject: 'Votre compte a été supprimé !',
		html: `
    <div>
    <div class="m_-7500613144460904200container">
        <div class="m_-7500613144460904200header">
            <h1>Compte supprimé</h1>
        </div>
        
        <div class="m_-7500613144460904200content">
            <h2>Bonjour cher utilisateur !</h2>
            
            <p>Votre compte vient d'être supprimé de <strong>Farmers Movies</strong>.</p>

            
            
            <div class="m_-7500613144460904200info-box">
                <h3>Détails de la suppression:</h3>
                <div class="m_-7500613144460904200info-item">
                    <strong>Date et heure</strong>
                    <span>${now.getDate()}/${now.getMonth()}/${now.getFullYear()}-${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}</span>
                </div>
               
            </div>
            
            <div class="m_-7500613144460904200warning-box">
                <h3>Besoin d'aide ?</h3>
                <p>Si vous n'êtes pas à l'origine, veuillez immédiatement nous contacter</p>
                <ul style="margin:10px 0;padding-left:20px;color:#111827">
                    <li>Changer votre mot de passe</li>
                    <li>Vérifier vos sessions actives</li>
                    <li>Nous contacter si nécessaire</li>
                </ul>
            </div>
            
            
            
            <p style="font-size:14px;color:#6b7280">Ne lisez ce mail que si vous êtes le propriétaire.</p>
        </div>
        
        <div class="m_-7500613144460904200footer">
            <p>Cet email a été envoyé automatiquement par <strong>The Farmers</strong></p>
            <p style="margin-top:15px;font-size:12px">© 2025 TheFarmars - Tous droits réservés</p>
        </div>
    </div>
       
      `
	};

	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.MAIL,
				pass: process.env.MAILTOKEN
			}
		});
		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.error("Erreur lors de l'envoi de l'email à admin", error);
		throw new Error("Impossible d'envoyer l'email à l'admin");
	}
};

export const sendEmail = async (email: string, username: string, token: string) => {
	const verificationUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/users/account/verify-email?id=${token}`;

	const mailOptions = {
		from: process.env.EMAIL_FROM || 'noreply@rotten_tomatoes.com',
		to: email,
		subject: 'Vérification de votre compte RottenTomatoes',
		html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Bonjour ${username},</h2>
          <p>Merci de vous être inscrit sur rotten_tomatoes !</p>
          <p>Pour activer votre compte, veuillez cliquer sur le lien ci-dessous :</p>
          <a href="${verificationUrl}" 
             style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; 
                    color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
            Vérifier mon email
          </a>
          <p>Ou copiez ce lien dans votre navigateur :</p>
          <p>${verificationUrl}</p>
          <p>Ce lien expirera dans 24 heures.</p>
          <p>Si vous n'avez pas créé de compte, ignorez cet email.</p>
          <hr style="margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">rotten_tomatoes - Vos films au bon endroit</p>
        </div>
      `
	};

	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.MAIL,
				pass: process.env.MAILTOKEN
			}
		});
		await transporter.sendMail(mailOptions);
		console.log(`Email de vérification envoyé à ${email}`);
	} catch (error) {
		console.error("Erreur lors de l'envoi de l'email:", error);
		throw new Error("Impossible d'envoyer l'email de vérification");
	}
};

export const resetEmail = async (email: string) => {
	const user = await User.findOne({ email });
	if (user == null) {
		return NextResponse.json({ error: 'Email not exist on our record' }, { status: 401 });
	}
	// user.refreshToken=generateToken()
	// user.save()
	const token = user.refreshToken;
	const id = user.id;
	const verificationUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password/${id}/${token}`;

	const mailOptions = {
		from: process.env.EMAIL_FROM || 'noreply@rotten_tomatoes.com',
		to: email,
		subject: 'Réinitialisation de votre mot de passe RottenTomatoes',
		html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Bonjour,</h2>
          <p>Votre email de réinitialisation de mot de passe !</p>
          <p>Pour activer votre compte, veuillez cliquer sur le lien ci-dessous :</p>
          <a href="${verificationUrl}" 
             style="display: inline-block; padding: 10px 20px; background-color: #d8350cff; 
                    color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
            Modifier mon mot de passe
          </a>
          <p>Ou copiez ce lien dans votre navigateur :</p>
          <p>${verificationUrl}</p>
          <p>Ce lien expirera dans 24 heures.</p>
          <p>Si vous n'avez pas demander la réinitialisation de votre compte, ignorez cet email.</p>
          <hr style="margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">rotten_tomatoes - Vos films au bon endroit</p>
        </div>
      `
	};

	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.MAIL,
				pass: process.env.MAILTOKEN
			}
		});
		await transporter.sendMail(mailOptions);
		console.log(`Email de réinitialisation envoyé à ${email}`);
	} catch (error) {
		console.error("Erreur lors de l'envoi de l'email:", error);
		throw new Error("Impossible d'envoyer l'email de réinitialisation");
	}
};
