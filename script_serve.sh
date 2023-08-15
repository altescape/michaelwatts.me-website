#!/bin/bash

./script_gethugo.sh

npm i

export RECAPTCHA_DOMAIN=https://k8sapi.swiftaid.co.uk/api/v1/recaptcha
export RECAPTCHA_SITE_KEY=6Ldm7pwfAAAAAEZaWypkaMzGb8DzeiYDsgca18y0
export GTM_ID=GTM-T4P4NKD
HUGO_PARAMS_ENV="development" ./hugo server -w --baseURL=http://localhost:1313 --bind=0.0.0.0