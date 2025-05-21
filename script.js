document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // XOR encryption function
    function xorEncrypt(text, key) {
        if (!text || !key) return "";
        
        let result = "";
        for (let i = 0; i < text.length; i++) {
            // XOR the character code with the key character code at the corresponding position
            const keyChar = key.charCodeAt(i % key.length);
            const textChar = text.charCodeAt(i);
            const encryptedChar = String.fromCharCode(textChar ^ keyChar);
            
            // Convert to hex representation for better display
            result += encryptedChar.charCodeAt(0).toString(16).padStart(2, "0");
        }
        return result;
    }
    
    // XOR decryption function (same as encryption due to XOR properties)
    function xorDecrypt(hex, key) {
        if (!hex || !key) return "";
        
        let result = "";
        // Convert hex to characters
        const hexPairs = hex.match(/.{1,2}/g) || [];
        
        for (let i = 0; i < hexPairs.length; i++) {
            const charCode = parseInt(hexPairs[i], 16);
            const keyChar = key.charCodeAt(i % key.length);
            result += String.fromCharCode(charCode ^ keyChar);
        }
        return result;
    }
    
    // Encrypt button click handler
    document.getElementById('encrypt-btn').addEventListener('click', function() {
        const plaintext = document.getElementById('plaintext').value;
        const key = document.getElementById('encrypt-key').value;
        
        if (!plaintext || !key) {
            alert('Silakan masukkan plaintext dan kunci');
            return;
        }
        
        const encrypted = xorEncrypt(plaintext, key);
        document.getElementById('ciphertext').value = encrypted;
    });
    
    // Decrypt button click handler
    document.getElementById('decrypt-btn').addEventListener('click', function() {
        const ciphertext = document.getElementById('decrypt-input').value;
        const key = document.getElementById('decrypt-key').value;
        
        if (!ciphertext || !key) {
            alert('Silakan masukkan ciphertext dan kunci');
            return;
        }
        
        const decrypted = xorDecrypt(ciphertext, key);
        document.getElementById('decrypt-result').value = decrypted;
    });
});