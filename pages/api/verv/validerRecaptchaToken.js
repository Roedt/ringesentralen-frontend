import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise'
const SITE_ID = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_ID

function validerRecaptchaToken (token) {
  const client = new RecaptchaEnterpriseServiceClient()
  const protectedAction = 'verving'

  const event = {
    token,
    siteKey: SITE_ID,
    protectedAction
  }

  const assessment = ({
    event: event,
    name: 'validerVerving'
  })

  const request = ({
    assessment: assessment,
    parent: 'parentPath'
  })

  client.createAssessment(request, function (error, response) {
    if (error) {
      console.error(error)
      return false
    }

    if (response.tokenProperties.valid === false) {
      console.log('The CreateAssessment() call failed because the token was invalid with the following reason: ' + response.tokenProperties.invalidReason)
      return false
    } else {
      if (response.event.expectedAction === protectedAction) {
        console.log('The reCAPTCHA score is: ' + response.riskAnalysis.score)
        return response.riskAnalysis.score
      } else {
        console.log('The action attribute in your reCAPTCHA tag does not match the action you are expecting to score')
        return false
      }
    }
  })
}

export default validerRecaptchaToken
