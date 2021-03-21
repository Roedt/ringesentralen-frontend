function hentSvarAlternativ (digits) {
  let svar = 'ugyldigSvar'
  if (!digits) {
    svar = 'svarteIkke'
  } else if (digits === '1') {
    svar = 'ringTilbake'
  } else if (digits === '2') {
    svar = 'ikkeRingIgjen'
  }
  return svar
}

async function registrerSvar ({ telefonnummer, digits }) {
  const payload = {
    telefonnummer,
    svar: hentSvarAlternativ(digits)
  }
  console.log(payload)
  return true
}

export default registrerSvar
