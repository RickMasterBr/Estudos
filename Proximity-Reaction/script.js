// Seleciona todos os elementos que devem ter a reação de proximidade
const cards = document.querySelectorAll('.proximity-card');

// Ouve o movimento do mouse na janela inteira
document.addEventListener('mousemove', (e) => {
    // Para cada cartão na lista...
    cards.forEach(card => {
        // Pega as dimensões e a posição do cartão na página
        const rect = card.getBoundingClientRect();
        
        // Calcula a posição do mouse DENTRO do cartão (de 0 a largura/altura do cartão)
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Calcula a posição do mouse como uma percentagem (de 0% a 100%)
        const percentX = (mouseX / rect.width) * 100;
        const percentY = (mouseY / rect.height) * 100;

        // Atualiza as variáveis CSS para a posição do brilho
        card.style.setProperty('--mouse-x', `${percentX}%`);
        card.style.setProperty('--mouse-y', `${percentY}%`);

        // Lógica para a rotação 3D
        const maxRotation = 15; // O ângulo máximo de inclinação em graus

        // Calcula a rotação com base na posição do mouse a partir do centro do cartão
        // Se o mouse está à esquerda, rotaciona para um lado; se à direita, para o outro.
        const rotateY = (percentX - 50) / 50 * maxRotation;
        const rotateX = ((percentY - 50) / 50 * maxRotation) * -1; // Invertido para ser mais intuitivo

        card.style.setProperty('--card-rotate-y', `${rotateY}deg`);
        card.style.setProperty('--card-rotate-x', `${rotateX}deg`);
    });
});

// Adiciona um efeito de "ligar/desligar" o brilho quando o mouse entra ou sai
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.setProperty('--glow-opacity', '0.15');
    });

    card.addEventListener('mouseleave', () => {
        // Reseta a opacidade e a rotação quando o mouse sai
        card.style.setProperty('--glow-opacity', '0');
        card.style.setProperty('--card-rotate-y', '0deg');
        card.style.setProperty('--card-rotate-x', '0deg');
    });
});