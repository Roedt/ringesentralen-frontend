function harTelefonnummerGyldigLandkode (telefonnummer) {
  const gyldigeLandKoder = ['+47']
  return gyldigeLandKoder.includes(telefonnummer.substr(0, 3))
}

export default harTelefonnummerGyldigLandkode
