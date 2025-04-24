import { Injectable } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { urlcommercialLogo } from '../../constants';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  public async sendEmailSubscribe(email: string) {
    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'Bienvenido a nuestra familia!',
        html: `<h1>¡Bienvenido!</h1>
        <p>Ahora eres parte de nuestra familia.</p><br>
        <img src="${urlcommercialLogo}" alt="Logo" style="width: 150px; height: auto; border-radius: 10px;"/>`,
      });
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while sending the email.',
        'INTERNAL_SERVER_ERROR',
      );
    }
  }

  public async sendEmailNewUser(
    email: string,
    nameUser: string,
    password: string,
  ) {
    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'Bienvenido a nuestra familia!',
        html: `<h1>¡Bienvenido! ${nameUser}</h1>
        <p>Ahora eres parte de nuestra familia.</p><br>
        <img src="${urlcommercialLogo}" alt="Logo" style="width: 150px; height: auto; border-radius: 10px;"/><br>
        <p>Por favor modifica lo mas antes posible tu contraseña actual: ${password}</p>`,
      });
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while sending the email.',
        'INTERNAL_SERVER_ERROR',
      );
    }
  }

  public async sendEmailItemMin(
    email: string,
    nameUser: string,
    product: string,
    stock: number,
  ) {
    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'Alerta!',
        html: `<h1>¡${nameUser}!</h1>
        <p>Te informamos que solo nos quedan <strong>${stock}</strong> unidades del producto: <strong>${product}</strong>.</p>
        <img src="${urlcommercialLogo}" alt="Logo" style="width: 150px; height: auto; border-radius: 10px;"/><br>
        <p>Por favor si este producto es muy importante en la tienda pide mas y si no deja pasar esta notificacion.</p>`,
      });
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while sending the email.',
        'INTERNAL_SERVER_ERROR',
      );
    }
  }

  public async sendEmailItemCero(
    email: string,
    nameUser: string,
    product: string,
  ) {
    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: '¡Producto agotado!',
        html: `<h1>¡Hola, ${nameUser}!</h1>
        <p>Te informamos que el producto: <strong>${product}</strong> se ha agotado y estará deshabilitado hasta que se agregue nuevo stock.</p>
        <br>
        <img src="${urlcommercialLogo}" alt="Logo" style="width: 150px; height: auto; border-radius: 10px;"/><br>
        <p>Tan pronto como tengamos más unidades disponibles, el producto volverá a estar disponible. ¡Gracias por tu comprensión!</p>`,
      });
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while sending the email.',
        'INTERNAL_SERVER_ERROR',
      );
    }
  }

  public sendEmailCatalogProducts(email: string, nameUser: string) {
    try {
      return `${email} - ${nameUser}`;
    } catch (error) {
      if (error instanceof ApolloError) {
        throw error;
      }
      throw new ApolloError(
        'An unexpected error occurred while sending the email.',
        'INTERNAL_SERVER_ERROR',
      );
    }
  }
}
