export interface State {
  id: string;
  name: string;
  cities_count: number
}
export interface Municipality {
  id: string;
  name: string;
  municipality_key: number;
  zip_code: number;
  state_id: number;
}

export interface Result {
  pagination: any;
  zip_codes: ZipCode[]
}

export interface ZipCode {
  id: number;
  d_codigo: string;
  d_asenta: string;
  d_tipo_asenta: string;
  d_mnpio: string;
  d_estado: string;
  d_ciudad: string;
  d_cp: string;
  c_estado: string;
  c_oficina: string;
  c_cp: string;
  c_tipo_asenta: string;
  c_mnpio: string;
  id_asenta_cpcons: string;
  d_zona: string;
  c_cve_ciudad: string
}
