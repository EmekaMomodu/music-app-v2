# code source : https://dev.to/tayfunakgc/jwt-with-rsa-signature-1jd
# Minimum RSA key length is 1024 bits
# Maximum RSA key length is 16384 bits
# Don't add passphrase
ssh-keygen -t rsa -b 1024 -m PEM -f keys/rsa.key
# Write public key to keys/rsa.key.pub file
openssl rsa -in keys/rsa.key -pubout -outform PEM -out keys/rsa.key.pub