/**
 * Nombre del programa: supabase.js
 * ¿Para que sirve?
 * El propósito de este programa es crear la conexión con la base de datos alojada en supabase y poder manipular los datos
 * 
 * Autor: Lázaro López Hernández
 * 
 * Fecha de creacion: 10 de abril del 2025
 * Fecha de entrega: 24 de mayo del 2025
 */
<script>
        const chatToggle = document.getElementById('chatToggle');
        const chatBox = document.getElementById('chatBox');
        const closeChat = document.getElementById('closeChat');

        chatToggle.addEventListener('click', () => {
          chatBox.style.display = chatBox.style.display === 'none' ? 'block' : 'none';
        });

        closeChat.addEventListener('click', () => {
          chatBox.style.display = 'none';
        });
        const payBtn = document.getElementById('payBtn');
        const paymentBox = document.getElementById('paymentBox');
        const closePayment = document.getElementById('closePayment');
        const paymentForm = document.getElementById('paymentForm');

        payBtn.addEventListener('click', () => {
          const commissionModal = new bootstrap.Modal(document.getElementById('commissionModal'));
          commissionModal.show();

          const paymentBox = document.getElementById('paymentBox');

          const modalEl = document.getElementById('commissionModal');
          modalEl.addEventListener('hidden.bs.modal', () => {
            chatBox.style.display = 'none';
            paymentBox.style.display = 'block';
          }, { once: true });
        });

        closePayment.addEventListener('click', () => {
          paymentBox.style.display = 'none';
        });

        paymentForm.addEventListener('submit', (e) => {
          e.preventDefault();

          // Referencias a los campos
          const cardNumber = document.getElementById('cardNumber');
          const cardExpiry = document.getElementById('cardExpiry');
          const cardCVC = document.getElementById('cardCVC');
          const cardName = document.getElementById('cardName');

          let valid = true;

          // Validaciones 
          [cardNumber, cardExpiry, cardCVC, cardName].forEach(input => {
            if (!input.checkValidity()) {
              input.classList.add('is-invalid');
              valid = false;
            } else {
              input.classList.remove('is-invalid');
            }
          });

          // Validar fecha lógica 
          const [mm, yy] = cardExpiry.value.split('/');
          const currentDate = new Date();
          const expDate = new Date(`20${yy}`, parseInt(mm), 1);

          if (expDate < currentDate) {
            cardExpiry.classList.add('is-invalid');
            valid = false;
          } else {
            cardExpiry.classList.remove('is-invalid');
          }

          if (valid) {
            alert('Pago procesado correctamente.');
            paymentBox.style.display = 'none';
            paymentForm.reset();
          }
        });

        // Solo permitir números y espacios en el número de tarjeta
        cardNumber.addEventListener('input', () => {
          let raw = cardNumber.value.replace(/\D/g, '').slice(0, 16);
          let formatted = raw.match(/.{1,4}/g)?.join(' ') || ''; // agrupar cada 4 dígitos
          cardNumber.value = formatted;
        });

        // Solo permitir MM/AA 
        cardExpiry.addEventListener('input', () => {
          let cleaned = cardExpiry.value.replace(/[^\d]/g, '');
          if (cleaned.length >= 2) {
            cleaned = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
          }
          cardExpiry.value = cleaned.slice(0, 5);
        });

        // Solo permitir números en CVC
        cardCVC.addEventListener('input', () => {
          cardCVC.value = cardCVC.value.replace(/[^\d]/g, '').slice(0, 4);
        });

        // Solo letras y espacios para el nombre
        cardName.addEventListener('input', () => {
          cardName.value = cardName.value.replace(/[^a-zA-Z\s]/g, '');
        });

        const sendBtn = document.getElementById('sendBtn');
        const chatInput = document.getElementById('chatInput');
        const chatMessages = document.getElementById('chatMessages');

        sendBtn.addEventListener('click', () => {
          const message = chatInput.value.trim();
          if (message !== "") {
            const messageDiv = document.createElement('div');
            messageDiv.className = "mb-2 p-2 rounded bg-primary text-white ms-auto";
            messageDiv.style.maxWidth = "85%";
            messageDiv.textContent = message;
            chatMessages.appendChild(messageDiv);
            chatInput.value = "";
            chatMessages.scrollTop = chatMessages.scrollHeight;
          }
        });
      </script>
