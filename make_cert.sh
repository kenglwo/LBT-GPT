docker run --rm \
  -p 443:443 -p 80:80 --name letsencrypt \
  -v "LBT-GPT_certs:/etc/letsencrypt" \
  -v "LBT-GPT_certs-data:/var/lib/letsencrypt" \
  certbot/certbot certonly -n \
  -m "kentoglwo@gmail.com" \
  -d kawamura51.org \
  --standalone --agree-tos
