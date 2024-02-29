export interface LoginForm {
  userName: string;
  password: string;
}
export interface User {
  id: string;
  nombre: string;
  image?: string;
  email?: string;
  password: string;
}

export interface Employee extends User {
  idrol: string;
  rol?: string;
  apellidopaterno: string;
  apellidomaterno: string;
  sueldo: number;
  titulo: string;
  documento_titulo: string;
  cedula: string;
  documento_cedula: string;
  ife: string;
  documento_ife: string;
  telefono: string;
  celular: string;
  calle: string;
  entrecalle: string;
  numero_exterior: string;
  numero_interior: string;
  colonia: string;
  estado: string;
  municipio: string;
  pais: string;
  documento_comprobante_domicilio: string;
  fechaalta: string;
  fechabaja: string;
  active: Boolean;
  primercontacto_nombre: string;
  primercontacto_celular: string;
  fechamodificacion: string;
  color?: string;
  ismedico_externo: Boolean;
}
