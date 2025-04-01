document.addEventListener('DOMContentLoaded', () => {
  const dragItem = document.getElementById('drag1');
  const dropArea = document.getElementById('drop-area');

  dragItem.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', dragItem.id);
  });

  dropArea.addEventListener('dragover', (event) => {
      event.preventDefault();
  });

  dropArea.addEventListener('drop', (event) => {
      event.preventDefault();
      const id = event.dataTransfer.getData('text/plain');
      const draggedElement = document.getElementById(id);
      dropArea.appendChild(draggedElement);
  });
});document.addEventListener('DOMContentLoaded', () => {
  const dragItem = document.getElementById('drag1');
  const dropArea = document.getElementById('drop-area');
  const completionMessage = document.getElementById('completion-message');

  // Desktop Drag and Drop
  dragItem.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', dragItem.id);
  });

  dropArea.addEventListener('dragover', (event) => {
      event.preventDefault();
  });

  dropArea.addEventListener('drop', (event) => {
      event.preventDefault();
      const id = event.dataTransfer.getData('text/plain');
      const draggedElement = document.getElementById(id);
      dropArea.appendChild(draggedElement);
      completionMessage.style.display = "block";
  });

  // Mobile Touch Events
  let touchStartX = 0;
  let touchStartY = 0;

  dragItem.addEventListener('touchstart', (event) => {
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
  });

  dragItem.addEventListener('touchmove', (event) => {
      event.preventDefault();
      const touchX = event.touches[0].clientX;
      const touchY = event.touches[0].clientY;

      dragItem.style.left = (touchX - touchStartX) + 'px';
      dragItem.style.top = (touchY - touchStartY) + 'px';
  });

  dragItem.addEventListener('touchend', (event) => {
      const dropAreaRect = dropArea.getBoundingClientRect();
      const dragItemRect = dragItem.getBoundingClientRect();

      if (dragItemRect.left > dropAreaRect.left &&
          dragItemRect.right < dropAreaRect.right &&
          dragItemRect.top > dropAreaRect.top &&
          dragItemRect.bottom < dropAreaRect.bottom) {
          dropArea.appendChild(dragItem);
          completionMessage.style.display = "block";
      } else {
          // Reset position if not dropped in the correct area
          dragItem.style.left = '';
          dragItem.style.top = '';
      }
  });
});