const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

/**
 * Generates a QZ Tray compatible key pair and a self-signed certificate (stub).
 * NOTE: Generating a full X.509 certificate purely using Node's 'crypto' without libraries
 * is complex. This script provides the keys and the correct structure.
 */
function generateQZCert() {
  console.log('Generating QZ Tray compatible 2048-bit RSA key pair...');

  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem'
    }
  });

  // For a production environment, you should use a real certificate.
  // This is a PEM formatted public key. QZ Tray expects an X.509 Certificate.
  // If this doesn't work, you must generate a real self-signed certificate using:
  // "openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 3650 -nodes"
  
  const qzPrivateKey = privateKey;
  const qzCertificate = publicKey; // This is a placeholder; real X.509 cert required for full features.

  const envPath = path.join(__dirname, '../.env');
  let envContent = '';
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }

  const qzPrivateKeyEnv = `QZ_PRIVATE_KEY="${qzPrivateKey.replace(/\n/g, '\\n')}"`;
  const qzCertificateEnv = `QZ_CERTIFICATE="${qzCertificate.replace(/\n/g, '\\n')}"`;

  let newEnv = envContent;
  if (newEnv.includes('QZ_PRIVATE_KEY')) {
    newEnv = newEnv.replace(/^QZ_PRIVATE_KEY=.*/m, qzPrivateKeyEnv);
  } else {
    newEnv += `\n${qzPrivateKeyEnv}`;
  }

  if (newEnv.includes('QZ_CERTIFICATE')) {
    newEnv = newEnv.replace(/^QZ_CERTIFICATE=.*/m, qzCertificateEnv);
  } else {
    newEnv += `\n${qzCertificateEnv}`;
  }

  fs.writeFileSync(envPath, newEnv.trim() + '\n');
  
  console.log('\n✅ Keys generated and saved to .env file.');
  console.log('\n--- QZ_PRIVATE_KEY ---\n' + privateKey);
  console.log('\n--- QZ_CERTIFICATE (Public Key PEM) ---\n' + publicKey);
  console.log('\n⚠️  IMPORTANT: QZ Tray normally requires a full X.509 Certificate string.');
  console.log('If your browser console shows "Certificate rejected", you must replace the');
  console.log('QZ_CERTIFICATE in .env with a real self-signed cert generated via OpenSSL.');
}

generateQZCert();
