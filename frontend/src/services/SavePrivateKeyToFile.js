export function SavePrivateKeyToFile(privateKey) {
    
    const blob = new Blob([privateKey], { type: 'text/plain' });
    const link = document.createElement('a');
    
    const url = URL.createObjectURL(blob);

    link.href = url;
    link.download = 'passwordless_authentication_private_key.txt';
    
    document.body.appendChild(link);
    link.click();
    

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
