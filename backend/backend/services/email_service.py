import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException
from django.conf import settings


def _send_email(to_email, username, subject, html_content):
    configuration = sib_api_v3_sdk.Configuration()
    configuration.api_key['api-key'] = settings.BREVO_API_KEY

    api_instance = sib_api_v3_sdk.TransactionalEmailsApi(
        sib_api_v3_sdk.ApiClient(configuration)
    )

    email = sib_api_v3_sdk.SendSmtpEmail(
        to=[{
            "email": to_email,
            "name": username
        }],
        sender={
            "email": settings.BREVO_SENDER_EMAIL,
            "name": settings.BREVO_SENDER_NAME
        },
        subject=subject,
        html_content=html_content
    )

    try:
        api_instance.send_transac_email(email)
    except ApiException as e:
        raise e


def email_confirmacion_habitacion(to_email, username, room_description, check_in_date, check_out_date):
    _send_email(
        to_email,
        username,
        "Bienvenido a Hotel Miga",
        f"""
        <h1>Hola {username}</h1>
        <p>Tu reserva ha sido confirmada.</p>
        <p>Detalles de la reserva:</p>
        <ul>
            <li>Habitación: {room_description}</li>
            <li>Fecha de entrada: {check_in_date:%d/%m/%Y}</li>
            <li>Fecha de salida: {check_out_date:%d/%m/%Y}</li>
        </ul>
        <p>Gracias por elegir Hotel Miga. Esperamos que disfrutes tu estancia.</p>
        """
    )


def email_rechazo_habitacion(to_email, username, room_description, check_in_date, check_out_date):
    _send_email(
        to_email,
        username,
        "Mensaje de Hotel Miga",
        f"""
        <h1>Hola {username}</h1>
        <p>Tu reserva ha sido rechazada.</p>
        <p>Detalles de la reserva:</p>
        <ul>
            <li>Habitación: {room_description}</li>
            <li>Fecha de entrada: {check_in_date:%d/%m/%Y}</li>
            <li>Fecha de salida: {check_out_date:%d/%m/%Y}</li>
        </ul>
        <p>Lamentamos cualquier inconveniente que esto pueda causar.</p>
        """
    )


def email_confirmacion_sala(to_email, username, room_description, check_in_date, time):
    _send_email(
        to_email,
        username,
        "Bienvenido a Hotel Miga",
        f"""
        <h1>Hola {username}</h1>
        <p>Tu reserva ha sido confirmada.</p>
        <p>Detalles de la reserva:</p>
        <ul>
            <li>Sala: {room_description}</li>
            <li>Fecha: {check_in_date:%d/%m/%Y}</li>
            <li>Hora: {time}</li>
        </ul>
        <p>Gracias por elegir Hotel Miga. Esperamos que disfrutes tu estancia.</p>
        """
    )


def email_rechazo_sala(to_email, username, room_description, check_in_date, time):
    _send_email(
        to_email,
        username,
        "Mensaje de Hotel Miga",
        f"""
        <h1>Hola {username}</h1>
        <p>Tu reserva ha sido rechazada.</p>
        <p>Detalles de la reserva:</p>
        <ul>
            <li>Sala: {room_description}</li>
            <li>Fecha: {check_in_date:%d/%m/%Y}</li>
            <li>Hora: {time}</li>
        </ul>
        <p>Lamentamos cualquier inconveniente que esto pueda causar.</p>
        """
    )